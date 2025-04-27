import React from 'react'
import AppContent from '../components/core/home/AppContent'
import LoginForm from '../components/core/auth/LoginForm'
import { useLocation, useParams } from 'react-router-dom'
import SignupForm from '../components/core/auth/SignupForm';

function Home() {

  const {pathname} = useLocation();

  return (
    <div className='w-10/12 mx-auto p-4 mt-10 flex flex-col-reverse justify-between lg:flex-row gap-10'>
        <AppContent />
        {pathname === '/login' && <LoginForm />}
        {pathname === '/signup' && <SignupForm />}
    </div>
  )
}

export default Home