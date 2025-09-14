import axios from 'axios';
import cn from 'classnames';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Button from '../../../components/Button';
import Text from '../../../components/Text';
import RightIcon from '../../../components/icons/RightIcon';
import type { IProduct } from '../Products/Products.tsx';

import css from './Product.module.scss';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

const Product = () => {
  const { documentId } = useParams();
  const [item, setItem] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!documentId) return;

    (async () => {
      try {
        const query = qs.stringify(
          { populate: ['images', 'productCategory'] },
          { encodeValuesOnly: true }
        );
        const token = import.meta.env.VITE_API_TOKEN as string;
        const { data } = await axios.get<{ data: IProduct }>(
          `${STRAPI_URL}/products/${documentId}?${query}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setItem(data.data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    })();
  }, [documentId]);

  const imageUrl = item?.images?.[0]?.url;

  return (
    <section className={css.product}>
      <header className={css.product__header}>
        <Link to="/products" className={css.product__back}>
          <RightIcon className={css.product__backIcon} width={32} height={32} />
          <Text view="p-20" className={css.product__backText}>
            Назад
          </Text>
        </Link>
      </header>

      <div className={css.product__content}>
        <figure className={css.product__media}>
          {imageUrl ? (
            <img className={css.product__image} src={imageUrl} alt={item?.title ?? 'Product'} />
          ) : (
            <div className={css.product__imageFallback} aria-label="No image" />
          )}
        </figure>

        <div className={css.product__details}>
          <div className={css.product__info}>
            <Text view="title" className={css.product__title}>
              {item?.title}
            </Text>
            {item?.description && (
              <Text view="p-20" color="secondary" className={css.product__desc}>
                {item.description}
              </Text>
            )}
          </div>

          <div className={css.product__purchase}>
            {typeof item?.price === 'number' && (
              <Text view="title" className={css.product__price}>
                ${item.price.toFixed(2)}
              </Text>
            )}
            <div className={css.product__actions}>
              <Button className={cn(css.product__btn, css['product__btn--primary'])}>
                Buy Now
              </Button>
              <Button className={cn(css.product__btn, css['product__btn--ghost'])}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
