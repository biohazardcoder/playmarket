import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { FaRegQuestionCircle, FaSearch } from 'react-icons/fa';
import { SignedIn, SignInButton, UserButton, SignedOut, useUser } from '@clerk/nextjs';

const Header: React.FC = () => {
    const router = useRouter();
    const { user } = useUser()

    interface Types {
        title: string;
        url: string;
    }

    const LiData: Types[] = [
        { title: "Games", url: "/" },
        { title: "Apps", url: "/apps" },
        { title: "Movies", url: "/movies" },
        { title: "Books", url: "/books" }
    ];

    return (
        <div className='bg-[#141414] w-full text-white h-[80px] flex justify-between items-center p-10'>
            <div className='flex items-center gap-10'>
                <Link href={"/"}>
                    <div className='flex items-center gap-1 text-white'>
                        <img src="https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo-300x300.png" alt="" className='w-10' />
                        <h1 className='text-2xl'>Google Play</h1>
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
                <button className='text-lg'><FaSearch /></button>
                <Link href="/dashboard">
                    <button className='text-lg'><FaRegQuestionCircle /></button>
                </Link>
                <SignedIn>
                    <Link href="/dashboard">
                        <img src={user?.imageUrl} alt="avatar" className='w-10 border p-1 rounded-full' />
                    </Link>
                </SignedIn>
                <SignedOut>
                    <div className='bg-[#fff] text-black rounded-lg py-1 px-2'>
                        <SignInButton mode='modal'   >
                            Log in
                        </SignInButton>
                    </div>
                </SignedOut>
            </div>
        </div>
    );
};

export default Header;
