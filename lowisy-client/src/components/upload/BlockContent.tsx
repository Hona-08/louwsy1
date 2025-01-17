// @mui
import { Box, Typography, Stack } from '@mui/material';
import useLocales from 'src/hooks/useLocales';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  const { translate } = useLocales();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          {translate('drop_or_select_file')}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {translate('drop_files_here_or_click_browse_thorough_your_machine')}&nbsp;
          {/* <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            browse
          </Typography>
          &nbsp;thorough your machine */}
        </Typography>
      </Box>
    </Stack>
  );
}