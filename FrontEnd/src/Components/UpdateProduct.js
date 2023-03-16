import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {

    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCompany, setProductCompany] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id);
    const fetchData = async () => {
        let product = await fetch(`http://localhost:5000/product/${id}`);
        product = await product.json()
        console.log(product);

        setProductName(product.name);
        setProductCategory(product.category);
        setProductPrice(product.price);
        setProductCompany(product.company);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const updateProduct = async () => {
        const updateProduct = {
            name: productName,
            category: productCategory,
            price: productPrice,
            company: productCompany,
        }
        console.log(updateProduct);

        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Put',
            body: JSON.stringify(updateProduct),
            headers: {
                'Content-type': 'application/json',
                authorization: `test ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json();
        console.log(result);
        navigate("/");
    }
    return (
        <div className="addProduct">
            <h1>update Product </h1>

            <input className="inputBox" type="text" placeholder="Enter name.." onChange={(e) => { setProductName(e.target.value) }} value={productName} />
            {!productName && <span className="error">Enter valid product name</span>}
            <input className="inputBox" type="text" placeholder="Enter category.." onChange={(e) => { setProductCategory(e.target.value) }} value={productCategory} />
            {!productCategory && <span className="error">Enter valid product category</span>}
            <input className="inputBox" type="text" placeholder="Enter price.." onChange={(e) => { setProductPrice(e.target.value) }} value={productPrice} />
            {!productPrice && <span className="error">Enter valid product price</span>}
            <input className="inputBox" type="text" placeholder="Enter company.." onChange={(e) => { setProductCompany(e.target.value) }} value={productCompany} />
            {!productCompany && <span className="error">Enter valid product company</span>}

            <button className="loginButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}
export default UpdateProduct;