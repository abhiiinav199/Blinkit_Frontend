import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { SummaryApi } from "../common/SummaryApi";
import axios from "../utils/axios";
import { useState } from "react";

const ProductDisplayPage = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);

  const imageContainer = useRef()

  const params = useParams();
  const { product } = params;

  //use this productId
  const productId = product?.split("-")?.slice(-1)?.[0];

  //better approch - another way of doing using pop
  // const productId = product.split("-").pop() // remove pop if want to use id or name in another component because -The pop() method of Array instances removes the last element from an array and returns that element. This method changes the length of the array.

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const res = await axios({
        ...SummaryApi?.getProductDetails,
        data: {
          productId: productId,
        },
      });
      const { success, data } = res?.data;
      if (success) {
        setData(data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [params]);
  return (
    <div className="min-h-[78vh]">
      <section className="container mx-auto p-4 grid lg:grid-cols-2">
        <div>
          <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
            <img
              src={data.image[imageIndex]}
              alt={data?.name}
              className="w-full h-full object-scale-down"
            />
          </div>

          <div className="flex items-center justify-center gap-3 my-2">
            {data?.image?.map((img, index) => {
              return (
                <div
                  key={img + index + "point"}
                  className={`bg-slate-200 cursor-pointer w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === imageIndex && "bg-slate-300"}`}
                   onClick={() => setImageIndex(index)}
                ></div>
              );
            })}
          </div>

          <div className="grid relative">
            <div
              ref={imageContainer}
              className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
            >
              {data?.image?.map((img, index) => {
                return (
                  <div
                    className={`w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md ${index === imageIndex && "scale-90 transition-all shadow-blue-900 shadow-large"}`}
                    key={img + index}
                  >
                    <img
                      src={img}
                      alt="min-product"
                      onClick={() => setImageIndex(index)}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="my-4 hidden lg:grid gap-3">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">Fresh premium quality product.</p>
            </div>
            <div>
              <p className="font-semibold">Unit</p>
              <p className="text-base">1 Unit</p>
            </div>
          </div>
        </div>

        <div className="p-4 lg:pl-7 text-base lg:text-lg">
          <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
          <h2 className="text-lg font-semibold lg:text-3xl">Sample Product</h2>
          <p>1 Unit</p>
          {/* <Divider /> */}

          <div>
            <p>Price</p>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
                <p className="font-semibold text-lg lg:text-xl">₹199</p>
              </div>
              <p className="line-through">₹249</p>
              <p className="font-bold text-green-600 lg:text-2xl">
                20% <span className="text-base text-neutral-500">Discount</span>
              </p>
            </div>
          </div>

          <div className="my-4">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
              Add to Cart
            </button>
          </div>

          <h2 className="font-semibold">Why shop from binkeyit?</h2>

          {/* <div>
            <div className='flex items-center gap-4 my-4'>
                <img src={image1} alt='superfast delivery' className='w-20 h-20' />
                <div className='text-sm'>
                    <div className='font-semibold'>Superfast Delivery</div>
                    <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                </div>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <img src={image2} alt='Best prices offers' className='w-20 h-20' />
                <div className='text-sm'>
                    <div className='font-semibold'>Best Prices & Offers</div>
                    <p>Best price destination with offers directly from the manufacturers.</p>
                </div>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <img src={image3} alt='Wide Assortment' className='w-20 h-20' />
                <div className='text-sm'>
                    <div className='font-semibold'>Wide Assortment</div>
                    <p>Choose from 5000+ products across food, personal care, household & other categories.</p>
                </div>
            </div>
        </div> */}

          <div className="my-4 grid gap-3">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">Fresh premium quality product.</p>
            </div>
            <div>
              <p className="font-semibold">Unit</p>
              <p className="text-base">1 Unit</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDisplayPage;
