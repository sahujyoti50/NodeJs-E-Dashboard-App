import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(() => {

        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const collectData = async () => {
        const data = {
            name: name,
            password: password,
            email: email
        }
        console.log(data);

        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        }
    }

    return (
        <div className="signuppage">
            <h1>Sign-up Here</h1>
            <input className="inputBox" type="text" placeholder="Enter name.." onChange={(e) => { setName(e.target.value) }} value={name} />
            <input className="inputBox" type="email" placeholder="Enter email.." onChange={(e) => { setEmail(e.target.value) }} value={email} />
            <input className="inputBox" type="password" placeholder="Enter password.." onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <button className="signup" onClick={collectData}>Sign Up</button>
        </div>
    )
}
export default SignUp;