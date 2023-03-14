import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUpload.scss';
import axios from 'axios';
import { baseUrl } from '../../services';

const FileUpload = ({ files, setFiles, removeFile, isClicked, setIsClicked, fileName,setType }) => {
    const [file, setNewFile] = useState([]);
    const uploadHandler = (event) => {
        setNewFile(event.target.files[0]);
        if (!file) return;
        file.isUploading = true;
        setFiles([...files, file])
        setType(file)
    }

    // upload file
    if (isClicked) {
        const fileName = file?.name;
        const fileExtension = fileName?.split('.').pop();
        const formData = new FormData();
        const newFileName = `${fileName}.${fileExtension}`
        formData.append(
            "newFile",
            file,
            newFileName
        );
        setTimeout(() => {
            axios.post(`${baseUrl}/file/upload`, formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(
                    setIsClicked(false),
                    (res) => {
                        file.isUploading = false;
                        setFiles([...files, file]);
                        console.log(res.data);
                        console.log(res.data.result);
                    })
                .catch((err) => {
                    // inform the user
                    console.error(err)
                    removeFile(file.name)
                });
        }, 1000);
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" accept='.pdf,.docx,.ppt' onChange={uploadHandler} />
                    { !file ? (<button>
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Tải file
                    </button>) : <h2>{}</h2>}
                </div>
{/* 
                <p className="main">Supported files</p>
                <p className="info">PDF</p> */}

            </div>
        </>
    )
}

export default FileUpload