import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Token } from '../../Context/TokenConext';
import market from '../../assets/market.jpeg';
import {Helmet} from "react-helmet";

export default function ResetPassword() {
  const [loader, setloader] = useState(false)
  const {setUserToken}=useContext(Token)
    const [errormessage, seterrormessage] = useState(null)
  const Navigate=useNavigate()
  const initialValues={
    "email":"",
    "newPassword":"",
  }
  const validationSchema=Yup.object({
    email:Yup.string().email("Invalid email Format")
    .required("email is required"),
    newPassword:Yup.string()
    .matches(
      /^[a-zA-Z0-9]{6,9}$/,
      `Must be:
      • Start with a letter (either uppercase or lowercase).
      • Be between 6 and 9 characters in total.
      • Can only contain letters (A-Z or a-z) and numbers (0-9).`
    )
    .required("Password is required"),
  
   })
  const formik =useFormik({
   initialValues,
   validationSchema,
   onSubmit: async (values) => {
    setloader(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      )
    setUserToken(data.token)
    setloader(false)
    localStorage.setItem("usertoken",data.token)
    Navigate("/home")
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
   <form onSubmit={formik.handleSubmit} >
        <div className=" w-full flex flex-col gap-6">
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

          <div className="mb-6">
            <input
              name="newPassword"
              type="password"
              id="newPassword"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="new Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.newPassword}</span>
              </div>
            )}
          </div>
     
    
        {errormessage&& (
              <div className="p-4 mb-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{errormessage}</span>
              </div>
            )}
            
        <div className="flex justify-between">
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
              className="bg-green-500 text-white rounded-lg btn text-xl font-Roboto"
              type="submit"
            >
              Reset Password
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
                <title>Reset password</title>
            
            </Helmet>
    </>
  )
}

