import Slider from 'react-slick';
import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// @types
import { DbProduct, Product } from '../../../@types/product';
//
import Image from '../../../components/Image';
import LightboxModal from '../../../components/LightboxModal';
import { CarouselArrowIndex } from '../../../components/carousel';
import { useQuery } from '@tanstack/react-query';
import { getShopProducts } from 'src/api/products';
import { IProducts } from 'src/pages/shop/ShopProductList';
// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

type Props = {
  product: IProducts;
};

export default function ProductDetailsCarousel({ product }: Props) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState<Slider>();

  const [nav2, setNav2] = useState<Slider>();

  const slider1 = useRef<Slider | null>(null);

  const slider2 = useRef<Slider | null>(null);

  const imagesLightbox = product?.productImages?.map((_image) => _image.images);

  // const imagesLightbox = product?.productImages?.map((_image) => //console.log('_image', _image));
  //console.log('IMAGE LIGHT', imagesLightbox);

  const handleOpenLightbox = (url: string) => {

    const selectedImage = imagesLightbox.findIndex((index) => index === url);

    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    speed: 320,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const settings2 = {
    speed: 320,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: product?.productImages?.length > 3 ? 3 : product?.productImages?.length,
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };
  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';
  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {product?.productImages?.map((img, index) => (
              <Image
                key={index}
                alt="large image"
                src={lowisy_s3_url + img.images}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img.images)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))}
          </Slider>
          <CarouselArrowIndex
            index={currentIndex}
            total={product?.productImages?.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(product?.productImages?.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(product?.productImages?.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(product?.productImages?.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(product?.productImages?.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(product?.productImages?.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(product?.productImages?.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${theme.palette.background.paper
                } 100%)`,
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' },
          }),
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {product?.productImages?.map((img, index) => (
            <Box key={index} sx={{ px: 0.75 }}>
              <Image
                disabledEffect
                alt="thumb image"
                src={lowisy_s3_url + img.images}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  ...(currentIndex === index && {
                    border: (theme) => `solid 3px ${theme.palette.primary.main}`,
                  }),
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <LightboxModal
        animationDuration={320}
        images={imagesLightbox}
        mainSrc={lowisy_s3_url + imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
        onMovePrevRequest={() => {
          handlePrevious();
          setSelectedImage((selectedImage + imagesLightbox.length - 1) % imagesLightbox.length);
        }}
        onMoveNextRequest={() => {
          handleNext();
          setSelectedImage((selectedImage + 1) % imagesLightbox.length);
        }}
      />
    </RootStyle>
  );
}
