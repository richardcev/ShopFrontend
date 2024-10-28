import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './DetalleItems.css'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  minWidth: 'auto',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  minHeight: '200px',
}));

const DetalleItems = ({producto}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [features, setFeatures] = useState(null)
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() =>{
    fetch(`${apiUrl}detalle-productos/?producto=${producto}`)
    .then(response => response.json())
    .then(data =>{
        if(data){
            setFeatures(data)
        }
    })
    .catch(err => console.error(err))

  }, [])

  return (
    <Box sx={{ width: '100%', maxWidth: '70%', margin: '0 auto' }}>
      <StyledTabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="product description tabs"
      >
        <StyledTab label="Detalle del producto" />
        <StyledTab label="Especificaciones" />
      </StyledTabs>

      {selectedTab === 0 && (
        <ContentBox>
          <Typography>
            {
                features &&
                features.map((item) => (
                    <p className='descripcion'>{item.caracteristica}</p>
                )) 
            }
          </Typography>
        </ContentBox>
      )}
      {selectedTab === 1 && (
        <ContentBox>
          <Typography>
            Aquí están las especificaciones técnicas del producto. Este es el contenido del segundo tab.
          </Typography>
        </ContentBox>
      )}
    </Box>
  );
};

export default DetalleItems;
