import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    // Check if user has valid data in Redux state
    const hasUserData = user && user._id && user.email
    
    // Check if tokens exist in localStorage
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    
    return hasUserData && accessToken && refreshToken
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated()) {
    return <Navigate 
      to="/login" 
      state={{ from: location.pathname }} 
      replace 
    />
  }

  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute
