import { useEffect, useState } from 'react';
import HomeCard from './HomeCard';
import { getProducts } from '../helpers/product';
import "../css/home-card-list.css"

const HomeCardList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const items = await getProducts(8);
            const visibleProducts = Array.isArray(items)
                ? items.filter((item) => item?.active !== false)
                : [];
            setProducts(visibleProducts);
            setLoading(false);
        } catch (error) {
            console.error("Error cargando productos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className='list-card-cont'>
        {products.map(prod => (
            <HomeCard  key={prod._id} product={prod} />
        ))}
        </div>
    );
};

export default HomeCardList;
