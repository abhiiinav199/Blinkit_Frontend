import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "../utils/axios";
import { SummaryApi } from "../common/SummaryApi";
import { useEffect } from "react";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import ValidUrlConvert from "../utils/ValidUrlConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalPage, settotalPage] = useState(1);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([])

  const params = useParams();
  const { category, subCategory } = params;
  const allSubCategory = useSelector((state)=>state?.product?.allSubCategory)

  const categoryId = category.split("-").slice(-1)[0];
  const subCategoryId = subCategory.split("-").slice(-1)[0];

  const subCategoryNameSplit = subCategory.split("-");
  const subCategoryName = subCategoryNameSplit
    ?.slice(0, subCategoryNameSplit?.length - 1)
    .join(" ");

  const fetchProductByCategoryAndSubCategory = async () => {
    try {
      setloading(true);
      const res = await axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      });

      const { data: responseData } = res;
      if (responseData?.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          // setData([...data, ...responseData.data])
          setData((prev) => [...prev, ...responseData.data]);
        }
        settotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchProductByCategoryAndSubCategory();
  }, [params]);

  useEffect(() =>{
    const subCategoryList = allSubCategory?.filter(s =>{
      const filterData = s?.category?.some(el => el?._id === categoryId)
      return filterData ? filterData : null
    })
    const sub = subCategoryList?.sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt));
    setDisplaySubCategory(sub || [])
  },[params,allSubCategory])

  return (
    <section className="min-h-[78vh] mt-3 sm:mt-0 sticky top-26 lg:top-20">
      <div className="container sticky top-26 mx-auto grid grid-cols-[80px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sub Category */}
          <div className=' min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
            {
              DisplaySubCategory.map((s, index) => {
                 const link = `/${ValidUrlConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${ValidUrlConvert(s.name)}-${s._id}`
                return (
                  <Link to={link} key={index+"s"+s._id} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                    hover:bg-green-100 cursor-pointer
                    ${subCategoryId === s._id ? "bg-green-100" : ""}
                  `}
                  >
                    <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                      <img
                        src={s.image}
                        alt='subCategory'
                        className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                      />
                    </div>
                    <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                  </Link>
                )
              })
            }
          </div>

        {/* Product */}
        <div className=" sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3>{subCategoryName}</h3>
          </div>

          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4  '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
           </div>
        </div>


        {loading && <Loading />}
      </div>
    </section>
  );
};

export default ProductListPage;
