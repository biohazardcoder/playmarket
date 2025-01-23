import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Axios from '../../middlewares/Axios';
import { Games, Items, User } from '@/middlewares/interfaces';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import { BadgeCheck, Gift, RefreshCcw, TrendingUp, TvMinimal } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import { log } from 'console';
import Footer from '@/components/Footer';
function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Games | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, isSignedIn } = useUser()
    const [text, setText] = useState("")
    const [like, setLike] = useState(0)
    const me: User = {
        email: user?.emailAddresses[0].emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatar: user?.imageUrl,
    }
    const handleComment = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = Axios.post("product/comment", {
                productId: product?._id,
                user: me,
                text: text,
                like: like
            })
            setText("");
            setLike(0);
            window.location.reload()
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }


    const menu: Items[] = [
        {
            title: "Google Technologies",
            icon: <BadgeCheck />
        },
        {
            title: "Large screen support",
            icon: <TvMinimal />
        },
        {
            title: "Improved controls",
            icon: <TrendingUp />
        },
        {
            title: "Easy syncing across all devices*",
            icon: <RefreshCcw />
        },
        {
            title: "Ability to earn Google Play Points",
            icon: <Gift />
        },
    ]

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`/product/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDownload = async () => {
        if (!product) return;

        try {
            const updatedDownload = product.download + 1;
            const response = await Axios.put(`/product/${id}`, { download: updatedDownload });

            console.log("Serverdan qaytdi:", response.data);
            setProduct((prev) => prev ? { ...prev, download: response.data.data.download } : prev);
        } catch (error) {
            console.error("Download update failed:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <Head>
                <title>Game | {product.title} </title>
                <link
                    rel="shortcut icon"
                    href={"https://services.google.com/fh/files/emails/playy.png"}
                    type="image/x-icon"
                />
            </Head>
            <div className='w-full h-[45vh] bg-[#181818] text-white flex p-20 flex-col justify-center'>
                <h1 className='text-3xl font-semibold'>{product.title}</h1>
                <h1 className=''>{product.category}</h1>
                <h1 className='text-green-300 text-xs'>In-app purchases</h1>
                <div className='flex gap-8 py-5'>
                    <img src={product.photos[0]} alt={product.title} className='w-16 h-16 rounded-lg' />
                    <h1 className='flex justify-center flex-col'>
                        <span className='flex items-center gap-1'>{product.like} <FaStar size={"10px"} /></span>
                        <span className='text-xs font-semibold'>  {product.company}</span>
                        <span className='text-sm '>Device: <span className='uppercase  p-1 text-green-300'>{product.device}</span></span>
                    </h1>
                    <div>
                        <Link href={product.file}>
                            <button
                                onClick={handleDownload}
                                className='bg-[#28FEAF] hover:bg-[#28feec] transition-colors z-20 delay-150 text-sm py-2 px-5 rounded-2xl text-black'>
                                Install on {product.device}
                            </button>
                        </Link>
                        <h1 className='text-xs text-center'>Downloaded: {product.download}</h1>
                    </div>
                    <h1 className='flex flex-col items-center'>
                        <span className='bg-white text-black p-1 font-bold'>{product.age}+</span>
                    </h1>
                </div>
                <h1 className='text-xs text-[#ddd]'>This game requires the Google Play Games (<u>Beta</u>) app to install on your <u>Windows</u> PC. <br /> By downloading it and the game, you agree to the Google <u>Terms of Service</u> and the Google Play <u>Terms of Service</u> . <br /> <a href="" className='underline'>Learn more…</a></h1>
            </div>
            <div className='h-screen p-10 w-full flex gap-4 justify-between '>
                <div className='w-3/4  '>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${product.trailer}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                    </iframe>
                </div>
                <div className='w-1/4 h-full bg-[#181818] p-6 rounded-lg'>
                    <div className='flex items-center gap-2 text-white font-semibold text-2xl '>
                        <img
                            src="https://services.google.com/fh/files/emails/playy.png"
                            alt="sad"
                            className='w-10 h-10'
                        />
                        <h1>
                            Play on <span className='uppercase font-[cursive]'>{product.device}</span>
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-stone-400 py-1'>
                            With Google Play Games (Beta), you can play this game on Windows PC.
                        </h1>
                        <Link href={"/"}>
                            <span className='text-sm text-green-300 font-semibold'>Find out <br /> more
                            </span>
                        </Link>
                    </div>
                    <div className='border-y mt-2 border-stone-400 space-y-3 py-6'>
                        {
                            menu.map((item: Items, idx: number) => (
                                <li key={idx} className='text-white list-none flex items-center gap-2'>
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </li>
                            ))
                        }
                    </div>
                    <div className='text-stone-400 text-sm py-6'>
                        Detailed information about these system requirements can be found in the Help Center .
                        <br />
                        <br />
                        Intel is a registered trademark of Intel Corporation or its subsidiaries. Windows is a trademark of the Microsoft group of companies.
                        <br />
                        <br />
                        * May not be available for this game.
                    </div>
                </div>
            </div>
            <div className='min-h-[50vh] py-20 px-10'>
                {
                    product.comments.length > 0 ? (
                        <div>
                            <h1 className='text-2xl font-semibold'>Comments</h1>
                            <div className='flex flex-col gap-20 py-10'>
                                {product.comments?.map((item, index) => (
                                    <div key={index} >
                                        <div className='flex items-center gap-2'>
                                            <img src={item.user?.avatar} alt="avatar"
                                                className='w-10 h-10 rounded-md'
                                            />
                                            <h1 className='flex flex-col'>
                                                <span>
                                                    {item?.user?.firstName}
                                                </span>
                                                <span>
                                                    {item?.user?.lastName}
                                                </span>
                                            </h1>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <span
                                                    key={starIndex}
                                                    className={` text-2xl ${starIndex < item.like ? "text-green-500" : "text-gray-400"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <h1 >{item.text}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ""
                }
                <div className="w-1/3 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Write a review</CardTitle>
                            <input
                                type="text"
                                className="w-full border-2 border-primary pl-2 h-10"
                                placeholder="Write your review..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <div className="flex justify-center space-x-2 py-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-2xl ${star <= like ? "text-green-500" : "text-gray-400"
                                            }`}
                                        onClick={() => setLike(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </CardHeader>
                        <CardFooter>
                            {
                                isSignedIn ? (
                                    <Button className="w-full" onClick={handleComment} disabled={loading}>
                                        {loading ? "Sending..." : "Send"}
                                    </Button>
                                ) : (
                                    < SignInButton mode='modal'>
                                        <Button className="w-full" disabled={loading}>
                                            {loading ? "Sending..." : "Send"}
                                        </Button>
                                    </SignInButton>
                                )
                            }
                        </CardFooter>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </Card>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;
