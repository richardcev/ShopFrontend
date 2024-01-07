import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/states/CartReducer";


const Carrito = () =>{
    const { cartproducts } = useSelector((store) => store)
    const { productsCart } = cartproducts;
    const dispatch= useDispatch();

    const handleRemoveProduct = (productid) =>{
        let deletedProduct= {}
        for(let product of productsCart){
            if(product.id== productid){
                deletedProduct= product
            }
        }
        dispatch(deleteProduct(deletedProduct))
    }
    return(
        <Container>
        <h3>Carrito de compras</h3>
        {
            productsCart.map((product) =>(
                
              <Product key={product.id}>
                <div>
                <Imagen src={product.imagen}/>
                </div>
                <div style={{marginTop:"20px"}}>
                  <h4>{product.nombre}</h4>
                  <Opciones>
                    <p style={{fontSize: "18px"}}>Cantidad: {product.cantidad}</p>
                    <RemoveButton onClick={() => handleRemoveProduct(product.id)}>
                          Eliminar
                    </RemoveButton>
                  </Opciones>

                </div>
                <div style={{marginTop:"18px"}}>
                <Precio>${product.total}</Precio>
                </div>

              </Product>
            ))
        }
        </Container>
    )
}


export default Carrito;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Muestra los productos uno debajo del otro */
  align-items: center;
  margin-top: 3%;
`;


const Product = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 2%;
  width: 40%;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;


const Opciones = styled.div`
  margin-top: 50px;
  display: flex;
`

const Imagen = styled.img`
  width: 200px;
  height: 200px;
`;

const Precio= styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-left: 120px;
`