import { Box } from '@mui/material';
import React from 'react'
import CenteredBox from '../../ui/CenteredBox';
import ImageUploader from '../../ui/imageUploader/ImageUploader';
import UseImageInput from '../../../hooks/use-imageInput';
const style = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 400,
    height: 505,
    bgcolor: 'background.paper',
    overflow: "auto",
    border: "none",
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

function UploadProduct(props) {

    let image = {}
    return (
        <div>
            <ImageUploader image={props.image} images={props.images} onDelete={props.onDelete} onImageChange={props.onImageChange} size={props.size} />
        </div>
    )
}

export default UploadProduct