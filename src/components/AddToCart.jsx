const addToCart = async (productId, auth, token, carts, setCarts) => {
    try {
        if (!auth.id) {
            throw ('User is not authenticated');
        }

        const response = await fetch(`https://fakestoreapi.com/carts/${auth.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: productId,
                quantity: 1,
            }),
        });

        if (!response.ok) {
            throw ('Failed to add product to cart');
        }

        const newCart = await response.json();
        setCarts([...carts, newCart]);
    } catch (error) {
        console.error('Add to cart error:', error);
    }
};

  export default addToCart;

//   const addToCart = async (productId) => {
//     const response = await fetch(`https://fakestoreapi.com/carts/user/${auth.id}`);
//     const cartData = await response.json();
  
//     const updatedCartData = {
//       ...cartData,
//       products: [...cartData.products, { productId, quantity: 1 }],
//     };
  
//     await fetch(`https://fakestoreapi.com/carts/${updatedCartData.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedCartData),
//     });
  
//     // Update local storage
//     localStorage.setItem('carts', JSON.stringify([updatedCartData]));
//   };
  