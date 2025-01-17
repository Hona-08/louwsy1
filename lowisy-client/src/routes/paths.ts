// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_SHOP = '/shop';
const ROOTS_ONBOARDING = '/onboarding/new';
const ROOTS_ONBOARDING_FINAL = '/onboarding/final';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: (token: string) => path(ROOTS_AUTH, `/setup-password/${token}`),
};

export const PATH_SHOP = {
  root: ROOTS_SHOP,
  view: (shopId: string) => path(ROOTS_SHOP, `/${shopId}`),
  product: {
    view: (shopId: string, productName: string) =>
      path(ROOTS_SHOP, `/${shopId}/product/${productName}`),
  },
  checkout: path(ROOTS_SHOP, '/checkout'),
  aboutUs: path(ROOTS_SHOP, '/about-us'),
  ourServices: path(ROOTS_SHOP, '/our-services'),
  contactUs: path(ROOTS_SHOP, '/contact-us'),
  //demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
};

export const PATH_ONBOARDING = {
  root: ROOTS_ONBOARDING,
  final: ROOTS_ONBOARDING_FINAL

};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  settings: {
    baseline: path(ROOTS_DASHBOARD, '/settings/baseline'),
    onboarding: path(ROOTS_DASHBOARD, '/settings/onboarding'),
    license: path(ROOTS_DASHBOARD, '/settings/license'),
    policies: path(ROOTS_DASHBOARD, '/settings/policies'),
    logistics: path(ROOTS_DASHBOARD, '/settings/logistics'),
    payments: path(ROOTS_DASHBOARD, '/settings/payments'),
    branding: path(ROOTS_DASHBOARD, '/settings/branding'),
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  menu: {
    orders: {
      root: path(ROOTS_DASHBOARD, '/orders'),
      list: path(ROOTS_DASHBOARD, '/orders/list'),
      view: (name: string) => path(ROOTS_DASHBOARD, `/orders/order/${name}`),
    },
    products: {
      root: path(ROOTS_DASHBOARD, '/products'),
      new: path(ROOTS_DASHBOARD, '/products/product/new'),
      view: (name: string) => path(ROOTS_DASHBOARD, `/products/product/${name}`),
      edit: (name: string) => path(ROOTS_DASHBOARD, `/products/product/${name}/edit`),
      demoEdit: path(ROOTS_DASHBOARD, '/products/product/nike-blazer-low-77-vintage/edit'),
      demoView: path(ROOTS_DASHBOARD, '/products/product/nike-air-force-1-ndestrukt'),
      list: path(ROOTS_DASHBOARD, '/products/list'),
    },
    customers: {
      root: path(ROOTS_DASHBOARD, '/customers'),
      view: (name: string) => path(ROOTS_DASHBOARD, `/customers/customer/${name}`),
      edit: (name: string) => path(ROOTS_DASHBOARD, `/customers/customer/${name}/edit`),
      list: path(ROOTS_DASHBOARD, '/customers/list'),
    },
    categories: {
      root: path(ROOTS_DASHBOARD, '/categories'),
      new: path(ROOTS_DASHBOARD, '/categories/category/new'),
      view: (name: string) => path(ROOTS_DASHBOARD, `/categories/category/${name}`),
      edit: (name: string) => path(ROOTS_DASHBOARD, `/categories/category/${name}/edit`),
      subCategory: (name: any) =>
        path(ROOTS_DASHBOARD, `/categories/category/${name}/sub-category`),
      // demoEdit: path(ROOTS_DASHBOARD, '/products/product/nike-blazer-low-77-vintage/edit'),
      // demoView: path(ROOTS_DASHBOARD, '/products/product/nike-air-force-1-ndestrukt'),
      list: path(ROOTS_DASHBOARD, '/categories/list'),
    },
    reports: path(ROOTS_DASHBOARD, '/reports'),
    discounts: path(ROOTS_DASHBOARD, '/discounts'),
    contactUs: {
      root: path(ROOTS_DASHBOARD, '/contact-us'),
      new: path(ROOTS_DASHBOARD, '/contact-us/new'),
      view: (contactUsId: string) => path(ROOTS_DASHBOARD, `/contact-us/${contactUsId}`),
      edit: (contactUsId: string) => path(ROOTS_DASHBOARD, `/contact-us/${contactUsId}/edit`),
      list: path(ROOTS_DASHBOARD, '/contact-us/list'),
    },
  },

  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
