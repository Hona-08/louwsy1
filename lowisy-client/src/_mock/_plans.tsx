import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'basic',
    icon: <PlanFreeIcon/>,
    price: 18,
    caption: <td>&nbsp;</td>,
    lists: [
      { text: 'Your own domain', isAvailable: true },
      { text: 'Custom reports', isAvailable: true },
      { text: 'Customer Reports & GDPR-compliant', isAvailable: true },
      { text: 'Ratings provided by Trustpilot', isAvailable: true },
      { text: 'Austrian e-commerce quality seal', isAvailable: true },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 16,
    caption: 'saving $2 a month',
    lists: [
      { text: 'Your own domain', isAvailable: true },
      { text: 'Custom reports', isAvailable: true },
      { text: 'Customer Reports & GDPR-compliant', isAvailable: true },
      { text: 'Ratings provided by Trustpilot', isAvailable: true },
      { text: 'Austrian e-commerce quality seal', isAvailable: true },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 15.2,
    caption: 'saving $2.8 a month',
    lists: [
      { text: 'Your own domain', isAvailable: true },
      { text: 'Custom reports', isAvailable: true },
      { text: 'Customer Reports & GDPR-compliant', isAvailable: true },
      { text: 'Ratings provided by Trustpilot', isAvailable: true },
      { text: 'Austrian e-commerce quality seal', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
