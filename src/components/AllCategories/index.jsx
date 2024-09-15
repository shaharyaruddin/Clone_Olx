import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allCategoriesWithImages } from "../../common/categories";

export default function AllCategories() {

  const navigate = useNavigate();


  return (
    <div>
      <div className="pt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h1 className="font-bold pt-4 pb-4 text-2xl">All categories</h1>
        <div
          className="flex md:grid md:grid-cols-9 overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 md:gap-6 items-start"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allCategoriesWithImages.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:flex-shrink flex flex-col items-center w-20 hover:cursor-pointer"
            >
              <div
                className="w-14 md:w-24"
                onClick={() => navigate(`/category/${item.apiCategory}`)}
              >
                <img src={item.icon} className="w-full" alt={item.title} />
              </div>
              <h2 className="text-center text-[13px] md:text-[16px] md:font-semibold">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
