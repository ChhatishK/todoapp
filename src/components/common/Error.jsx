import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center text-gray-300'>
        <h1 className='heading'>You are Unauthorized on this route.</h1>
        <p>Explore Other Features</p>
        <Link to='/login'><button className='btn'>Authorize</button></Link>
    </div>
  )
}

export default Error