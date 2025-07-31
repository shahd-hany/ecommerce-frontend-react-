import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../Context/TokenConext';
import market from '../../assets/market.jpeg';
import {Helmet} from "react-helmet";

export default function VerificationCode() {
  const [loader, setloader] = useState(false)
  const {setUserToken}=useContext(Token)
    const [errormessage, seterrormessage] = useState(null)
  const Navigate=useNavigate()
  const initialValues={
    "resetCode":"",
  }
  const validationSchema=Yup.object({
    resetCode:Yup.string()
    .required("Reset code is required. Please check your email inbox for the code"),
   })
  const formik =useFormik({
   initialValues,
   validationSchema,
   onSubmit: async (values) => {
    setloader(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
    setloader(false)
    Navigate("/resetpassword")
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
      <h1 className='text-xl font-EncodeSansExpanded main-color mb-10'>please enter your Verification code</h1>
   <form onSubmit={formik.handleSubmit} >
        <div className=" w-full flex flex-col gap-3">
          <div className="mb-6">
            <input
              name="resetCode"
              type="text"
              id="resetCode"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="Verification code "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.resetCode}</span>
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
                <title>Forget password</title>
            
            </Helmet>
    </>
  )
}

