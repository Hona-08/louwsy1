export const deviceSize = {
  xs: 425,
  sm: 768,
  md: 1024,
  lg: 1440,
};

export const layoutConstant = {
  topbarHeight: 40,
  grocerySidenavWidth: 280,
  containerWidth: 1200,
  mobileNavHeight: 64,
  headerHeight: 80,
  mobileHeaderHeight: 64,
};

export const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/'

export const myLoader = ({ src, width, quality }) => {
  return `https://lowisy-dev.s3.eu-central-1.amazonaws.com/${src}?w=${width}&q=${quality || 75}`
}

