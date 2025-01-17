import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterBox = styled(Box)({
  backgroundColor: '#111d4d',
  color: 'white',
  textAlign: 'center',
  padding: '5px 0',
});

const CopyrightText = styled(Typography)({
  fontSize: '1.0rem',
  fontWeight: 'bold',
});

const footerStyle:any = {
  backgroundColor: '#111d4d',
  position: 'sticky',
  top: '100vh'
};

function Footer() {
  return (
    <AppBar position="relative" style={footerStyle}>
      <FooterBox>
        <CopyrightText>&copy; 2023 Lowisy &reg; </CopyrightText>
      </FooterBox>
    </AppBar>
  );
}

export default Footer;
