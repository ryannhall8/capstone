// const addToCart = async (productId) => {
//         const response = await fetch(`https://fakestoreapi.com/carts/user/${auth.id}`);
//         const cartData = await response.json();
      
//         const updatedCartData = {
//           ...cartData,
//           products: [...cartData.products, { productId, quantity: 1 }],
//         };
      
//         await fetch(`https://fakestoreapi.com/carts/${updatedCartData.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedCartData),
//         });
      
//         // Update local storage
//         localStorage.setItem('carts', JSON.stringify([updatedCartData]));
//       };

// const addToCart = async (productId) => {
//     const updatedCart = [...userCart, { productId, quantity: 1 }];
//     const response = await fetch('https://fakestoreapi.com/carts/user/1', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ products: updatedCart }),
//     });
//     if (response.ok) {
//       setUserCart(updatedCart);
//     } else {
//       console.error('Failed to add product to cart');
//     }
//   };

const addToCart = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/user/${auth.id}`);
      const cartData = await response.json();
  
      const updatedCartData = {
        ...cartData,
        products: [...cartData.products, { productId, quantity: 1 }],
      };
  
      await fetch(`https://fakestoreapi.com/carts/${auth.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCartData),
      });
  
      localStorage.setItem(`cart_${auth.id}`, JSON.stringify(updatedCartData));
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  

  export default addToCart;