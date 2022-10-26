import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import classes from './FileUploader.module.css';
import { Box, Button, CardMedia, Fab, Grid, IconButton, InputLabel, Typography } from '@mui/material';
import CenteredBox from '../CenteredBox';
import UseFileInput from '../../../hooks/use-fileInput';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function FileUploader(props) {
    const {
        handleUploadClick: handleUploadHandler,
        filePreview: filePreview,
        fileInput: fileInput,
        fileData: fileData,
        deleteFileClick: deleteFileClick
    } = UseFileInput(() => { })

    props.onChange(fileData)
    return (
        <React.Fragment>
            <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <div className={classes["file-card"]}>
                <div className={classes["file-inputs"]}>
                    <input
                        ref={fileInput}
                        multiple
                        type="file"
                        onChange={handleUploadHandler}
                        style={{ display: "none" }}
                    />
                    <CenteredBox align="center">
                        <Button variant="extended" onClick={() => fileInput.current.click()}>
                            <AttachFileIcon sx={{ mr: 1 }} />
                            Add File
                        </Button>
                    </CenteredBox>
                </div>
                <p className={classes.main}>Supported files</p>
                <p className={classes.info}>PDF,JPG, PNG</p>
            </div>
            {filePreview !== null &&
                <Grid sx={{ p: 2 }} container className={classes.li}>
                    <Grid item xs={11}>
                        <Typography>{filePreview}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={deleteFileClick}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}

export default FileUploader