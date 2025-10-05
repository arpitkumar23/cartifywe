import { useState } from 'react'
import Navbar from './contect/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './header/Home'
import Collection from './header/Collection'
import Cart from './header/Cart'
import About from './header/About'
import Footer from './header/Footer'
import Products from './header/Products'
import Searchbatr from './Contexts/Searchbatr'
import toast, { Toaster } from 'react-hot-toast';
import PlaceOrder from './header/PlaceOrder'
import Order from './header/Order'
import Login from './header/Login'
import AdminPanel from './AdminPanel/AdminPanel'
import AddItem from './AdminPanel/AddItem'
import ListItem from './AdminPanel/ListItem ' 
import AdminLogin from './AdminPanel/AdminLogin'
import Profile from './userPanel/Profile'
import Orders from './AdminPanel/Orders'
import Watch from './Contexts/Watch'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <Searchbatr />
        <Toaster />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/About' element={ <About /> } />
          <Route path='/Collection' element={ <Collection /> } />
          <Route path='/Cart' element={ <Cart /> } />
          <Route path='/order' element={ <Order /> } />
          <Route path='/Place-order' element={ <PlaceOrder /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/products/:id" element={ <Products /> } />
          <Route path="/admin" element={ <AdminLogin /> } />
          <Route path="/adminPanel" element={ <AdminPanel /> } />
          <Route path="/adminPanel/add-item" element={ <AddItem /> } />
          <Route path="/adminPanel/list-item" element={ <ListItem /> } />
          <Route path="/adminPanel/order" element={ <Orders /> } />
          <Route path="*" element={ <h1 className='not-found'>404 Not Found</h1> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path='/category/:categoryName' element={ <Watch /> } />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App


