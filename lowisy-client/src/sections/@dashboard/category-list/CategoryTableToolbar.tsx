// @mui
import { Tooltip, IconButton, Stack, InputAdornment, TextField } from '@mui/material';
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../components/Iconify';
import FileImportExport from '../ImportExport';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
  refetch?: any;
  results?: any;
};

export default function CategoryTableToolbar({
  filterName,
  onFilterName,
  refetch,
  results,
}: Props) {
  const { translate } = useLocales();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5, px: 3 }}
    >
      <TextField
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={translate('search_category') + '...'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />

      {/* <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip> */}
      <FileImportExport refetch={refetch} results={results} />
    </Stack>
  );
}
