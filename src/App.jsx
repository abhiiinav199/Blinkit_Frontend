import { useState } from "react";
import { useEffect } from "react";
import Routing from "./routes/Routing";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./Slice/userSlice";
import { useDispatch } from "react-redux";
import { setAllCategory, setAllSubCategory } from "./Slice/productSlice";
import axios from "./utils/axios";
import { SummaryApi } from "./common/SummaryApi";
import fetchCategory from "./utils/fetchCategory";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      const data = userData?.data;

      dispatch(setUserDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategory = async () => {


    try {
      // const accessToken = localStorage.getItem("accessToken");
      // const refreshToken = localStorage.getItem("refreshToken");

      // if (accessToken && refreshToken) {}
      const allCategoryData = await fetchCategory();
      const data = allCategoryData?.data;

      dispatch(setAllCategory(data));
  //  console.log(data)
    } catch (error) {
      console.log(error);
    } 
  };

 const fetchSubCategory = async()=>{
    try {
    
      const res = await axios({
        ...SummaryApi.getSubCategory
      })

      const { data : responseData }  = res
      
      if(responseData.success){
        dispatch(setAllSubCategory(responseData.data))
      
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchUser();
    fetchAllCategory();
    fetchSubCategory()
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-3xl">Loading...</div>; // Or your Loading component
  }

  return (
    <>
      <Routing />
      <Toaster />
    </>
  );
};

export default App;
