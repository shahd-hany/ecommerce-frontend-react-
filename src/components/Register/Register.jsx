import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import market from'../../assets/market.jpeg'
import {Helmet} from "react-helmet";

export default function Register() {
  const [loader, setloader] = useState(false)
  const [errormessage, seterrormessage] = useState(null)
  const Navigate=useNavigate()
  const initialValues={
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":"",
  }
  const validationSchema=Yup.object({
    name: Yup.string()
    .required("Name is required")
    .min(3, "Cannot be less than 3 characters"),

    email:Yup.string().email("Invalid email Format")
    .required("email is required"),

    password:Yup.string().matches(/^[a-zA-Z0-9]{6,9}$/,`must be\n
* Start with a letter (either uppercase or lowercase).\n
* Be between 6 and 9 characters in total.\n
* Can only contain letters (A-Z or a-z) and numbers (0-9)`).required("password is required"),

rePassword: Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Re-Password is required"),

phone:Yup.string().required("phone is required")
.matches(/^(020)?01[0215][0-9]{8}$/,"Invalid phone number")
   })
  const formik =useFormik({
   initialValues,
   validationSchema,
   onSubmit: async (values) => {
    setloader(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      )
    
    setloader(false)
    Navigate("/login")
  } catch (error) {
        seterrormessage(error.response.data.message) 
        setloader(false)
  }
  }
  })
  return (
    <>
      <div className="flex container mx-auto p-20">
      <div className="w-1/2">
      <div className='w-4/5 mx-auto mt-36'>
   <form onSubmit={formik.handleSubmit} >
        <div className=" w-full flex flex-col gap-3">
          <div className="mb-6">
            <input
              name="name"
              type="text"
              id="name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300 block w-full p-2.5"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.name}</span>
              </div>
            )}
          </div>

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

          <div className="m">
            <input
              name="password"
              type="password"
              id="password"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              name="rePassword"
              type="password"
              id="rePassword"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-200 focus:border-green-300  block w-full p-2.5"
              placeholder="Re-enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">{formik.errors.rePassword}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              name="phone"
              type="tel"
              id="phone"
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
              className="bg-green-500 text-white rounded-lg btn text-lg font-Roboto"
              type="submit"
            >
              Register now
            </button>
          )}
        </div>
      </form>
      </div>
      </div>
      <div className="w-1/2 ">
       <img src={market} className='object-cover '></img>
      </div>
    </div>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            
            </Helmet>
    </>
  )
}
