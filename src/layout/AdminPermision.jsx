import React from 'react'
import { useSelector } from 'react-redux'
import IsAdmin from '../utils/IsAdmin'

const AdminPermision = ({children}) => {
    const user = useSelector((state) => state.user)
    // console.log("user from adminPermisonpage",user)
    if(!IsAdmin(user?.role)){
        return (
            <div className='p-4'>
                <p className='text-red-500 bg-red-100 p-4 rounded'> 
                    You do not have permission to access this page. 
                </p>
            </div>
        )
    }
  return <>{children}</>
  
}

export default AdminPermision