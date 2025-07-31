import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { PayNow } from '../../Redux/GetCart';
import { useDispatch, useSelector } from 'react-redux';
import {Helmet} from "react-helmet";

export default function Checkout() {
  const [loader, setloader] = useState(false)
  const [errormessage, seterrormessage] = useState(null)
 const{cartId}= useSelector((state)=>state.getcart)
 const dispatch=useDispatch()
  const initialValues={
    "details": "",
    "phone": "",
    "city": ""
  }
  const validationSchema=Yup.object({
    details: Yup.string()
    .required("Name is required"),

phone:Yup.string().required("phone is required")
.matches(/^(020)?01[0215][0-9]{8}$/,"Invalid phone number"),
 city:Yup.string().required("City is required ")
   })
  const formik =useFormik({
   initialValues,
   validationSchema,
   onSubmit: async (values) => {
    setloader(true);
    dispatch(PayNow({cartId,values}))
        setloader(false)
  }
  }
  )
  return (
    <>
    <div className="container flex justify-center items-center p-32">
    <div className='w-10/12 '>
   <form onSubmit={formik.handleSubmit} >
        <div className=" w-full flex flex-col gap-3">
          <h1 className="main-color text-3xl mb-3">Checkout</h1>

          <div className="mb-6">
            <input
              name="details"
              type="text"
              id="details"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300 block w-full p-2.5"
              placeholder="Details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            {formik.errors.details && formik.touched.details && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.name}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              name="phone"
              type="tel"
              id="telphone"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              name="city"
              type="text"
              id="city"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300 block w-full p-2.5"
              placeholder="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.city}</span>
              </div>
            )}
          </div>

        </div>
    
        {errormessage&& (
              <div className="p-4 mb-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{errormessage}</span>
              </div>
            )}
        <div className="text-end">
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
              className="bg-green-500 text-white rounded-lg btn text-xl"
              type="submit"
            >
              Pay Now
            </button>
          )}
        </div>
      </form>
      </div></div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
            
            </Helmet>
    </>
  )
}
