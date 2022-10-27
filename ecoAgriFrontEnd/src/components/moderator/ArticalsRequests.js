import { Grid } from "@mui/material";
import React from "react";
import CenteredBox from "../ui/CenteredBox";
import ArticalCard from "../articals/ArticalCard";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getArticles } from "../../store/articleApiCalls";

function ArticalsRequests() {
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const articles = useSelector((state) => state.article.articles);
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getOrderData = async () => {
      const articleStatus = await getArticles(dispatch, token);
      if (articleStatus) {
        console.log("Success");
        console.log(articles);
        let data = [];
        articles.map((item) => {
          data.push({
            id: item.id,
            col1: item.username,
            col2: item.productName,
            col3: item.productCategory,
            col4: item.totalPrice,
            col5: item.expireDate,
          });
        });
        setRows(data);
      } else {
        console.log("Unsuccess");
      }
    };
    getOrderData();
  }, []);
  return (
    <div>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1 }}>
        {rows.map((item) => {
          <Grid item xs={12} sm={6} md={4}>
            <CenteredBox align="center">
              <ArticalCard data={item}></ArticalCard>
            </CenteredBox>
          </Grid>
        })}
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard data={rows[0]}></ArticalCard>
          </CenteredBox>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default ArticalsRequests;
