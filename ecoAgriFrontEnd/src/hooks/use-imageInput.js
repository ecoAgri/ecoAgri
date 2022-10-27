import { useState } from 'react';
import { useRef } from 'react';

const UseImageInput = () => {
    const fileInput = useRef();
    const [imageData, setImageData] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setImageFile(file);
        setImageData({id: file.lastModified, file: file})
        setImagePreview({ id: file.lastModified, image: URL.createObjectURL(file) });
        // setImagePreview([...imagePreview,{id: file.name, image: URL.createObjectURL(file)}]);
    };

    function deleteImageClick(deleteImage) {
        setImagePreview(null);
    }
    return {
        deleteImageClick,
        handleUploadClick,
        imagePreview,
        fileInput,
        imageFile,
        imageData
    }
}

export default UseImageInput;