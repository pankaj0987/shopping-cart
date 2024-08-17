import Image from 'next/image'
import React from 'react'

function Loader() {
    return (
        <div className="w-full h-[calc(100vh-124px)] flex flex-col justify-center items-center bg-white border border-[#f0f0f0]">
            <Image src="/loader.gif" width={40} height={40} alt="loading" />
        </div>
    )
}

export default Loader