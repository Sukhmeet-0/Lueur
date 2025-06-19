import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = () =>{

    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptas?
      </p>
      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3' onSubmit={onSubmitHandler}>
        <input className='w-full sm:flex-1 outline-none border-b-2  hover:border-b-3  border-black transition ease-in-out ' type='email' placeholder='Enter your email' required/> 
        <button className='bg-black text-white text-sm px-10 py-1 rounded' type='submit'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
