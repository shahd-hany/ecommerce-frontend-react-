import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="flex items-center justify-center left-0 right-0 top-0 bottom-[-10%] absolute loader-bg ">
      <Circles
        height="150"
        width="150"
        color="#EEEEEE"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  )
}
