import React from 'react'
 const normal=(route,rest)=>( 
    
        <route.layout {...rest}>
            <route.component {...rest} />
        </route.layout>
        
  );

  export default normal;