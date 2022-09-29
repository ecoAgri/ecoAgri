import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ImageUploader.scss'
import { Button, Fab, InputLabel } from '@mui/material';
import CenteredBox from './CenteredBox';
function ImageUploader(props) {
    const uploadHandler = (event) => {
        // const file = event.target.files[0];
        // if(!file) return;
        // file.isUploading = true;
        // setFiles([...files, file])

        // // upload file
        // const formData = new FormData();
        // formData.append(
        //     "newFile",
        //     file,
        //     file.name
        // )
        // axios.post('http://localhost:8080/upload', formData)
        //     .then((res) => {
        //         file.isUploading = false;
        //         setFiles([...files, file])
        //     })
        //     .catch((err) => {
        //         // inform the user
        //         console.error(err)
        //         removeFile(file.name)
        //     });
    }
    return (
        <React.Fragment>
            <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <div className="file-card">
                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <CenteredBox align="center">
                        <Fab variant="extended">
                            <CloudUploadIcon sx={{ mr: 1 }} />
                            Upload
                        </Fab>
                    </CenteredBox>
                </div>
                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>
            </div>
        </React.Fragment>
    )
}

export default ImageUploader