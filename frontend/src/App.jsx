
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import Navbar from './Comm/Navbar'
import Home from './pages/Home'
import Footer from './Comm/Footer'
import Searchbar from './Comm/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

function App() {
 

  return (
   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     <ToastContainer />
    <Navbar/>
    <Searchbar/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/product/:productId' element={<Product/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/placeorder' element={<Placeorder/>}></Route>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/verify' element={<Verify/>}/>
    </Routes>
    <Footer/>
   
   </div>
  )
}

export default App
