// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CardModal from './CardModal';
// import Carousel from '../ui/Carousel';
// import { Button, Grid } from '@mui/material';
// import CenteredBox from '../ui/CenteredBox';
// import { useSelector } from 'react-redux';
// import Swal from 'sweetalert2'
// // import Carousel from '../ui/Carousel/Carousel';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

// export default function AdvertistmentCard(props) {
//     const [expanded, setExpanded] = React.useState(false);
//     const user = useSelector((state) => state.user.currentUser);
//     const userType = user.userrole;
//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     const articalConfirmHandler = (type) => {
//         Swal.fire({
//             title: `Are you want to ${type} the artical?`,
//             text: "You won't be able to revert this!",
//             icon: type === "reject" ? 'error' : 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: `Yes, ${type} it!`
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 //Confirmation backend call here
//                 Swal.fire(
//                     `${type}!`,
//                     `Artical has been ${type}.`,
//                     'success'
//                 )
//             }
//         })
//     }

//     return (
//         <Card sx={{ width: "100%" }}>
//             <CardHeader
//                 avatar={
//                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                         R
//                     </Avatar>
//                 }
//                 title={props.data.title}
//                 subheader={props.data.createDate}
//             />
//             <Carousel
//                 images={
//                     [
//                         {
//                             imgPath: props.data.image1,
//                             label: "hello"
//                         },
//                         {
//                             imgPath: props.data.image2,
//                             label: "hello2"
//                         },
//                         {
//                             imgPath: props.data.image3,
//                             label: "hello3"
//                         }
//                     ]}
//             />
//             <CardContent>
//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                     <b>{props.data.title}</b>
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {props.data.des}
//                 </Typography>
//             </CardContent>
//             <CardActions disableSpacing>
//                 <Grid container>
//                     <Grid item xs={4}>
//                         <CardModal onConfirm={articalConfirmHandler} />
//                     </Grid>
//                     {userType === "Moderator" &&
//                         <Grid item xs={8}>
//                             <CenteredBox align="right">
//                                 <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
//                                 <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
//                             </CenteredBox>
//                         </Grid>
//                     }
//                 </Grid>
//             </CardActions>
//         </Card>
//     );
// }


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardModal from './CardModal';
import Carousel from '../ui/Carousel';
import { Button, Grid } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
// import Carousel from '../ui/Carousel/Carousel';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function AdvertistmentCard() {
    const [expanded, setExpanded] = React.useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const userType = user.userrole;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const articalConfirmHandler = (type) => {
        Swal.fire({
            title: `Are you want to ${type} the advertistment?`,
            text: "You won't be able to revert this!",
            icon: type === "reject" ? 'error' : 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${type} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                //-----------------------------------Confirmation backend call here--------------------------------------------------------
                Swal.fire(
                    `${type}!`,
                    `Advertistment has been ${type}.`,
                    'success'
                )
            }
        })
    }

    const deleteHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //----------------delete api call here-----------------------------
                // fetchUserData({
                //     method: "put",
                //     url: "api/v1/post/delete-post",
                //     data: postData
                // }).then(() => {
                //     Swal.fire(
                //         'Deleted!',
                //         'Your file has been removed.',
                //         'success'
                //     ).then(() => {
                //         dispatch(postActions.setPostDelete())
                //     })
                // })
            }
        })
    }
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                sx={{ p: 0, pl: 1 }}
                action={
                    <IconButton color="error" onClick={deleteHandler}>
                        <HighlightOffIcon />
                    </IconButton>
                }
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            />
            <CardActions disableSpacing>
                <Grid container>
                    {/* <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid> */}
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
}