import React from 'react';

const AddProductContext = React.createContext({
    liveLocation: null,
    setLiveLocation: () => {},
    productImages: [],
    setProductImages: () => {}
});

export default AddProductContext;