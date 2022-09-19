import React from 'react'

function ProductCard() {
  return (
    <Carousel
      steps={
        [{
          label: 'Create an ad',
          description: <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt="Paella dish"
          />,
        },
        {
          label: 'Create an ad',
          description: <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            alt="Paella dish"
          />,
        },
        {
          label: 'Create an ad',
          description: <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt="Paella dish"
          />,
        },]}
    />
  )
}

export default ProductCard