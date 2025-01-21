import { Menu } from '@/middlewares/interfaces'
import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
    const Menu: Menu[] = [
        {
            title: "Google Play",
            url: ""
        },
        {
            title: "Play Pass",
            url: ""
        },
        {
            title: "Play Points",
            url: ""
        },
        {
            title: "Gift cards",
            url: ""
        },
        {
            title: "Use bonus",
            url: ""
        },
        {
            title: "Payment Refund Policy",
            url: ""
        },
    ]
    const Guide: Menu[] = [
        {
            title: "Children and family",
            url: ""
        },
        {
            title: "Parents' Guide",
            url: ""
        },
        {
            title: "Family Sharing",
            url: ""
        },
    ]

    const Rules: Menu[] = [
        {
            title: "Terms of Use",
            url: ""
        },
        {
            title: "Confidentiality",
            url: ""
        },
        {
            title: "About Google Play",
            url: ""
        },
        {
            title: "For developers",
            url: ""
        },
        {
            title: "Google Store",
            url: ""
        },
        {
            title: "All prices include VAT.",
            url: ""
        },
    ]

    return (
        <div>
            <div className='bg-[#141414] text-white py-8 px-20 flex  gap-40'>
                <ul className='flex flex-col gap-2'>
                    {
                        Menu.map((item: Menu, index) => (
                            <Link href={item.url} key={index} >
                                <li>{item.title}</li>
                            </Link>
                        ))
                    }
                </ul>
                <ul className='flex flex-col gap-2'>
                    {
                        Guide.map((item: Menu, index) => (
                            <Link href={item.url} key={index} >
                                <li>{item.title}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className='bg-[#141414] p-8 px-14 text-white '>
                <div className='flex items-center justify-between border-t border-[#fff]'>
                    <ul className='flex items-center justify-between  p-4  gap-[20px]'>
                        {
                            Rules.map((item: Menu, index) => (
                                <Link href={item.url} key={index} >
                                    <li>{item.title}</li>
                                </Link>
                            ))
                        }
                    </ul>
                    <h1 className=''>Ukraine ( Russian )</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer