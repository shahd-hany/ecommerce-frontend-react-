import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="footer p-6">
                <div className="container w-11/12 m-auto">
                    <div className="row flex  flex-wrap">
                        <div className="sm:w-full md:w-1/4 p-10">
                            <div className="foot-caption flex gap-10 flex-col">
                                <h1 className='font-bold text-xl '>fresh cart</h1>
                                <p>This is the space to introduce visitors to the business or brand. Briefly explain who's behind it, what it does and what makes it unique. Share its core values and what this site has to offer.</p>
                                <ul className='list-none flex gap-5'>
                                        <li><i className="fa-brands fa-facebook text-black" /></li>
                                        <li><i className="fa-brands fa-instagram text-black" /></li>
                                        <li><i className="fa-brands fa-tiktok text-black" /></li>
                                        <li><i className="fa-brands fa-youtube text-black" /></li>
                                    

                                </ul>
                            </div>

                        </div>

                        <div className="sm:w-full md:w-1/4 p-10">
                            <div className="foot-caption flex gap-10 flex-col">
                                <h1 className='font-bold text-xl '>Categories</h1>
                                <ul className='list-none flex flex-col gap-3'>
                                    <li className='font-semibold text-md'>Women</li>
                                    <li>Tops</li>
                                    <li>Bottoms</li>
                                    <li>Bundles</li>
                                    <li>Accessories</li>
                                    <li className='font-semibold text-md'>Men</li>
                                    <li>Tops</li>
                                    <li>Bottoms</li>
                                </ul>
                            </div>
                        </div>

                        <div className="sm:w-full md:w-1/4 p-10">
                            <div className="foot-caption flex gap-10 flex-col">
                                <h1 className='font-bold text-xl '>Contact</h1>
                                <p className='text-lg '>500 Terry Francine Street
                                    San Francisco, CA 94158
                                    info@mysite.com
                                    Tel: 123-456-7890.</p>
                                <div className='flex flex-col gap-6 pt-2'>
                                    <h1 className='font-bold text-xl'>Shop Polices</h1>
                                    <ul className='list-none flex gap-3 flex-col'>
                                        <li>Refund policy</li>
                                        <li>Shipping policy</li>
                                    </ul> </div>
                            </div>

                        </div>

                        <div className="sm:w-full md:w-1/4 p-10">
                            <div className="foot-caption flex gap-10 flex-col">
                                <h1 className='font-bold text-xl '>Newsletter</h1>
                                <p>Subscribe to our newsletter and get 10% off your first order</p>
                            </div>

                        </div>

                    </div>
                    </div>
                </div>

        </>
    )
}
