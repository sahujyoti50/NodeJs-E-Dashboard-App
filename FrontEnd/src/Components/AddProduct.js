import { useState } from "react";

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCompany, setProductCompany] = useState('');
    const auth = localStorage.getItem('user');
    const addProduct = async () => {

        const newProduct = {
            name: productName,
            category: productCategory,
            price: productPrice,
            company: productCompany,
            id: JSON.parse(auth)._id
        }
        console.log(newProduct);
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json",
                authorization: `test ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json(); //converting to javascript object
        console.log(result);
    }
    return (
        <div className="addProduct">
            <h1>Add Product Page</h1>
            <input className="inputBox" type="text" placeholder="Enter name.." onChange={(e) => { setProductName(e.target.value) }} value={productName} />
            {!productName && <span className="error">Enter valid product name</span>}
            <input className="inputBox" type="text" placeholder="Enter category.." onChange={(e) => { setProductCategory(e.target.value) }} value={productCategory} />
            {!productCategory && <span className="error">Enter valid product category</span>}
            <input className="inputBox" type="text" placeholder="Enter price.." onChange={(e) => { setProductPrice(e.target.value) }} value={productPrice} />
            {!productPrice && <span className="error">Enter valid product price</span>}
            <input className="inputBox" type="text" placeholder="Enter company.." onChange={(e) => { setProductCompany(e.target.value) }} value={productCompany} />
            {!productCompany && <span className="error">Enter valid product company</span>}

            <button className="loginButton" onClick={addProduct}>Add Product</button>
        </div>
    )
}
export default AddProduct;