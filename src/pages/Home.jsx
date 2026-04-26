import React from "react";
import banner from "../assets/banner.jpg";
import mobile_banner from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
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
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-6 gap-2">
          {new Array(12).fill(null).map((c, index) => (
            <div className="bg-white rounded p-4 min-h-36">
              <div className="bg-blue-100 min-h-20"></div>
              <div className="bg-blue-100 h-8"></div>
              <div>
                <div className="bg-blue-100 h-8"></div>
                <div className="bg-blue-100 h-8"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
