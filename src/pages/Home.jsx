import React from "react";
import banner from "../assets/banner.jpg";
import mobile_banner from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ValidUrlConvert from "../utils/ValidUrlConvert";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  // console.log("subcategoryData", subCategoryData);
  console.log("categoryData", categoryData);

  const handleRedirectProductListPage = (id, name) => {
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        
        return c._id === id
      });
     
      return filterData ? true : false;
    });
    console.log("subcategory", subCategory);

    const url = `/${ValidUrlConvert(name)}-${id}/${ValidUrlConvert(subCategory.name)}-${subCategory._id}`;

    navigate(url);
  };
  return (
    <main className="min-h-[78vh]">
      <section className="bg-white">
        <div className="container mx-auto ">
          <div
            className={`w-full h-full bg-blue-200 rounded ${!banner && "animate-pulse my-2"}`}
          >
            <img
              src={banner}
              alt="banner"
              className="w-full h-full hidden lg:block"
            />
            <img
              src={mobile_banner}
              alt="banner"
              className="w-full h-full lg:hidden"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="container mx-auto px-4 grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {loadingCategory
            ? new Array(12).fill(null).map((c, index) => (
                <div
                  key={index}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              ))
            : categoryData.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleRedirectProductListPage(item._id, item.name)
                  }
                  className=" cursor-pointer"
                >
                  <div>
                    <img
                      className="w-full h-fll object-scale-down"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </div>
              ))}
        </div>

        {/* display category product */}

        {categoryData.map((item, index) => (
          <CategoryWiseProductDisplay key={index} id={item?._id} name={item?.name}/>
        ))}
      </section>
    </main>
  );
};

export default Home;
