export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/products',
    create: () => '/products',
  },
  product: {
    mask: '/products/:documentId',
    create: (documentId: string) => `/products/${documentId}`,
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  about: {
    mask: '/about',
    create: () => '/about',
  },
  cart: {
    mask: '/cart',
    create: () => '/cart',
  },
  account: {
    mask: '/account',
    create: () => '/account',
  },
};
