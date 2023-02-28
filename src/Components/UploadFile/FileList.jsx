import axios from 'axios';
import React from 'react';
import { baseUrl } from '../../services';
import FileItem from './FileItem';

const FileList = ({ files, removeFile }) => {
    const deleteFileHandler = (_name) => {
        axios.delete(`${baseUrl}/file/upload?name=${_name}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }
    return (
        <div className="file-list" style={{ marginLeft: 0 }}>
            {
                files &&
                files.map(f => (<FileItem
                    key={f}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </div >
    )
}

export default FileList