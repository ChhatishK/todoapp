import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI';

function Navbar() {

    const {token, user} = useSelector((state) => state.auth);
    // console.log(token);
    const dispatch = useDispatch();

  return (
    <div className='w-10/12 mx-auto p-4 flex justify-between items-center'>
        <div className='text-2xl font-bold'>
            TODO APP {user?.accountType === 'Admin' && <span className='text-xs text-gray-400'>Admin</span>} {user?.accountType === 'Client' && <span className='text-xs text-gray-400'>Client</span>}
        </div>

        <div className='flex items-center gap-2'>
            
            {!token && (
                <>
                    <Link to='/login'>
                    <button className='btn'>Log in</button>
                    </Link>

                    <Link to='/signup'>
                        <button className='btn'>Sign up</button>
                    </Link>

                
                </>
            )}

            {token && user?.accountType === 'Client' && (
                <>
                    <Link to='client/create-todo'>
                        <button className='btn'>Create Todo</button>
                    </Link>
                    <Link to='client/view-todos'>
                        <button className='btn'>View Todo</button>
                    </Link>
                    <Link to='client/update-profile'>
                        <button className='btn'>Update Profle</button>
                    </Link>
                    <Link to='/login'>
                        <button className='btn' onClick={() => logout(dispatch)}>Log out</button>
                    </Link>
                </>
            )}

            {token && user.accountType === 'Admin' && (
                <>
                    <Link to='/admin/view-todos'>
                        <button className='btn'>View Todo</button>
                    </Link>

                    <Link to='/admin/update-profile'>
                        <button className='btn'>Update Profle</button>
                    </Link>
                    <Link to='/login'>
                        <button className='btn' onClick={() => logout(dispatch)}>Log out</button>
                    </Link>
                </>
            )}

        </div>
    </div>
  )
}

export default Navbar