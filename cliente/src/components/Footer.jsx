import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer = () => {
 return (
    <Container maxWidth="xl" sx={{ backgroundColor: 'white', padding: 1 }}>
      <Typography variant="body2" align="center" sx={{ marginTop: 4 }}>
        Desarrollado por (sus nombres)
      </Typography>
    </Container>
 );
};

export default Footer;