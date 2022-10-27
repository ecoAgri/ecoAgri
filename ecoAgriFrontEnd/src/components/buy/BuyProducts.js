import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CenteredBox from "../ui/CenteredBox";
import { Box, Button, Typography } from "@mui/material";
import SellerDetailsContainer from "./SellerDetailsContainer";
import { useNavigate } from "react-router";
import ProdcutCard from "./ProdcutCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/productApiCalls";
import { async } from "@firebase/util";

export default function BuyProducts(props) {
  const navigate = useNavigate();
  const [itemProductData, setItemProductData] = React.useState([]);

  const userId = useSelector((state) => state.user.currentUser.id);
  const userType = useSelector((state) => state.user.userType);

  console.log(userId);
  const products = useSelector((state) => state.product.products);
  const productCategory = useSelector((state) =>
    state.product.products.filter(
      (x) =>
        x.productCategory == props.productCategory &&
        x.isDonate == false &&
        x.sellerId != userId
    )
  );
  const productCategoryCharity = useSelector((state) =>
    state.product.products.filter(
      (x) =>
        x.productCategory == props.productCategory &&
        x.isDonate == true &&
        x.sellerId != userId
    )
  );

  React.useEffect(() => {
    const setFilter = () => {
      console.log(props.locationDetail);
      if (!(props.locationDetail == "None")) {
        // alert("Hii");
        let result = products.filter(
          (x) =>
            x.district == props.locationDetail &&
            x.productCategory == props.productCategory &&
            x.isDonate == false
        );
        console.log(result);
        let data = [];
        result.map((item) => {
          data.push({
            key: item.id,
            id: item.id,
            author: (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body2">Rs. {item.unitPrice}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <CenteredBox align="right">
                    <Typography variant="body2">{item.weight} kg</Typography>
                  </CenteredBox>
                </Grid>
              </Grid>
            ),
            title: item.productName,
            image1: item.image1,
            image2: item.image2,
            image3: item.image3,
            image4: item.image4,
          });
        });
        setItemProductData(data);
      }
    };
    setFilter();
  }, [props.flag, props.locationDetail]);

  React.useEffect(() => {
    const setFilter = () => {
      console.log(props.cityDetail);
      if (!(props.cityDetail == "None")) {
        // alert("Hii");
        let result = products.filter(
          (x) =>
            x.location == props.cityDetail &&
            x.productCategory == props.productCategory &&
            x.isDonate == false
        );
        console.log(result);
        let data = [];
        result.map((item) => {
          data.push({
            key: item.id,
            id: item.id,
            author: (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body2">Rs. {item.unitPrice}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <CenteredBox align="right">
                    <Typography variant="body2">{item.weight} kg</Typography>
                  </CenteredBox>
                </Grid>
              </Grid>
            ),
            title: item.productName,
            image1: item.image1,
            image2: item.image2,
            image3: item.image3,
            image4: item.image4,
          });
        });
        setItemProductData(data);
      }
    };
    setFilter();
  }, [props.cityFlag, props.cityDetail]);

  // const vegitables = useSelector((state) => state.product.products.filter(x => x.productCategory == "Vegitable"));
  let token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getProductData = async () => {
      const productStatus = await getProducts(dispatch, token);
      let data = [];
      if (productStatus) {
        // alert("Data success");
        if (userType == "Charity") {
          productCategoryCharity.map((item) => {
            data.push({
              key: item.id,
              id: item.id,
              author: (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Rs. {item.unitPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <CenteredBox align="right">
                      <Typography variant="body2">{item.weight} kg</Typography>
                    </CenteredBox>
                  </Grid>
                </Grid>
              ),
              title: item.productName,
              image1: item.image1,
              image2: item.image2,
              image3: item.image3,
              image4: item.image4,
            });
          });
        } else {
          productCategory.map((item) => {
            data.push({
              key: item.id,
              id: item.id,
              author: (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Rs. {item.unitPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <CenteredBox align="right">
                      <Typography variant="body2">{item.weight} kg</Typography>
                    </CenteredBox>
                  </Grid>
                </Grid>
              ),
              title: item.productName,
              image1: item.image1,
              image2: item.image2,
              image3: item.image3,
              image4: item.image4,
            });
          });
        }
        setItemProductData(data);
        console.log(productCategory);
      } else {
        // alert("Data unsuccess");
      }
    };
    getProductData();
  }, []);

  const createProductArray = () => {
    productCategory.map((item) => {
      itemProductData.push({
        key: item.id,
        id: item.id,
        author: (
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">Rs. {item.unitPrice}</Typography>
            </Grid>
            <Grid item xs={2}>
              <CenteredBox align="right">
                <Typography variant="body2">{item.unitPrice} kg</Typography>
              </CenteredBox>
            </Grid>
          </Grid>
        ),
        title: item.productName,
        image1: item.image1,
        image2: item.image2,
        image3: item.image3,
        image4: item.image4,
      });
    });
  };

  return (
    <Box>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">{props.productCategory}</Typography>
        </Grid>
        {itemProductData.map((item) => (
          <Grid key={item.key} item xs={12} sm={6} md={4} lg={3}>
            <ProdcutCard productType={props.productType} item={item} />
          </Grid>
        ))}
        {/* {itemData.map((item) => (
                    <Grid key={item.key} item xs={12} sm={6} md={4} lg={3}>
                        <ProdcutCard item={item} />
                    </Grid>
                ))} */}
      </Grid>
    </Box>
  );
}

const itemData = [
  {
    key: "buy-product-1",
    id: "1",
    author: (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body2">Rs. 300</Typography>
        </Grid>
        <Grid item xs={2}>
          <CenteredBox align="right">
            <Typography variant="body2">2kg</Typography>
          </CenteredBox>
        </Grid>
      </Grid>
    ),
    title: "Mango",
    img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    title: "Banana",
    key: "buy-product-2",
    id: "2",
    author: (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body2">Rs. 300</Typography>
        </Grid>
        <Grid item xs={2}>
          <CenteredBox align="right">
            <Typography variant="body2">2kg</Typography>
          </CenteredBox>
        </Grid>
      </Grid>
    ),
  },
  {
    img: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
    title: "Pine Apple",
    key: "buy-product-3",
    id: "3",
    author: (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body2">Rs. 300</Typography>
        </Grid>
        <Grid item xs={2}>
          <CenteredBox align="right">
            <Typography variant="body2">2kg</Typography>
          </CenteredBox>
        </Grid>
      </Grid>
    ),
  },
  {
    img: "https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Avacado",
    key: "buy-product-4",
    id: "4",
    author: (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body2">Rs. 300</Typography>
        </Grid>
        <Grid item xs={2}>
          <CenteredBox align="right">
            <Typography variant="body2">2kg</Typography>
          </CenteredBox>
        </Grid>
      </Grid>
    ),
  },
];
