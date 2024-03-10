import React, { useEffect, useState } from 'react'

function singleProduct (productId){
    useEffect(() => {
        const response = fetch(`https://fakestoreapi.com/products/${productId}`)
        console.log('hi', productId)
        const json = response.json();
        return json;
        }
      , [])}
;
export default singleProduct;