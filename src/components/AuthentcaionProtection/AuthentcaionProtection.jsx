import React from 'react'
import { Navigate } from 'react-router-dom'
export default function AuthentcaionProtection(props) {
  if(localStorage.getItem('usertoken')){
    return (<Navigate to={"/home"}></Navigate>)
  }
  else{
    return (
      props.children
    )
  }

}
