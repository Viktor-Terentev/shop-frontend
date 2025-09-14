import cn from 'classnames';
import Text from 'components/Text';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { routes } from '../../configs/routes';
import CartIcon from '../icons/CartIcon';
import UserIcon from '../icons/UserIcon';

import css from './Navbar.module.scss';

const NAV = [
  { to: routes.products.create(), label: 'Products' },
  { to: routes.categories.create(), label: 'Categories' },
  { to: routes.about.create(), label: 'About us' },
];

const NAV_MOBILE = [
  { to: routes.products.create(), label: 'Products' },
  { to: routes.categories.create(), label: 'Categories' },
  { to: routes.about.create(), label: 'About us' },
  { to: routes.account.create(), label: 'Account' },
  { to: routes.cart.create(), label: 'Cart' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className={css.navbar}>
      <div className={css.navbar__container}>
        <button
          className={css.navbar__burger}
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to={routes.main.create()} className={css.navbar__logo}>
          <span className={css.navbar__logoMark} aria-hidden />
          <Text tag="span" view="p-20" color="primary" weight="bold">
            Lalasia
          </Text>
        </Link>

        <div className={css.navbar__menu}>
          {NAV.map((i) => (
            <NavLink
              key={i.label}
              to={i.to}
              className={({ isActive }) =>
                isActive ? `${css.navbar__link} ${css.isActive}` : css.navbar__link
              }
            >
              <Text view="p-18">{i.label}</Text>
            </NavLink>
          ))}
        </div>

        <div className={css.navbar__actions}>
          <Link to={routes.cart.create()} className={css.iconBtn} aria-label="Cart">
            <CartIcon width={30} height={30} />
          </Link>
          <Link to={routes.account.create()} className={css.iconBtn} aria-label="Account">
            <UserIcon width={30} height={30} />
          </Link>
        </div>
      </div>

      <div id="mobile-menu" className={cn(css.drawer, { [css.drawerOpen]: open })}>
        <div className={css.drawer__inner}>
          <div className={css.drawer__header}>
            <span className={css.drawer__title}>
              <span className={css.navbar__logoMark} aria-hidden />
              <span>Lalasia</span>
            </span>
            <button className={css.drawer__close} aria-label="Close" onClick={() => setOpen(false)}>
              <span />
              <span />
            </button>
          </div>
          <ul className={css.drawer__list}>
            {NAV_MOBILE.map((i) => (
              <li key={i.label} className={css.drawer__item}>
                <NavLink
                  to={i.to}
                  className={({ isActive }) => cn(css.drawer__link, { [css.isActive]: isActive })}
                  onClick={() => setOpen(false)}
                >
                  <Text view="p-16">{i.label}</Text>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
