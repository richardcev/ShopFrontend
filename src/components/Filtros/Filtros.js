import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/states/ProductReducer';

const FiltrosProductos = () => {
  const [expandedPrice, setExpandedPrice] = useState(false);
  const [expandedBrand, setExpandedBrand] = useState(false);
  const [marcas, setMarcas] = useState([])
  const [selectedMarcas, setSelectedMarcas] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [marcasId, setMarcasId] = useState("")
  const [rangosPrecios, setRangosPrecios] = useState("")
  const apiUrl = process.env.REACT_APP_API_URL;

  const { products} = useSelector((store) => store);
  const dispatch = useDispatch();

  const { productos} = products
  const precios = ['$0-$21', '$21-$41', '$41-$61', '$61-$81', '$81-$101', '$101-$201', 'Mayor a $201'];

  useEffect(() => {
    let marcasUpdated = []
    if (productos) {
        for (let producto of productos) {
          if (producto.marca) {
            let nombre_marca = producto.marca.nombre;
            let id_marca = producto.marca.id;
      
            // Verificar si ya existe un objeto con el mismo id y marca en marcasUpdated
            const existeMarca = marcasUpdated.some(
              (marcaObj) => marcaObj.id === id_marca && marcaObj.marca === nombre_marca
            );
      
            // Si no existe, agregar el nuevo objeto a marcasUpdated
            if (!existeMarca) {
              marcasUpdated.push({ id: id_marca, marca: nombre_marca });
            }
          }
        }
      }      
    setMarcas(marcasUpdated)

  }, [])

  const handleChangePrice = () => {
    setExpandedPrice(!expandedPrice);
  };

  const handleChangeBrand = () => {
    setExpandedBrand(!expandedBrand);
  };

  const handleChangePrecio = (event, rango) =>{
    let rango_format = formatRango(rango)
    let rangos_precios = ""
    const isChecked = event.target.checked;
    setSelectedPrices((prevSelected) =>
        isChecked ? [...prevSelected, rango] : prevSelected.filter(precio => precio !== rango)
    );
    if(isChecked){
        rangos_precios = rango_format + ','
        for(let price of selectedPrices){
            let range_format = formatRango(price)
            rangos_precios = rangos_precios + range_format + ","
        }
    }
    else{
        for(let price of selectedPrices){
            if(price!== rango){
                let range_format = formatRango(price)
                rangos_precios= rangos_precios + range_format + ','
            }
        }
    }
    console.log("RANGOS", rangos_precios)
    rangos_precios= rangos_precios.slice(0, rangos_precios.length-1)
    setRangosPrecios(rangos_precios)
    fetch(`${apiUrl}productos/?price_ranges=${rangos_precios}&marca=${marcasId}`)
    .then(response => response.json())
    .then(data =>{
        if(data){
            dispatch(setProducts(data))
        }
    })
    .catch(err => console.error(err))
  }

  const formatRango = (rango) =>{
    if(rango !== "Mayor a $201"){
        let rangoList = rango.split('-')
        let primerPrecio = rangoList[0]
        let segundoPrecio = rangoList[1]
        let rangoFormat = primerPrecio.slice(1, primerPrecio.length) + '-' + segundoPrecio.slice(1, segundoPrecio.length)
        return rangoFormat
    }
    else{
        return "201"
    }
  }

  const handleChangeMarca = (event, marcaId) =>{
    let marcasId = ""
    const isChecked = event.target.checked;
    setSelectedMarcas((prevSelected) =>
        isChecked ? [...prevSelected, marcaId] : prevSelected.filter(id => id !== marcaId)
    );
    if(isChecked){
        marcasId = marcaId + ','
        for(let marca of selectedMarcas){
            marcasId = marcasId + marca + ","
        }
    }
    else{
        for(let marca of selectedMarcas){
            if(marca!== marcaId){
                marcasId= marcasId + marca + ','
            }
        }
    }
    marcasId = marcasId.slice(0, marcasId.length-1)
    setMarcasId(marcasId)
    fetch(`${apiUrl}productos/?marca=${marcasId}&price_ranges=${rangosPrecios}`)
    .then(response => response.json())
    .then(data =>{
        if(data){
            dispatch(setProducts(data))
        }
    })
    .catch(err => console.error(err))
  }

  const AccordionWithDivider = ({ title, expanded, onChange, children }) => (
    <Accordion 
      expanded={expanded} 
      onChange={onChange} 
      elevation={0}
      disableGutters
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        sx={{
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          minHeight: 48,
          '&.Mui-expanded': {
            minHeight: 48,
          },
        }}
      >
        <Typography sx={{ fontSize: '1rem' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '8px 16px 16px' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 360, marginTop: '20%', marginLeft: '10%' }}>
      <Accordion 
        elevation={0}
        disableGutters
        expanded={false}
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          sx={{
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
            minHeight: 48,
            '&.Mui-expanded': {
              minHeight: 48,
            },
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Filtros
          </Typography>
        </AccordionSummary>
      </Accordion>
      
      <AccordionWithDivider
        title="Precios"
        expanded={expandedPrice}
        onChange={handleChangePrice}
      >
        <FormGroup>
          {precios.map((precio, index) => (
            <FormControlLabel
              key={index}
              control={
              <Checkbox 
              checked={selectedPrices.includes(precio)}
              onChange={(e) => handleChangePrecio(e, precio)} 
              />
            }
              label={precio}
            />
          ))}
        </FormGroup>
      </AccordionWithDivider>
      
      <AccordionWithDivider
        title="Marcas"
        expanded={expandedBrand}
        onChange={handleChangeBrand}
      >
        <FormGroup>
          {marcas.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
              <Checkbox 
                checked={selectedMarcas.includes(item.id)}
                onChange={(e) => handleChangeMarca(e, item.id)} 
              />}
              label={item.marca}
            />
          ))}
        </FormGroup>
      </AccordionWithDivider>
    </Box>
  );
};

export default FiltrosProductos;