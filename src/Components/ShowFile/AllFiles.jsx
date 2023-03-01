import { React, useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { Link } from "react-router-dom";
import { baseUrl } from '../../services';
import docServices from '../../services/docServices';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileItem(filesFilter) {
    // fetch files from db
    let [items, setItems] = useState([]);
    useEffect(() => { getMenuItems() }, [filesFilter.filesFilter]);

    async function getMenuItems() {
        if (filesFilter.filesFilter.length === 0) {
            const response = await fetch(`${baseUrl}/file/show`);
            // console.log(response);
            const data = await response.json();
            setItems(data);
        } else {
            setItems(filesFilter.filesFilter);
        };
    };

    //custom react-pdf style

    const pdfStyle = document.getElementsByClassName('pdf');
    for (let i = 0; i < pdfStyle.length; i++) {
        // canvasStyle[i].style.display = "none";
        pdfStyle[i].style.display = 'flex';
        pdfStyle[i].style.flexDirection = 'column';
        pdfStyle[i].style.alignItems = 'center';
        pdfStyle[i].style.justifyContent = 'center';
    }

    const hideElement = document.getElementsByClassName('react-pdf__Page__annotations annotationLayer');
    // console.log(hideElement);
    for (let i = 0; i < hideElement.length; i++) {
        hideElement[i].style.display = 'none';
    }

    return (
        <div className='flex flex-row items-center text-center justify-center'>
            <div className='row w-[90%] gap-3'>
                {items.map((item, index) =>
                    <div className='item-center text-center justify-center' key={index}>
                        <div className='column1' >
                            <div>
                                <Link to="/files/details" state={{ data: item.code, item: item }}
                                    onClick={() => docServices.countSeen(item._id)}
                                >
                                    <img src="/images/pdfexample.gif" width={200} height={250} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <p className='item-name'>{item.name}</p>
                        <div className='flex flex-row justify-center gap-2'>
                            <p>Lượt xem : {item.seenCount}</p>
                            <p>Lượt tải : {item.dowloadCount}</p>
                            <p className=' text-blue-500'>({item.downloadMode})</p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}