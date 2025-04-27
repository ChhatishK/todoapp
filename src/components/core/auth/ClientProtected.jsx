import React from 'react'
import { useSelector } from 'react-redux'
import Error from '../../common/Error';

function ClientProtected({children}) {

    const {token, user} = useSelector((state) => state.auth);

    if (token !== null && user.accountType === 'Client') {
      return children
    } else {
      return <Error></Error>
    }

  return (
    <div>protected</div>
  )
}

export default ClientProtected