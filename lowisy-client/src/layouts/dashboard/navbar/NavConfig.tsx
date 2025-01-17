// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PolicyIcon from '@mui/icons-material/Policy';
import LinkIcon from '@mui/icons-material/Link';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactIcon from '@mui/icons-material/ContactSupport';
import ContactUsIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};


const navConfig = [
  // MENU
  {
    subheader: 'menu',
    items: [
      {
        title: 'orders',
        path: PATH_DASHBOARD.menu.orders.root,
        icon: ICONS.ecommerce,
        children: [{ title: 'list', path: PATH_DASHBOARD.menu.orders.list }],
      },
      {
        title: 'products',
        path: PATH_DASHBOARD.menu.products.root,
        icon: <ProductionQuantityLimitsIcon />,
        children: [
          { title: 'create', path: PATH_DASHBOARD.menu.products.new },
          // { title: 'product', path: PATH_DASHBOARD.menu.products.demoView },
          // { title: 'edit', path: PATH_DASHBOARD.menu.products.demoEdit },
          { title: 'list', path: PATH_DASHBOARD.menu.products.list },
        ],
      },
      {
        title: 'customers',
        path: PATH_DASHBOARD.menu.customers.root,
        icon: <PeopleIcon />,
        children: [
          // { title: 'create', path: PATH_DASHBOARD.menu.products.new },
          // { title: 'product', path: PATH_DASHBOARD.menu.products.demoView },
          // { title: 'edit', path: PATH_DASHBOARD.menu.products.demoEdit },
          { title: 'list', path: PATH_DASHBOARD.menu.customers.list },
        ],
      },
      {
        title: 'categories',
        path: PATH_DASHBOARD.menu.categories.root,
        icon: <LocalShippingIcon />,
        children: [
          { title: 'create', path: PATH_DASHBOARD.menu.categories.new },
          { title: 'list', path: PATH_DASHBOARD.menu.categories.list },
        ],
      },
      {
        title: 'categories',
        path: PATH_DASHBOARD.menu.categories.root,
        icon: <CategoryIcon />,
        children: [
          { title: 'create', path: PATH_DASHBOARD.menu.categories.new },
          // { title: 'category', path: PATH_DASHBOARD.menu.categories.view },
          // { title: 'edit', path: PATH_DASHBOARD.menu.categories.edit },
          { title: 'list', path: PATH_DASHBOARD.menu.categories.list },
        ],
      },
      // {
      //   title: 'contact_us',
      //   path: PATH_DASHBOARD.menu.contactUs.root,
      //   icon: <ContactUsIcon />,
      //   children: [
      //     { title: 'form', path: PATH_DASHBOARD.menu.contactUs.new },
      //     { title: 'list', path: PATH_DASHBOARD.menu.contactUs.list },
      //   ],
      // },
      // { title: 'reports', path: PATH_DASHBOARD.menu.reports, icon: ICONS.analytics },
      // { title: 'customers', path: PATH_DASHBOARD.menu.reports, icon: ICONS.user },
      // { title: 'discounts', path: PATH_DASHBOARD.menu.reports, icon: <DiscountIcon /> },
    ],
  },
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },

  // DEMO MENU STATES
  {
    subheader: 'settings',
    items: [
      { title: 'baseline', path: PATH_DASHBOARD.settings.baseline, icon: <TuneIcon /> },
      { title: 'onboarding', path: PATH_DASHBOARD.settings.onboarding, icon: <ElectricCarIcon /> },
      { title: 'license', path: PATH_DASHBOARD.settings.license, icon: <DownloadDoneIcon /> },
      // { title: 'payments', path: PATH_DASHBOARD.settings.payments, icon: <PaymentsIcon /> },
      { title: 'logistics', path: PATH_DASHBOARD.settings.logistics, icon: <LocalShippingIcon /> },
      // { title: 'policies', path: PATH_DASHBOARD.settings.policies, icon: <PolicyIcon /> },
      { title: 'branding', path: PATH_DASHBOARD.settings.branding, icon: <LinkIcon /> },
    ],
  },
];

export default navConfig;
