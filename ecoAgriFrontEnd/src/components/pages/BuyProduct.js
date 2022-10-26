import { Grid } from "@mui/material";
import React from "react";
import BuyProductLeft from "../buy/BuyProductLeft";
import BuyProductRight from "../buy/BuyProductRight";
import MainHeader from "../layouts/MainHeader";
import { useDispatch, useSelector } from "react-redux";

function BuyProduct() {
  const id = window.location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.filter(
      (x) => x.id == id
    )
  );
  console.log(product);
  return (
    <React.Fragment>
      <MainHeader value={2} />
      <Grid container sx={{ pt: "100px", px: 5 }} spacing={5}>
        <Grid item xs={12} sm={7}>
          <BuyProductLeft productDetail = {product[0]} productId={id} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <BuyProductRight productDetail = {product[0]} productId={id} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BuyProduct;
