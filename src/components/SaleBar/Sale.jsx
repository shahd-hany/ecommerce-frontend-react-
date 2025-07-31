import React from 'react'
import vedio from '../../assets/file.mp4'
export default function Sale() {
    return (
        <>
            <div className="sale mt-28 flex justify-center items-center">
                <div className="home-vedio -z-10 ">
                    <video autoPlay loop muted >
                        <source src={vedio} type="video/mp4" />
                    </video>
                </div>
                <div className="vedio-caption">
                    <h1>30%-70% On Selected Styles</h1>
                </div>
            </div>

        </>
    )
}
