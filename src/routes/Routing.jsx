import { Routes, Route, Outlet } from "react-router-dom"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import NotFound from "../pages/NotFound"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"
import UserMenuMobile from "../pages/UserMenuMobile"
import Dashboard from "../layout/Dashboard"
import Profile from "../pages/Profile"
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import CategoryPage from "../pages/CategoryPage"
import SubCategory from "../pages/SubCategory"
import UploadProduct from "../pages/UploadProduct"
import ProductAdmin from "../pages/ProductAdmin"
import ProtectedRoute from "../components/ProtectedRoute"
import AdminPermision from "../layout/AdminPermision"
import ProductListPage from "../pages/ProductListPage"
// Layout component that includes Header and Footer
const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* This renders the matched child route */}
    <Footer />
  </>
);

const Routing = () => {
    return (
      <>
      <Routes>
        {/* Routes that need header and footer */}
        <Route path="/" element={<Layout />} >

          <Route index element={<Home />} />
          <Route path="search" element={<SearchPage />} />
          {/* <Route path="user" element={<User />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<OtpVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="user" element={<UserMenuMobile />} />

          {/* Dashboard Routes */}
          <Route path="dashboard" element={
            
            <ProtectedRoute>
            <Dashboard />
             </ProtectedRoute>
          }>

           <Route path="category" element={
            
            <AdminPermision>
              <CategoryPage/>
            </AdminPermision>
            
            }/>
            <Route path="subcategory" element={

              <AdminPermision>
                <SubCategory/>
              </AdminPermision>

            }/>
            <Route path="upload-product" element={

              <AdminPermision>
                <UploadProduct/>
              </AdminPermision>

            }/>
            <Route path="product" element={

              <AdminPermision>
                <ProductAdmin/>
              </AdminPermision>

            }/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="myorders" element={<MyOrders
            />}/>
            <Route path="address" element={<Address/>}/>
           
          </Route>

          {/* Product List Page Route */}
          <Route path=":category/:subcategory" element={<ProductListPage />} />


        </Route>


        <Route path="*" element={<NotFound />} />

      </Routes>

 </>
  )
}

export default Routing
 




// import { Routes, Route, Outlet } from "react-router-dom"
// import Home from "../pages/Home"
// import SearchPage from "../pages/SearchPage"
// import NotFound from "../pages/NotFound"
// import Header from "../components/Header"
// import Footer from "../components/Footer"
// import Login from "../pages/Login"
// import Register from "../pages/Register"
// import ForgotPassword from "../pages/ForgotPassword"
// import OtpVerification from "../pages/OtpVerification"
// import ResetPassword from "../pages/ResetPassword"
// import UsersMenuPage from "../pages/UserMenuMobile"
// import Dashboard from "../layout/Dashboard"
// import Profile from "../pages/Profile"
// import MyOrders from "../pages/MyOrders"
// import Address from "../pages/Address"
// import CategoryPage from "../pages/CategoryPage"
// import SubCategory from "../pages/SubCategory"
// import UploadProduct from "../pages/UploadProduct"
// import ProductAdmin from "../pages/ProductAdmin"
// import ProtectedRoute from "../components/ProtectedRoute" // Add this import

// // Layout component that includes Header and Footer
// const Layout = () => (
//   <>
//     <Header />
//     <Outlet />
//     <Footer />
//   </>
// );

// const Routing = () => {
//   return (
//     <>
//       <Routes>
//         {/* Routes that need header and footer */}
//         <Route path="/" element={<Layout />} >
//           <Route index element={<Home />} />
//           <Route path="search" element={<SearchPage />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="verify-otp" element={<OtpVerification />} />
//           <Route path="reset-password" element={<ResetPassword />} />
//           <Route path="user" element={<UsersMenuPage />} />

//           {/* Wrap Dashboard and its nested routes with ProtectedRoute */}
//           <Route path="dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }>
//             <Route path="category" element={<CategoryPage/>}/>
//             <Route path="subcategory" element={<SubCategory/>}/>
//             <Route path="upload-product" element={<UploadProduct/>}/>
//             <Route path="product" element={<ProductAdmin/>}/>
//             <Route path="profile" element={<Profile/>}/>
//             <Route path="myorders" element={<MyOrders/>}/>
//             <Route path="address" element={<Address/>}/>
//           </Route>
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   )
// }

// export default Routing
