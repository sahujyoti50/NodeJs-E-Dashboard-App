import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductsList from './Components/ProductsList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductsList />}></Route>
            <Route path='/add-product' element={<AddProduct />}></Route>
            <Route path='/update/:id' element={<UpdateProduct />}></Route>
            <Route path='/logout' element={<h1>logout component</h1>}></Route>
            <Route path='/profile' element={<h1>profile component</h1>}></Route>
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
