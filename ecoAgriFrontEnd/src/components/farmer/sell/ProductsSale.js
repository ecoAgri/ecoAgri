import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CenteredBox from "../../ui/CenteredBox";
import { Button, Typography } from "@mui/material";
import EditSaleProduct from "./EditSaleProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/productApiCalls";

export default function ProductsSale(props) {
  const userId = useSelector((state) => state.user.currentUser.id);
  const products = useSelector((state) => state.product.products);
  const token = useSelector((state) => state.user.token);
  const [newData, setNewData] = React.useState([]);
  const dispatch = useDispatch();
  // props.productType == "donateProduct"
  const productDonates = useSelector((state) =>
    state.product.products.filter(
      (x) => x.isDonate == true && x.sellerId == userId
    )
  );
  const productSell = useSelector((state) =>
    state.product.products.filter(
      (x) => x.isDonate != true && x.sellerId == userId
    )
  );

  React.useEffect(() => {
    const getDataFromDB = ()=>{
      getProducts(dispatch, token);
    }
    getDataFromDB();
  },[])

  React.useEffect(() => {
    const getRelevantProducts = () => {
      console.log(productDonates);
      let data = [];
      if (props.productType != "sell") {
        productDonates.map((item) => {
          data.push({
            img: item.image1,
            title: item.productName,
            author: (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {item.weight}
                    {item.weightUOM}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {props.productType === "sell" && (
                    <CenteredBox align="right">
                      <Typography variant="body2">
                        {item.priceUOM}
                        {item.unitPrice}
                      </Typography>
                    </CenteredBox>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <CenteredBox align="right">
                    <EditSaleProduct
                      id={item.id}
                      unitPrice={item.unitPrice}
                      manuDate={item.manuDate}
                      expireDate={item.expireDate}
                      fieldAddress={item.fieldAddress}
                      district={item.district}
                      city={item.location}
                      productCategory={item.productCategory}
                      img={item.image1}
                      title={item.productName}
                      weight={item.weight}
                      author={
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {item.weight}" "{item.weightUOM}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {props.productType === "sell" && (
                              <CenteredBox align="right">
                                <Typography variant="body2">
                                  {item.priceUOM}" "{item.unitPrice}
                                </Typography>
                              </CenteredBox>
                            )}
                          </Grid>
                        </Grid>
                      }
                    />
                  </CenteredBox>
                </Grid>
              </Grid>
            ),
          });
        });
      } else {
        productSell.map((item) => {
          data.push({
            img: item.image1,
            title: item.productName,
            author: (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {item.weight}
                    {item.weightUOM}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {props.productType === "sell" && (
                    <CenteredBox align="right">
                      <Typography variant="body2">
                        {item.priceUOM}
                        {item.unitPrice}
                      </Typography>
                    </CenteredBox>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <CenteredBox align="right">
                    <EditSaleProduct
                      id={item.id}
                      unitPrice={item.unitPrice}
                      manuDate={item.manuDate}
                      expireDate={item.expireDate}
                      fieldAddress={item.fieldAddress}
                      district={item.district}
                      city={item.location}
                      productCategory={item.productCategory}
                      img={item.image1}
                      title={item.productName}
                      weight={item.weight}
                      author={
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {item.weight}" "{item.weightUOM}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {props.productType === "sell" && (
                              <CenteredBox align="right">
                                <Typography variant="body2">
                                  {item.priceUOM}" "{item.unitPrice}
                                </Typography>
                              </CenteredBox>
                            )}
                          </Grid>
                        </Grid>
                      }
                    />
                  </CenteredBox>
                </Grid>
              </Grid>
            ),
          });
        });
      }
      setNewData(data);
      console.log(newData);
    };
    getRelevantProducts();
  }, []);
  // const DUMMUY_DATA = dummyDataHandler(props.productType);
  const DUMMUY_DATA =
    props.productType == "donateProduct" ? productDonates : productSell;

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
      {newData.map((item) => (
        <Grid key={item.title} item xs={12} sm={6} md={4} lg={3}>
          <ImageListItem style={{ borderRadius: 10 }}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ height: "230px" }}
            />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        </Grid>
      ))}
    </Grid>
  );
}

const dummyDataHandler = (productType) => {
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      title: "Mango",
      author: (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">2kg</Typography>
          </Grid>
          <Grid item xs={2}>
            {productType === "sell" && (
              <CenteredBox align="right">
                <Typography variant="body2">Rs. 300</Typography>
              </CenteredBox>
            )}
          </Grid>
          <Grid item xs={4}>
            <CenteredBox align="right">
              <EditSaleProduct
                img="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                title="Mango"
                author={
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2">2kg</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {productType === "sell" && (
                        <CenteredBox align="right">
                          <Typography variant="body2">Rs. 300</Typography>
                        </CenteredBox>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </CenteredBox>
          </Grid>
        </Grid>
      ),
    },
    {
      img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
      title: "Banana",
      author: (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">2kg</Typography>
          </Grid>
          <Grid item xs={2}>
            {productType === "sell" && (
              <CenteredBox align="right">
                <Typography variant="body2">Rs. 300</Typography>
              </CenteredBox>
            )}
          </Grid>
          <Grid item xs={4}>
            <CenteredBox align="right">
              <EditSaleProduct
                img="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                title="Mango"
                author={
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2">2kg</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {productType === "sell" && (
                        <CenteredBox align="right">
                          <Typography variant="body2">Rs. 300</Typography>
                        </CenteredBox>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </CenteredBox>
          </Grid>
        </Grid>
      ),
    },
    {
      img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
      title: "Pine Apple",
      author: (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">2kg</Typography>
          </Grid>
          <Grid item xs={2}>
            {productType === "sell" && (
              <CenteredBox align="right">
                <Typography variant="body2">Rs. 300</Typography>
              </CenteredBox>
            )}
          </Grid>
          <Grid item xs={4}>
            <CenteredBox align="right">
              <EditSaleProduct
                img="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                title="Mango"
                author={
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2">2kg</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {productType === "sell" && (
                        <CenteredBox align="right">
                          <Typography variant="body2">Rs. 300</Typography>
                        </CenteredBox>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </CenteredBox>
          </Grid>
        </Grid>
      ),
    },
    {
      img: "https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Avacado",
      author: (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">2kg</Typography>
          </Grid>
          <Grid item xs={2}>
            {productType === "sell" && (
              <CenteredBox align="right">
                <Typography variant="body2">Rs. 300</Typography>
              </CenteredBox>
            )}
          </Grid>
          <Grid item xs={4}>
            <CenteredBox align="right">
              <EditSaleProduct
                img="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                title="Mango"
                author={
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2">2kg</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {productType === "sell" && (
                        <CenteredBox align="right">
                          <Typography variant="body2">Rs. 300</Typography>
                        </CenteredBox>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </CenteredBox>
          </Grid>
        </Grid>
      ),
    },
  ];
  return itemData;
};
