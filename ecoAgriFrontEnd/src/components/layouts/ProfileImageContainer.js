import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import UseImageInput from '../../hooks/use-imageInput'
import ImageUploadService from '../../services/ImageUploadService'
import classes from "./ProfileImageContainer.module.css"

import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Swal from 'sweetalert2';
import { storage } from '../../Firebase'
import LinearIndeterminate from '../ui/LinearIndeterminate'

function ProfileImageContainer() {
    const [url, setUrl] = useState("")
    const fileInput = useRef();
    const [imageData, setImageData] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDataUploading, setIsDataUploading] = useState(false);

    const uploadImage = (path, file) => {
        setIsDataUploading(true)
        const filePath = `${path}/${file.name + v4()}`;
        const fileRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                }
                console.log(progress);
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong !',
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);

                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong !',
                    })
                });
                setIsDataUploading(false);
            }
        )
    }
    const handleUploadClick = event => {
        let file = event.target.files[0];
        uploadImage(file, "/images/profile")
    };

    if (url !== "") {
        //api call here
        setUrl("");
    }
    
    return (
        <React.Fragment>
            {isDataUploading && <LinearIndeterminate />}
            <div className={classes.container}>
                <img src="https://raw.githubusercontent.com/Group22UCSC/thekolaya/main/vendors/images/default_profile/profile.jpg" alt="Avatar" className={classes.image} style={{ width: "100%" }} />
                <div className={classes.middle}>
                    <div className={classes.text} onClick={() => fileInput.current.click()}>
                        Change Profile
                        <input
                            ref={fileInput}
                            multiple
                            type="file"
                            onChange={handleUploadClick}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfileImageContainer