import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from "./Cart.module.css"
import axios from "axios"
import Modal from 'react-modal';

Modal.setAppElement('#root');
const Cart = () => {
  const navigate = useNavigate()
  const [path ,setPath]=useState()
  const [total, setTotal] = useState(0)
  const carts = JSON.parse(localStorage.getItem('cart')) || []
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)
    localStorage.setItem('total', JSON.stringify(total))
  }, [carts])

  const handleInc = (id) => {
    const updatedCart = carts.map(item => {
      if(item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleDec = (id) => {
    const updatedCart = carts.map(item => {
      if(item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const removeProduct = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }
  const handleCheckout =async()=>{

    const token = localStorage.getItem('token');

  if (token) {
    setPath('/checkout');
  } else {
    
    openModal();
  }


  }

  if(carts.length === 0) {
    return <div className=' h-[55vh] flex justify-center items-center text-4xl '>Cart is Empty</div>
  }

  return (
    <div className="container mx-auto h-full mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {
            carts?.map(cart => {
              return (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={cart?.image} alt={cart?.name} />
                    </div>
                    <div className="flex flex-col  ml-5 flex-grow">
                      <span className="font-bold text-sm">{cart?.name}</span>
                      <span className="text-red-500 text-xs capitalize">{cart?.category}</span>
                
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart?.id)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input className="mx-2 border text-center w-8" type="text" value={cart?.quantity} />

                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?.id)} viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">{cart?.price} DA</span>
                  <span className="text-center w-1/5 font-semibold text-sm">{cart?.price * cart?.quantity} DA</span>
                  <div class="flex items-center justify-center  text-black font-semibold  cursor-pointer" onClick={() => removeProduct(cart?.id)}>x</div>
                </div>
              )
            })
          }

          <Link to={'/products'} className="flex font-semibold text-gray text-sm mt-10">

            <svg className="fill-current mr-2  text-gray w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {carts?.length}</span>
            <span className="font-semibold text-sm">{total?.toFixed(2)} DA</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Shipping - Free</option>
            </select>
          </div>
          {/* <div className="py-10">
            <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div> */}
          {/* <button className="bg-red-500 border-none hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> */}
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{(total).toFixed(2)} DA</span>
            </div>
            <Link to={path} >
            <button className="bg-red-500 hover:bg-red-500 text-sm text-white px-4 py-2 rounded text-lg border-none hover:border-none" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </Link>
            
          </div>
        </div>

      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={classes.modal}
        overlayClassName={classes.overlay}
      >
        <h2>You need to login first</h2>
        <p>
          Please <Link to="/auth" onClick={closeModal}>login</Link> or <Link to="/auth" onClick={closeModal}>sign up</Link> to proceed.
        </p>
      </Modal>
    </div>
  )
}

export default Cart;