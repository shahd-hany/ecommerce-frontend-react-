import React, { useState } from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Token } from '../../Context/TokenConext'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../Redux/GetCart'
export default function Navbar() {

  const { numberOfCartItems } = useSelector((state) => state.getcart)
  const { UserToken, setUserToken } = useContext(Token)
  const [scroll, setscroll] = useState(false)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  function Logout() {
    localStorage.removeItem('usertoken'),
      setUserToken(null)
    Navigate("/login")
  }
  async function GetCart() {
    await dispatch(getCart())
  }
  function IsScroll() {
    if (window.scrollY > 50)
      setscroll(true)
    else
      setscroll(false)
  }
  
  useEffect(() => {
    if (UserToken)
      GetCart()
      
  }, [UserToken])

  useEffect(()=>{
     window.addEventListener("scroll",IsScroll)
  },[ ])
  return (
    <>

      <nav className={` dark:bg-gray-900 fixed w-full z-20 top-0 start-0  dark:border-gray-600 nav ${scroll ? 'bg-white shadow-md' :  'bg-transparent '}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to={"/home"} className="block py-2 px-3  rounded-sm md:bg-transparent md:text-slate-500 md:p-0 md:dark:text-white hover:text-slate-900 text-md " aria-current="page">
            <span className="self-center text-4xl font-semibold whitespace-nowrap text-black logo">fresh Cart</span>
          </NavLink>
          {UserToken ? <> <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
            <ul className="flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li><NavLink to={"/cart"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:text-white md:p-0 md:dark:text-white hover:text-slate-900 font-medium text-md"><div className="relative"><i className='fa-solid fa-cart-shopping text-2xl text-black'></i><span className="bg-main text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-green-900 dark:text-green-300 absolute bottom-5 left-4">{numberOfCartItems}</span></div></NavLink></li>
              <li>
                <button onClick={() => { Logout() }} className="block py-2 px-3 text-black rounded-sm md:bg-transparent  md:p-0  links font-medium text-xl ">Logout</button>
              </li>
            </ul>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4  font-medium border  rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to={"/home"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:p-0 md:dark:text-white links font-medium text-lg " aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/cart"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent  md:p-0 md:dark:text-white links font-medium text-lg">Cart</NavLink>
                </li>
                <li>
                  <NavLink to={"/wishlist"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:p-0 md:dark:text-white links font-medium text-lg " aria-current="page">Wish List</NavLink>
                </li>
                <li>
                  <NavLink to={"/Products"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent  md:p-0 md:dark:text-white links font-medium text-lg" aria-current="page">Products</NavLink>
                </li>


              </ul>
            </div></> : <>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
              <ul className="flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to={"/register"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:p-0  links font-medium text-md ">Register</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"} className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:p-0  links font-medium text-md ">Login</NavLink>
                </li>
              </ul>
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          </>}

        </div>
      </nav>


    </>
  )
}
