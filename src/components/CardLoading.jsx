import React from "react";

const CardLoading = () => {
  return (
    <div  className="border p-4 grid gap-3 max-w-32 lg:max-w-52 rounded animate-pulse ">
      {/* 1st Image Section */}
      <div className="min-h-14 lg:min-h-20 bg-blue-50  rounded "></div>

      {/* 2nd Title Section */}
      <div className="p-2 lg:p-3 w-20 bg-blue-50  rounded"></div>

      {/* 3rd Price Section */}
      <div className="p-2 lg:p-3 bg-blue-50  rounded "></div>

      <div className="p-2 lg:p-3 w-14 bg-blue-50  rounded"></div>

      <div className="flex items-center justify-between gap-3">
         <div className="p-2 lg:p-3 w-20 bg-blue-50  rounded"></div>
          <div className="p-2 lg:p-3 w-20 bg-blue-50 rounded"></div>
      </div>
    </div>
  );
};

export default CardLoading;
