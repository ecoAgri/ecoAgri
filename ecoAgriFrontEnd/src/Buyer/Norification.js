return (
          <Card sx={{ width: "100%" }}>
              <CardHeader
                  avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                      </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
              />
              <Carousel
                  images={
                      [
                          {
                              imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                              label: "hello"
                          },
                          {
                              imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                              label: "hello2"
                          },
                          {
                              imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                              label: "hello3"
                          }
                      ]}
              />
              <CardContent>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      <b>This impressive paella is a perfect party</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
                  </Typography>
              </CardContent>
              <CardActions disableSpacing>
                  <Grid container>
                      <Grid item xs={4}>
                          <CardModal onConfirm={articalConfirmHandler} />
                      </Grid>
                      {userType === "Moderator" &&
                          <Grid item xs={8}>
                              <CenteredBox align="right">
                                  <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                  <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                              </CenteredBox>
                          </Grid>
                      }
                  </Grid>
              </CardActions>
          </Card>
      );
      return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Carousel
                images={
                    [
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                            label: "hello2"
                        },
                        {
                            imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                            label: "hello3"
                        }
                    ]}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
