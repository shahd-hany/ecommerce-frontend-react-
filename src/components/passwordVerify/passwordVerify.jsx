import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Token } from '../../Context/TokenConext';
import market from '../../assets/market.jpeg'
import {Helmet} from "react-helmet";

export default function PasswordVerify() {
  const [loader, setloader] = useState(false)
  const {setUserToken}=useContext(Token)
    const [errormessage, seterrormessage] = useState(null)
  const Navigate=useNavigate()
  const initialValues={
    "email":"",
  }
  const validationSchema=Yup.object({
    email:Yup.string().email("Invalid email Format")
    .required("email is required"),
   })
  const formik =useFormik({
   initialValues,
   validationSchema,
   onSubmit: async (values) => {
    setloader(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
    setloader(false)
    Navigate("/Verificationcode")
  } catch (error) {
    seterrormessage(error.response.data.message) 
    setloader(false)
  }
  }
  })
  return (
    <>
     <div className="flex container mx-auto">
      <div className="w-1/2">
      <div className='mx-auto mt-36 p-10'>
        <h1 className='text-xl font-EncodeSansExpanded main-color mb-10'>please enter your email</h1>
   <form onSubmit={formik.handleSubmit} >
        <div className=" w-full flex flex-col gap-3">
          <div className="mb-6">
            <input
              name="email"
              type="email"
              id="email"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            )}
          </div>

      
    
        {errormessage&& (
              <div className="p-4 mb-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{errormessage}</span>
              </div>
            )}
            
        <div className="text-start">
          {loader ? (
            <button
              className="bg-green-500 text-white btn rounded-lg"
              type="button"
              disabled
            >
              <i className="fa fa-spinner fa-spin"></i> Loading
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="bg-green-500 text-white rounded-lg btn text-xl font-Roboto "
              type="submit"
            >
              Verify
            </button>
          )}
        </div> 
        
        </div>
      </form>
      </div>
      </div>
      <div className="w-1/2 overflow-hidden">
       <img src={market} className='object-cover'></img>
      </div>
    </div>
    <Helmet>
                <meta charSet="utf-8" />
                <title>forget password</title>
            
            </Helmet>
    </>
  )
}

