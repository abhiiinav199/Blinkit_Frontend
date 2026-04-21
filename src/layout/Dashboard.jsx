import { Outlet } from "react-router-dom"
import UsersMenu from "../components/UsersMenu"
import { useSelector } from "react-redux"

const Dashboard = () => {
  const user = useSelector(state => state.user)
  // console.log("dashboard user", user)
  
    return (
      <section className="min-h-[78vh]">
        <div className="container grid lg:grid-cols-12 gap-2 mx-auto p-3  bg-white ">

          {/* left for menu */}
          <div className="col-span-3 px-8 py-4 max-h-[calc(100vh - 120px)] sticky top-24 overflow-auto scroll-none hidden lg:block border-r">
            <UsersMenu/>

          </div>


          {/* right for content */}
          <div className="col-span-9 min-h-[78vh]">
            <Outlet/>
          </div>

        </div>

    </section>
  )
}

export default Dashboard