import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton, IconButtonProps } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Contact } from '../../../@types/chat';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
import ChatSearchResults from './ChatSearchResults';
import ChatContactSearch from './ChatContactSearch';
import ChatConversationList from './ChatConversationList';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))<IconButtonProps>(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();

  const { push, pathname } = useRouter();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [isSearchFocused, setSearchFocused] = useState(false);

  const { conversations, activeConversationId } = useSelector((state) => state.chat);

  const isDesktop = useResponsive('up', 'md');

  const displayResults = searchQuery && isSearchFocused;

  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop, pathname]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  const handleChangeSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/chat/search', {
          params: { query: value },
        });
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
       (error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchSelect = (username: string) => {
    setSearchFocused(false);
    setSearchQuery('');
    push(PATH_DASHBOARD.chat.view(username));
  };

  const handleSelectContact = (result: Contact) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
    }
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          {!isCollapse && (
            <>
              <ChatAccount />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={handleToggleSidebar}>
            <Iconify
              width={20}
              height={20}
              icon={openSidebar ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            />
          </IconButton>

          {!isCollapse && (
            <NextLink href={PATH_DASHBOARD.chat.new} passHref>
              <IconButton>
                <Iconify icon={'eva:edit-fill'} width={20} height={20} />
              </IconButton>
            </NextLink>
          )}
        </Stack>

        {!isCollapse && (
          <ChatContactSearch
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar>
        {!displayResults ? (
          <ChatConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={activeConversationId}
            sx={{ ...(isSearchFocused && { display: 'none' }) }}
          />
        ) : (
          <ChatSearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
          <Iconify width={16} height={16} icon={'eva:people-fill'} />
        </ToggleButtonStyle>
      )}

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH,
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              '& .MuiDrawer-paper': {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important',
              },
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
