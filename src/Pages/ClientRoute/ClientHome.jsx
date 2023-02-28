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

export default function ClientHome(props) {
    // fetch files from db
    const [items, setItems] = useState([]);
    const [filesFilter, setFilesFilter] = useState([]);
    const [activeMenu, setactiveMenu] = useState()

    useEffect(() => { getMenuItems() }, []);


    async function getMenuItems() {
        const response = await fetch(`${baseUrl}/file/show/doctype`);
        const data = await response.json();
        setItems([{ name: 'Tất cả', _id: '' }, ...data]);
        setactiveMenu('')
    };

    async function filterItems(docTypeId) {
        if (docTypeId == '') {
            const response = await docServices.getAllDoc()
            setFilesFilter(response)
        } else {
            const response = await fetch(`${baseUrl}/file/show/filter?foo=${encodeURIComponent(docTypeId)}`, {
                method: "GET",
            });
            const data = await response.json();
            setFilesFilter(data);
        }
    };
    return (
        <>
            <ClientHeader />
            <div className="flex flex-row">
                <div
                    className="bg-blue-500 h-auto w-[200px] p-5  pt-8 relative duration-300 mt-5"
                >
                    <div className="justify-start flex flex-row h-full">
                        <div className="toggle w-full text-start text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none text-white gap-3 pl-2 flex flex-col h-full">
                            {items.map((item, index) =>
                                <div key={item._id}>
                                    <div
                                        className={` ${item._id === activeMenu ? "bg-purple-600" : ""} flex flex-row text-sm items-center text-center justify-start w-auto`}

                                        onClick={() => {
                                            setactiveMenu(item._id)
                                            filterItems(item._id)
                                        }}>
                                        <FontAwesomeIcon icon={faBookOpen} className="pl-2" />
                                        <p className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none text-xs">{item.name}</p>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <AllFile filesFilter={filesFilter} />
            </div>
        </>
    )
}
