import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const fetchData = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `test ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);

    }
    useEffect(() => {
        fetchData();
    }, []);

    const searchHandle = async (e) => {
        let key = e.target.value.toLowerCase();
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `test ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();

            if (result) {
                setProducts(result);
            }
        } else {
            fetchData();
        }

    }


    const deleteHandler = async (id) => {
        // console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `test ${JSON.parse(localStorage.getItem('token'))}`
            }

        },);
        result = await result.json();
        if (result) {
            fetchData();
        }
    };
    return (
        <div className="product-list">
            <input type="text" placeholder="start searching product..." className="searchBox" onChange={searchHandle} />
            <h1>Products List</h1>
            <ul>
                <li>Product Name</li>
                <li>product price</li>
                <li>product category</li>
                <li>product company</li>
                <li>Operation</li>
            </ul>
            {products.length > 0 ? (products.map((product) => {
                return <ul key={product._id}>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>{product.category}</li>
                    <li>{product.company}</li>
                    <li><button onClick={() => deleteHandler(product._id)}>Delete</button>
                        <Link to={"/update/" + product._id}>Update</Link></li>
                </ul>
            })) : <h3>No Result Found</h3>
            }
        </div>

    )
}
export default ProductsList;