import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Axios from '../../middlewares/Axios';
import { Games } from '@/middlewares/interfaces';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Games | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        </div>
    );
}

export default ProductDetail;
