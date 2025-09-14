import { Navigate, type RouteObject } from 'react-router-dom';

import App from '../App';
import Product from '../App/pages/Product';
import Products from '../App/pages/Products';

import { routes } from './routes.ts';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <Products />,
      },
      {
        path: routes.product.mask,
        element: <Product />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.products.mask} replace />,
  },
];
