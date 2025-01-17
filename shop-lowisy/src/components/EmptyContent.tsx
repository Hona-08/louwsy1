// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';
//
import Image from './LazyImage';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    title: string;
    img?: string;
    description?: string;
}

export default function EmptyContent({ title, description, img, ...other }: Props) {
    return (
        <RootStyle {...other}>
            <Image
                alt="empty content"
                src={img || '/assets/images/illustrations/illustration_empty_content.svg'}
                sx={{ height: 240, mb: 3 }}
                width={500}
                height={100}
            />

            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>

            {description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            )}
        </RootStyle>
    );
}
