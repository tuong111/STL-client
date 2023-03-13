import { React, useState, useEffect } from 'react';
import AllFile from '../../Components/ShowFile/AllFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import ClientHeader from '../../Components/ClientHeader';
import docServices from '../../services/docServices';
import { baseUrl } from '../../services';
import { jwtDecode } from 'jwt-decode';
import userServices from '../../services/userServices';
import { userRemember } from '../../store/auth/authSlice';
import SideBar from '../../Components/SideBar';
import ClientFooter from '../../Components/ClientFooter';
import NewContent from '../NewClientHome/Component/Content';

export default function ClientHome(props) {
    // fetch files from db
    const [filesFilter, setFilesFilter] = useState([]);
    const [listMenu, setListMenu] = useState([])
    useEffect(() => {
        docServices.getAllMenu().then(
            res => setListMenu([{
                _id: 'all',
                code: 'all',
                name: 'Tất cả',
            },...res])
        )
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        docServices.getAllDoc()
        .then(res => {
            console.log('getAllDoc', res)
            setFilesFilter(res)})
        .catch(err => console.log(err))
    }, [])


    const filterItems = (docTypeId)  => {
        if (docTypeId == 'all') {
            docServices.getAllDoc()
            .then(res => {
                setFilesFilter(res)})
            .catch(err => console.log(err))
        } else {
            docServices.getDocByType(docTypeId)
            .then(res => {
                setFilesFilter(res)
            })
            .catch(err => console.log(err))

        }
    };

    const handleSetdoc = (_id) => {
        filterItems(_id)
    }
    return (
        <>
        <div className='min-h-screen'>
        <ClientHeader />
        <div className="flex flex-row min-h-[650px]">  
            <SideBar menus = {listMenu} onSetdoc={handleSetdoc}/>
            {/* <AllFile filesFilter={filesFilter}/> */}
            <NewContent filesFilter={filesFilter}/>
        </div>
        <ClientFooter/>
        </div>
        </>
    )
}
