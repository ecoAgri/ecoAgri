import { useState } from 'react';
import { useRef } from 'react';

const UseFileInput = () => {
    const fileInput = useRef();
    const [fileData, setFileData] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setFileData(file);
        setFilePreview(file.name);
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