import { useParams } from 'react-router-dom'


const Product = ({ products })=> {
    const params = useParams();
    const id = params.id*1;
    const product = products.find(product => product.id === id);
    console.log(product)
    if(!product){
      return null;
    }
    return(
      <div>
        <h2>{product.title}</h2>
        <p>price: ${product.price}</p>
        <h5>description: {product.description}</h5>
        <img src= {product.image} />
      </div>
    )
   }

   export default Product;