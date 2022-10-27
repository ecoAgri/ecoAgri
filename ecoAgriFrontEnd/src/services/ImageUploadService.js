
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../Firebase';
import Swal from 'sweetalert2';

const ImageUploadService = (path, file, handleChange) => {
    const filePath = `${path}/${file.name + v4()}`;
    const fileRef = ref(storage, filePath);
    let url = "";

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
                url = downloadURL;
                handleChange(downloadURL);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong !',
                })
            });
            // setIsDataUploading(false);
        }
    )
    return url;
}

export default ImageUploadService