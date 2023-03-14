import { React, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import axios from 'axios';
import ClientHeader from '../ClientHeader';
import { baseHost, baseUrl } from '../../services';
import docServices from '../../services/docServices';
import { useSelector } from 'react-redux';
import ClientFooter from '../ClientFooter';
import userServices from '../../services/userServices';
import Swal from 'sweetalert2';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileDetails(props) {
    const location = useLocation();
    const data = location.state?.data;
    const item = location.state?.item
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    console.log(item)

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
        if (validate()) {
            e.preventDefault();
            let filesname = `${data}.pdf`;
            const book = { filesname };
            userServices.updateDownloadCount(user?.token, user?.userInfo?._id)
                .then(res => {
                    docServices.countDown(item?._id)
                    .then(
                        res => {
                        axios.post(`${baseUrl}/file/show/download`, book, { responseType: 'blob' })
                        .then(res => {
                            fileDownload(res.data, filesname);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                        }
                    ).catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        }
    };

    const validate = () => {
        if (!user?.isLogin) {
            Swal.fire({
                title: 'Bạn phải đăng nhập để có thể tải tài liệu này',
                showCancelButton: true,
                confirmButtonText: 'OKE',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
            return false
        } else {
            if (item.downloadMode == 'vip' && user?.userInfo.role == 'normal') {
                Swal.fire({
                    title: 'Bạn phải nâng lên gói Vip để có thể tải tài liệu này',
                    showCancelButton: true,
                    confirmButtonText: 'OKE',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/upgrade')
                    }
                })
                return false
            }
            if (item.downloadMode === 'vip' && user?.userInfo.download <= 0) {
                Swal.fire({
                    title: 'Bạn phải nâng lên gói Vip để có thể tải tài liệu này',
                    showCancelButton: true,
                    confirmButtonText: 'OKE',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/upgrade')
                    }
                })
                return false
            }
        }
        return true
    }
    return (
        <div style={{

        }}>
            <ClientHeader />
            <div style={{
                width: '100%',
                justifyContent : 'center'                                                                   
            }}>
            <div className='pdf'>
                <h1 className='text-2xl text-blue-600 border border-solid border-gray-900 p-3'>Tên tài liệu: {item ? item?.name : "no data passing"}</h1>
                <img alt={item?.name} src={'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/document-app-icon-or-logo-icon-design-template-7b6cac8de4b9abdd949f7643fe00924e_screen.jpg?ts=1576967977'} width={300} className=" mt-3"/>
                <p className='text-2xl text-blue-600 p-3'>Mô tả tài liệu</p>
                <p>{item?.note}</p>
                <div className='download'>
                    <h2 className='underline mt-3'>Download to read all the document</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" onClick={(e) => download(e)}>Download</button>
                </div>
            </div>
            </div>
            <ClientFooter detailpage/>
        </div>

    );
}
