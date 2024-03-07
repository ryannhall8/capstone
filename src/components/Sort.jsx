import React, { useEffect, useState } from 'react'

function Sort(props){
    
    return(
        <h3>{props.products && props.products[0]?.title}</h3>
        //console.log(props.products[0])

    )
}

export default Sort;