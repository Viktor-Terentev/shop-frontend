import axios from 'axios';
import Button from 'components/Button';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../../components/Card';
import Text from '../../../components/Text';
import { routes } from '../../../configs/routes.ts';

import css from './Products.module.scss';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

interface IImage {
  id: number;
  documentId?: string;
  name: string;
  url: string;
}

interface IStrapiMeta {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

interface IStrapiResponse {
  data: IProduct[];
  meta: IStrapiMeta;
}

export interface IProduct {
  id: number;
  documentId?: string;
  title?: string;
  productCategory?: { id: number; title: string };
  name?: string;
  description?: string;
  price?: number;
  images?: IImage[] | null;
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = qs.stringify(
          { populate: ['images', 'productCategory'] },
          { encodeValuesOnly: true }
        );
        const token = import.meta.env.VITE_API_TOKEN as string | undefined;
        const res = await axios.get<IStrapiResponse>(`${STRAPI_URL}/products?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mappedProducts = (res.data.data || []).map((product) => ({
          id: product.id,
          documentId: product.documentId,
          images: product.images,
          title: product.title,
          productCategory: product.productCategory,
          description: product.description,
          price: product.price,
        }));
        setProducts(mappedProducts || []);
        setTotal(res.data.meta?.pagination?.total ?? 0);
      } catch (e: unknown) {
        if (e instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    };

    fetchProducts();
  }, []);
  return (
    <section className={css.products} aria-labelledby="products-title">
      <header className={css.products__header}>
        <Text view="title" color="primary" className={css.products__title}>
          Products
        </Text>
        <Text view="p-20" weight="normal" color="secondary" className={css.products__subtitle}>
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item
        </Text>
      </header>

      <div className={css.products__grid}>
        <div className={css.products__meta}>
          <Text weight="bold" className={css.products__metaTitle}>
            Total products
          </Text>
          <Text
            view="p-20"
            tag="span"
            weight="bold"
            color="accent"
            className={css.products__metaCount}
          >
            {total}
          </Text>
        </div>
        <ul className={css.products__list}>
          {products.map((product) => (
            <li key={product.id} className={css.products__item}>
              <Card
                image={product.images?.[0]?.url ?? ''}
                captionSlot={product.productCategory?.title ?? null}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price ?? ''}`}
                actionSlot={<Button onClick={(e) => e.stopPropagation()}>Add to Cart</Button>}
                onClick={() => {
                  if (product.documentId) {
                    navigate(routes.product.create(product.documentId));
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Products;
