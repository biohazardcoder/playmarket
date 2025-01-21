import Header from '@/components/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Axios from "../../middlewares/Axios"
function id() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
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

    console.log(product);
    console.log(loading);
    console.log(error);

    return (
        <div>
            <Header />
        </div>
    )
}

export default id