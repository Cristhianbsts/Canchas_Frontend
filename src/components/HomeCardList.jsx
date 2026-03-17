import { useEffect, useState } from 'react';
import HomeCard from './HomeCard';
import "../css/home-card-list.css"

const HomeCardList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:1111/api/products?limit=8');
            const data = await response.json();
            setProducts(data.items);
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