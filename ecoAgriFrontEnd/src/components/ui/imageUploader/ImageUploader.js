import React, { useContext, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import classes from './ImageUploader.module.css';
import { Button, CardMedia, Fab, IconButton, InputLabel } from '@mui/material';
import CenteredBox from '../CenteredBox';
import UseImageInput from '../../../hooks/use-imageInput';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch } from 'react-redux';
import { imageUploadActions } from '../../../store/uploadImage-slice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SimpleSnackbar from '../alerts/SimpleSnackbar';
import AddProductContext from '../../../context/AddProduct-context';
function ImageUploader(props) {

    const imageInput = useRef();
    const [imageData, setImageData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [previouslyAdded, setPreviouslyAdded] = useState(false);

    const ctx = useContext(AddProductContext);

    var removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (
                arr[i] &&
                arr[i].hasOwnProperty(attr) &&
                arguments.length > 2 &&
                arr[i][attr] === value
            ) {
                arr.splice(i, 1);
            }
        }
        return arr;
    };

    const handleUploadHandler = event => {
        let file = event.target.files[0];
        const newImage = { id: file.lastModified, file: file, imageId: props.id };
        const existingImage = props.images.find(
            (image) => image.id === newImage.id
        );
        const previouslyAddedImage = props.images.find(
            (image) => image.imageId === newImage.imageId
        )
        if (!existingImage && !previouslyAddedImage) {
            ctx.setProductImages((prevImages) => {
                return [...prevImages, { id: file.lastModified, file: file, imageId: props.id }];
            });
            setImagePreview({ id: file.lastModified, image: URL.createObjectURL(file) });
            setAlreadyAdded(false);
        } else if (previouslyAddedImage) {
            setAlreadyAdded(false);
            setPreviouslyAdded(true)
        } else {
            setPreviouslyAdded(false);
            setAlreadyAdded(true);
        }
    };

    // if (imageData !== null) {
    //     ctx.setProductImages((prevImages) => {
    //         return [...prevImages, imageData];
    //     });
    //     setImageData(null);
    // }
    function deleteImageClick() {
        removeByAttr(props.images, 'id', imagePreview.id);
        ctx.setProductImages(props.images);
        setImagePreview(null);
        props.onDelete();
    }

    return (
        <React.Fragment>
            <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <Button sx={{ p: imagePreview === null && 1 }} onClick={() => imageInput.current.click()} className={classes["file-card"]} >
                <div className={classes["file-inputs"]}>
                    <input
                        accept="image/*"
                        ref={imageInput}
                        multiple
                        type="file"
                        onChange={handleUploadHandler}
                        style={{ display: "none" }}
                    />
                    {imagePreview === null &&
                        <CenteredBox align="center">
                            add image
                        </CenteredBox>
                    }
                    {imagePreview &&
                        <div>
                            <CardMedia
                                component="img"
                                image={imagePreview.image}
                                sx={{ height: props.size, width: props.size }}
                            />
                        </div>
                    }
                </div>
            </Button>

            {imagePreview &&
                <React.Fragment>
                    {/* <CenteredBox align="center">
                        <Button onClick={() => onUploadImage(imagePreview)} style={{ textTransform: "none" }} color="error"> Delete Image</Button>
                    </CenteredBox> */}
                    <CenteredBox align="center">
                        <Button onClick={() => deleteImageClick(imagePreview)} style={{ textTransform: "none" }} color="error"> Delete Image</Button>
                    </CenteredBox>
                </React.Fragment>
            }
            {alreadyAdded &&
                <SimpleSnackbar
                    variant="filled"
                    alertType="error"
                    message="Image is already added !"
                    vertical="bottom"
                    horizontal="center"
                />
            }
            {previouslyAdded &&
                <SimpleSnackbar
                    variant="filled"
                    alertType="warning"
                    message="Please Delete Image before add !"
                    vertical="bottom"
                    horizontal="center"
                />
            }
        </React.Fragment>
    )
}

export default ImageUploader