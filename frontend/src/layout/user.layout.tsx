import { Outlet } from 'react-router-dom';
import Header from '../component/user/header';
import Footer from '../component/user/footer';
import 'react-toastify/dist/ReactToastify.css';
import './user.layout.css'
import { apiGetByID as apiGetUser } from '../services/user/user.services'
import { apiGetData } from '../services/user/cart.services';
import { useEffect, useState } from 'react';
import Context from '../context/context'

function UserLayout() {

  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  const [userid, setUser] = useState();

  const fetUser = async () => {
    try {
      const user = await apiGetUser({});
      setUser(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataToCart = async () => {
    try {
      let cart = await apiGetData(userid);
      setCart(cart.data);
      setTotal(cart.totals);     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetUser();
    fetchDataToCart();
  }, [userid])
 
  return (
    <>
      <Context.Provider value={{ cart, fetchDataToCart, total, userid }}>
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default UserLayout;