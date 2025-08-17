import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <DotLottieReact
                src="https://lottie.host/7f567fd6-d188-4e61-ba62-c565ff2aa5d9/ELzeolzuwj.lottie"
                loop
                autoplay
            />
        </div>
    )
}

export default loading
