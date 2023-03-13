import { FacebookFilled, MailFilled, PhoneFilled, YoutubeFilled } from '@ant-design/icons'
import React from 'react'

export default function ClientFooter({detailpage}) {
    

    return (
        <div className={`${detailpage && " absolute bottom-0 w-full"}`} >
        <footer class="p-3 shadow md:px-6 md:py-8 bg-[#58A6D6] ">
        <div class="sm:flex sm:items-center sm:justify-between flex-wrap">
            <div>
            <a href="/" class="flex items-center mb-4 sm:mb-0">
            <span class="self-center font-semibold whitespace-nowrap dark:text-white">Bản quyền thuộc về công ty TNHHĐT giáo dục TRẠNG NGUYÊN</span>
            </a>
            </div>
            <div>
            <ul class="flex flex-wrap items-center mb-6 text-white sm:mb-0">
            <li className=' flex flex-row justify-center items-center gap-1'>
                <PhoneFilled size={50}/><a href="#" class="mr-4 hover:underline md:mr-6 ">1900633330</a>
            </li>
            <li className=' flex flex-row justify-center items-center gap-1'>
                <MailFilled size={50}/><a href="#" class="mr-4 hover:underline md:mr-6 ">giaovien@trangnguyen.edu.vn</a>
            </li>
            </ul>
            </div>
            <div>
            <ul class="flex flex-wrap items-center mb-6 text-white sm:mb-0 gap-3">
            <li className=' flex flex-row justify-center items-center gap-1'>
                <span href="#" class="mr-4 hover:underline md:mr-6 ">Theo dõi</span>
            </li>
            <li className=' flex flex-row justify-center items-center gap-3'>
                <YoutubeFilled size={100}/>
            </li>
            <li className=' flex flex-row justify-center items-center gap-3'>
                <FacebookFilled size={100}/>
            </li>
            </ul>
            </div>
    </div>
</footer>
</div>
    )
}
