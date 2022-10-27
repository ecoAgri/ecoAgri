import { useState } from 'react';
import { useRef } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../Firebase';
import Swal from 'sweetalert2';

const UseFileInput = (path) => {
    const fileInput = useRef();
    const [fileData, setFileData] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [isDataUploading, setIsDataUploading] = useState(false);

    const handleUploadClick = event => {
        setIsDataUploading(true)
        let file = event.target.files[0];
        setFileData(file);
        setFilePreview(file.name);
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
                    console.log(downloadURL)
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
    };

    const deleteFileClick = event => {
        setFileData(null);
        setFilePreview(null);
        console.log(fileInput)
    }
    return {
        handleUploadClick,
        deleteFileClick,
        filePreview,
        fileInput,
        fileData
    }
}

export default UseFileInput;