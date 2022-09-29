import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import CenteredBox from '../CenteredBox';

export default function DashBoardCard(props) {
    return (
        <Card sx={{ maxWidth: 280 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.product}
                    </Typography>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="body2" color="text.secondary">
                                {props.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <CenteredBox align="right">
                                <Typography variant="body2" color="text.secondary">
                                    {props.weight}
                                </Typography>
                            </CenteredBox>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
