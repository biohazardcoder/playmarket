import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { FaInstagramSquare, FaLinkedin, FaRegQuestionCircle, FaSearch, FaTelegram, FaYoutube, } from 'react-icons/fa';
import { SignInButton, UserButton, SignedOut, } from '@clerk/nextjs';
import { AlertDialog, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { X } from "lucide-react";

const Header: React.FC = () => {
    const router = useRouter();

    interface Types {
        title: string;
        url: string;
    }

    const LiData: Types[] = [
        { title: "Games", url: "/" },
    ];

    return (
        <div className='bg-[#141414] w-full text-white h-[80px] flex justify-between items-center p-6 md:p-10'>
            <div className='flex items-center gap-6 md:gap-10'>
                <Link href={"/"}>
                    <div className='flex items-center gap-1 text-white'>
                        <img src="https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo-300x300.png" alt="" className='w-8 md:w-10' />
                        <h1 className='text-xl md:text-2xl'>Google Play</h1>
                    </div>
                </Link>
                <ul className='flex items-center gap-4 text-white font-semibold'>
                    {LiData.map((item: Types, index: number) => (
                        <li key={index} className={`${router.pathname === item.url ? "text-green-400 border-b-2 pb-1 border-green-400" : "text-white border-b-2 pb-1 border-transparent"}`}>
                            <Link href={item.url}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center text-xl'>
                    <AlertDialog>
                        <AlertDialogTrigger className='cursor-pointer'><FaRegQuestionCircle /></AlertDialogTrigger>
                        <AlertDialogContent className='absolute top-4 bg-[#141414] z-50 right-2 w-[240px] md:w-[300px] p-6 md:p-8 rounded-lg text-sm'>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-center p-1 text-2xl'>Info</AlertDialogTitle>
                                <AlertDialogDescription className='py-4'>
                                    Thic clone has been created by <u className='font-semibold text-green-300'>Bo.</u> <br />
                                    Contact: <b className=''>biohazardcoder@gmail.com</b>
                                    <div className='flex text-2xl justify-evenly mt-4'>
                                        <Link href={"http://t.me/afterdarkwithbo"}>
                                            <FaTelegram />
                                        </Link>
                                        <Link href={"https://www.youtube.com/@MagnitTasiri"}>
                                            <FaYoutube />
                                        </Link>
                                        <Link href={"https://www.instagram.com/magnittasiri/"}>
                                            <FaInstagramSquare />
                                        </Link>
                                        <Link href={"https://linkedin.com/in/husanbek-zayniddinov-4b0ab4347/"}>
                                            <FaLinkedin />
                                        </Link>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction className='flex items-center justify-center p-1 rounded-lg top-2 right-2 font-semibold absolute'>
                                    <X />
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10 border-2 rounded-full",
                            userButtonPopoverMain: "bg-[#141414] text-white text-2xl rounded-none",
                            userButtonPopoverActions: "bg-white rounded-none flex flex-col ",
                            userButtonPopoverFooter: "hidden",
                            userButtonPopoverCard: "rounded-none",
                            userButtonPopoverActionButton: "bg-[#141414] text-white hover:text-black",
                        },
                    }}
                />
                <SignedOut>
                    <div className='bg-[#fff] text-black rounded-lg py-1 px-2'>
                        <SignInButton
                            mode='modal'
                        >
                            Log in
                        </SignInButton>
                    </div>
                </SignedOut>
            </div>
        </div>
    );
};

export default Header;
