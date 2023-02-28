import { React, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { useLocation } from 'react-router-dom';
import fileDownload from 'js-file-download';
import axios from 'axios';
import ClientHeader from '../ClientHeader';
import { baseHost, baseUrl } from '../../services';
import docServices from '../../services/docServices';
import { useSelector } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileDetails(props) {
    const location = useLocation();
    const data = location.state?.data;
    const item = location.state?.item
    const user = useSelector(state => state.auth)
    // useEffect(() => {
    //     docServices.countSeen(id)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // }, [id])
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    
    function goToNextPage() {
        setPageNumber(pageNumber + 1);
    }
    function goToPrevPage() {
        setPageNumber(pageNumber - 1);
    }



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


    function download(e) {
        if(validate()) {
        e.preventDefault();
        let filesname = `${data}.pdf`;
        const book = { filesname };
        axios.post(`${baseUrl}/file/show/download`, book, { responseType: 'blob' })
            .then(res => {
                fileDownload(res.data, filesname);
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    const validate = () => {
        if (!user?.isLogin) {
            alert('Bạn cần phải đăng nhập để thực hiện thao tác này')
            return false
        }else {
            if (item.downloadMode == 'vip' && user?.userInfo.role == 'normal') {
                alert('Bạn phải nâng lên gói Vip để có thể tải tài liệu này')
                return false
            }
        }
        return true
    }
    return (
        <div>
            <ClientHeader/>
            <div className='pdf'>
                <h1 className='text-2xl text-blue-600 border border-solid border-gray-900 p-3'>Tên tài liệu: {data ? data : "no data passing"}</h1>
                <Document
                    file={{
                        url:
                            `${baseHost}/${data}.pdf`,
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="flex flex-row gap-1">
                <button disabled={pageNumber == 1} onClick={goToPrevPage} className="bg-blue-50 w-10">
                    {'<'}
                </button>
                <button disabled={pageNumber >= numPages} onClick={goToNextPage} className="bg-blue-50 w-10">
                    {'>'}
                </button>
                </div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <div className='download'>
                    <h2 className='underline mt-3'>Download to read all the document</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" onClick={(e) => download(e)}>Download</button>
                </div>
            </div>
        </div>

    );
}
