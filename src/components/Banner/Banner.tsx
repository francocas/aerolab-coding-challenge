import * as React from 'react';
import banner from '../../assets/header-x2.png'
import '../Banner/Banner.css'
export const Banner = () => {
    return (
        <div className='bannerDiv'>
            <img alt='' className='banner' src={banner} />
            <span className='title'>Electronics</span>
        </div>
    )
}