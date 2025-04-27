import React from 'react'
import { useSelector } from 'react-redux'
import Error from '../../common/Error';

function AdminProtected({children}) {
    const {token, user} = useSelector((state) => state.auth);

    if (token !== null && user.accountType === 'Admin') {
        return children;
    } else {
        return <Error message="Access Denied: Admin Only" />;
    }
}

export default AdminProtected;