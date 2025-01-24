"use client";

import React from 'react';
import Link from 'next/link';
import { FaDownload, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Windows } from '@/images/path';
import { Games } from '@/middlewares/interfaces';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface ProductProps {
    device: string;
}

const Products: React.FC<ProductProps> = ({ device }) => {
    const { data } = useSelector((state: { products: { data: Games[] } }) => state.products);

    const filteredProducts = data.filter((item: Games) => item.device === device);

    const randomProduct: Games | null = filteredProducts.length > 0
        ? filteredProducts.reduce((max, item) => (item.download > max.download ? item : max), filteredProducts[0])
        : null;

    const bestgames: Games[] = filteredProducts
        .filter(item => item.download > 0)
        .sort((a, b) => b.download - a.download);

    const mostLikedGames: Games[] = filteredProducts
        .filter(item => item.like > 0)
        .sort((a, b) => b.like - a.like)
    const AdultGames: Games[] = filteredProducts
        .filter((item) => item.age >= 18)
    const ShooterGames: Games[] = filteredProducts
        .filter((item) => item.category === "Shooter")
        .sort((a, b) => b.download - a.download)
    const RTSGames: Games[] = filteredProducts
        .filter((item) => item.category === "RTS")
        .sort((a, b) => b.download - a.download)
    const ActionGames: Games[] = filteredProducts
        .filter((item) => item.category === "Action")
        .sort((a, b) => b.download - a.download)
    const StrategyGames: Games[] = filteredProducts
        .filter((item) => item.category === "Strategy")
        .sort((a, b) => b.download - a.download)


    return (
        <div className='px-4 md:px-20 py-5'>
            {device === "windows" && randomProduct && (
                <Link className='z-0' href={`detail/${randomProduct._id}`}>
                    <div className='relative w-full bg-[#181818] text-white flex flex-col lg:flex-row rounded-3xl border-[10px] hover:border-[10px] transition-colors duration-300 border-[#fff] hover:border-[#D7D7D7] items-center justify-center'>
                        <div className='w-full lg:w-1/2 flex flex-col justify-center p-8 space-y-4 font-semibold'>
                            <h1 className='text-3xl sm:text-4xl lg:text-5xl'>Google Play's PC Game of 2024</h1>
                            <h1 className='text-xl sm:text-2xl lg:text-3xl'>Join the cookies on PC</h1>
                            <div className='flex flex-col sm:flex-row gap-4 pt-6 sm:pt-10 items-center sm:justify-between'>
                                <div className='flex gap-4 items-center'>
                                    <img src={randomProduct.photos[0]} alt="" className='w-16 h-16 rounded-xl' />
                                    <div className='flex flex-col gap-1'>
                                        <h1>{randomProduct.title}</h1>
                                        <span className='flex gap-2 items-center'>
                                            <h1>{randomProduct.company}</h1>
                                            <li className='list-disc'>
                                                <span className='bg-white text-black text-xs font-bold rounded-sm'>{randomProduct.age}+</span>
                                            </li>
                                        </span>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='bg-[#28FEAF] hover:bg-[#28feec] transition-colors z-20 delay-150 text-sm py-2 px-5 rounded-3xl text-black'>
                                        Install on Windows
                                    </button>
                                    <h1 className='text-xs'>in-app purchases</h1>
                                </div>
                            </div>
                        </div>
                        <Image src={Windows} alt="" className='w-full lg:w-1/2 rounded-xl' />
                        <div className='absolute w-24 h-10 top-0 left-0 bg-[#464646] flex items-center justify-center font-semibold text-white rounded-xl rounded-tr-none rounded-bl-none'>
                            Spotlight
                        </div>
                    </div>
                </Link>

            )}
            {device === "windows" && <div>
                <h1 className='text-3xl font-semibold p-4 flex flex-col'>
                    Big Screen Games
                    <span className='text-[#6F7377] text-xs'>Google Play Games on PC</span>
                </h1>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        720: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]'
                >
                    {filteredProducts.length === 0 ? (
                        <p>No games found for this device</p>
                    ) : (
                        filteredProducts.map((item: Games) => (
                            <SwiperSlide key={item._id} className='p-2'>
                                <iframe
                                    width="100%"
                                    height="auto"
                                    className='rounded-2xl'
                                    src={`https://www.youtube.com/embed/${item.trailer}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                                </iframe>
                                <div className='pt-4 flex flex-col sm:flex-row gap-4'>
                                    <Link href={`detail/${item._id}`}>
                                        <img
                                            className='w-16 h-16 rounded-lg'
                                            src={item.photos[0] || "https://via.placeholder.com/150"}
                                            alt="logo"
                                        />
                                    </Link>
                                    <div>
                                        <h1 className='font-semibold text-lg sm:text-xl'>{item.title}</h1>
                                        <h1 className='text-sm pb-1'>{item.category === "RTS" ? "Real-time Strategy" : item.category}</h1>
                                        <h1 className='flex items-center gap-1'>
                                            {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                        </h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>}



            {device === "phone" &&
                <div>
                    <h1 className='text-2xl font-semibold p-4 flex flex-col mt-4'>
                        Best games
                    </h1>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            900: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            }
                        }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[40px]'
                    >
                        {bestgames.length === 0 ? (
                            <p>No games found for this device</p>
                        ) : (
                            bestgames.map((item: Games) => (
                                <SwiperSlide key={item._id} className='p-2'>
                                    <iframe
                                        width="100%"
                                        height="auto"
                                        className='rounded-2xl'
                                        src={`https://www.youtube.com/embed/${item.trailer}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                                    </iframe>
                                    <div className='pt-4 flex gap-4'>
                                        <Link href={`detail/${item._id}`}>
                                            <img
                                                className='w-16 h-16 rounded-lg'
                                                src={item.photos[0] || "https://via.placeholder.com/150"}
                                                alt="logo"
                                            />
                                        </Link>
                                        <div>
                                            <h1 className='font-semibold'>{item.title}</h1>
                                            <h1 className='text-sm pb-1'>{item.category === "RTS" ? "Real-time Strategy" : item.category}</h1>
                                            <h1 className='flex items-center gap-1'>
                                                {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                            </h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>

                    {
                        mostLikedGames.length > 0 && (
                            <div>
                                <h1 className='text-2xl font-semibold p-4 flex flex-col mt-4'>
                                    Most Liked Games
                                </h1>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[40px]'>
                                    {mostLikedGames.length === 0 ? (
                                        <p>No games found for this device</p>
                                    ) : (
                                        mostLikedGames.map((item: Games, index: number) => (
                                            <div key={item._id} className='p-2'>
                                                <div className='pt-4 items-center flex gap-4'>
                                                    <h1 className='font-semibold p-1'>{index + 1}</h1>
                                                    <Link href={`detail/${item._id}`}>
                                                        <img
                                                            className='w-16 h-16 rounded-lg'
                                                            src={item.photos[0] || "https://via.placeholder.com/150"}
                                                            alt="logo"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h1 className='font-semibold'>{item.title}</h1>
                                                        <h1 className='text-sm pb-1'>{item.category === "RTS" ? "Real-time Strategy" : item.category}</h1>
                                                        <h1 className='flex items-center gap-1'>
                                                            {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            }
            <h1 className='text-3xl font-semibold p-4 flex flex-col mt-4'>
                Recently added games
                <span className='text-[#6F7377] text-xs'>Google Play Games on PC</span>
            </h1>
            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[40px]'
            >
                {filteredProducts.length === 0 ? (
                    <p>No games found for this device</p>
                ) : (
                    filteredProducts.reverse().map((item: Games) => (
                        <SwiperSlide key={item._id} className='p-2'>
                            <iframe
                                width="100%"
                                height="auto"
                                className='rounded-2xl'
                                src={`https://www.youtube.com/embed/${item.trailer}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                            </iframe>
                            <div className='pt-4 flex gap-4'>
                                <Link href={`detail/${item._id}`}>
                                    <img
                                        className='w-16 h-16 rounded-lg'
                                        src={item.photos[0] || "https://via.placeholder.com/150"}
                                        alt="logo"
                                    />
                                </Link>
                                <div>
                                    <h1 className='font-semibold'>{item.title}</h1>
                                    <h1 className='text-sm pb-1'>{item.category === "RTS" ? "Real-time Strategy" : item.category}</h1>
                                    <h1 className='flex items-center gap-1'>
                                        {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            {device === "phone" && (
                <div>
                    <h1 className="text-2xl font-semibold p-4 flex flex-col mt-4">
                        {AdultGames.length === 0 ? ("") : (
                            <p>
                                Games for adults
                            </p>
                        )}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AdultGames.length === 0 ? (
                            ""
                        ) : (
                            AdultGames.map((item: Games, index: number) => (
                                <div key={item._id} className="p-2">
                                    <div className="pt-4 items-center flex gap-4">
                                        <h1 className="font-semibold p-1">{index + 1}</h1>
                                        <Link href={`detail/${item._id}`}>
                                            <img
                                                className="w-16 h-16 rounded-lg"
                                                src={item.photos[0] || "https://via.placeholder.com/150"}
                                                alt="logo"
                                            />
                                        </Link>
                                        <div>
                                            <h1 className="font-semibold">{item.title}</h1>
                                            <h1 className="text-sm pb-1">{item.category === "RTS" ? "Real-time Strategy" : item.category}</h1>
                                            <h1 className="flex items-center gap-1">
                                                {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {ShooterGames.length > 0 && (
                        <div>
                            <h1 className="text-3xl font-semibold p-4 flex flex-col mt-4">
                                Shooter Games
                                <span className="text-[#6F7377] text-xs">Google Play Games on PC</span>
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {ShooterGames.map((item: Games) => (
                                    <div key={item._id} className="p-2 flex-1 max-w-xs">
                                        <iframe
                                            width="100%"
                                            height="215"
                                            className="rounded-2xl"
                                            src={`https://www.youtube.com/embed/${item.trailer}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        ></iframe>
                                        <div className="pt-4 flex gap-4">
                                            <Link href={`detail/${item._id}`}>
                                                <img
                                                    className="w-16 h-16 rounded-lg"
                                                    src={item.photos[0] || "https://via.placeholder.com/150"}
                                                    alt="logo"
                                                />
                                            </Link>
                                            <div>
                                                <h1 className="font-semibold">{item.title}</h1>
                                                <h1 className="text-sm pb-1">{item.company}</h1>
                                                <h1 className="flex items-center gap-1">
                                                    {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RTS Games */}
                    {RTSGames.length > 0 && (
                        <div>
                            <h1 className="text-3xl font-semibold p-4 flex flex-col mt-4">
                                Real-time Strategy Games
                                <span className="text-[#6F7377] text-xs">Google Play Games on PC</span>
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {RTSGames.map((item: Games) => (
                                    <div key={item._id} className="p-2 flex-1 max-w-xs">
                                        <iframe
                                            width="100%"
                                            height="215"
                                            className="rounded-2xl"
                                            src={`https://www.youtube.com/embed/${item.trailer}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        ></iframe>
                                        <div className="pt-4 flex gap-4">
                                            <Link href={`detail/${item._id}`}>
                                                <img
                                                    className="w-16 h-16 rounded-lg"
                                                    src={item.photos[0] || "https://via.placeholder.com/150"}
                                                    alt="logo"
                                                />
                                            </Link>
                                            <div>
                                                <h1 className="font-semibold">{item.title}</h1>
                                                <h1 className="text-sm pb-1">{item.company}</h1>
                                                <h1 className="flex items-center gap-1">
                                                    {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Games */}
                    {ActionGames.length > 0 && (
                        <div>
                            <h1 className="text-3xl font-semibold p-4 flex flex-col mt-4">
                                Action Games
                                <span className="text-[#6F7377] text-xs">Google Play Games on PC</span>
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {ActionGames.map((item: Games) => (
                                    <div key={item._id} className="p-2 flex-1 max-w-xs">
                                        <iframe
                                            width="100%"
                                            height="215"
                                            className="rounded-2xl"
                                            src={`https://www.youtube.com/embed/${item.trailer}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        ></iframe>
                                        <div className="pt-4 flex gap-4">
                                            <Link href={`detail/${item._id}`}>
                                                <img
                                                    className="w-16 h-16 rounded-lg"
                                                    src={item.photos[0] || "https://via.placeholder.com/150"}
                                                    alt="logo"
                                                />
                                            </Link>
                                            <div>
                                                <h1 className="font-semibold">{item.title}</h1>
                                                <h1 className="text-sm pb-1">{item.company}</h1>
                                                <h1 className="flex items-center gap-1">
                                                    {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Strategy Games */}
                    {StrategyGames.length > 0 && (
                        <div>
                            <h1 className="text-3xl font-semibold p-4 flex flex-col mt-4">
                                Strategy Games
                                <span className="text-[#6F7377] text-xs">Google Play Games on PC</span>
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {StrategyGames.map((item: Games) => (
                                    <div key={item._id} className="p-2 flex-1 max-w-xs">
                                        <iframe
                                            width="100%"
                                            height="215"
                                            className="rounded-2xl"
                                            src={`https://www.youtube.com/embed/${item.trailer}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        ></iframe>
                                        <div className="pt-4 flex gap-4">
                                            <Link href={`detail/${item._id}`}>
                                                <img
                                                    className="w-16 h-16 rounded-lg"
                                                    src={item.photos[0] || "https://via.placeholder.com/150"}
                                                    alt="logo"
                                                />
                                            </Link>
                                            <div>
                                                <h1 className="font-semibold">{item.title}</h1>
                                                <h1 className="text-sm pb-1">{item.company}</h1>
                                                <h1 className="flex items-center gap-1">
                                                    {item.like} <FaStar size={"10px"} /> | {item.download} <FaDownload size={"10px"} />
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div >
    );
};

export default Products;
