import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  
  // Check if user is authenticated
  // Primary check: localStorage tokens are the persistent source of truth
  // and survive page refreshes. Redux state may not be hydrated yet if
  // fetchUser() is still in-flight (async race condition).
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")
  
  const hasTokens = !!(accessToken && refreshToken)
  const hasUserData = !!(user && user._id)

  // User is authenticated if tokens exist in localStorage OR Redux state is populated.
  // Tokens take priority because Redux state is loaded asynchronously and may lag behind.
  const isAuthenticated = hasTokens || hasUserData

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
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
