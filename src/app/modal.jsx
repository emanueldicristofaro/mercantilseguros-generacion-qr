import React from 'react'

export default function modal({title, children, isVisible, onClose}){

    if(!isVisible) return null

    return(
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center animate-fadeIn'>
            <div className='w-[600px] flex flex-col'>
                <div className='bg-white p-2 rounded-lg'>
                    <div className='flex items-center'>
                        <h1 className='flex-1'>{ title }</h1>
                        <button onClick={() => onClose()} className='text-black text-xl ml-3 whitespace-nowrap'>X</button>      
                    </div>
                    <hr className='mt-2 mb-2'></hr>
                    { children }
                </div>
            </div>
        </div>
    )
}