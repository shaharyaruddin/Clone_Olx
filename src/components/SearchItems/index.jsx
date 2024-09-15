import axios from "axios";
import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { IoIosCall } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

const SearchInput = () => {
  const [data, setData] = useState([]);
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://dummyjson.com/products?limit=500";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.products);

        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="flex justify-center items-center mt-16">
        {loading && <Loader />}
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto md:max-w-7xl">
        {data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          data
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row h-auto md:h-52 border shadow-md my-6 rounded-md cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-full md:w-[35%] h-52 md:h-full overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt="Product Image"
                    className="w-full h-full object-cover md:object-contain"
                  />
                </div>
                <div className="w-full md:w-[65%] flex flex-col p-4 md:p-5 justify-between">
                  <div className="flex justify-between items-center">
                    <p className="text-lg md:text-2xl font-bold">
                      ${item.price}
                    </p>
                    <p className="text-2xl mr-5">
                      <FaRegHeart className="w-full h-5" />
                    </p>
                  </div>
                  <p className="text-base md:text-xl font-semibold mt-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    <button className="flex items-center gap-2 border-2 rounded-md px-4 py-2 text-base border-gray-800 font-semibold hover:bg-gray-100 transition duration-300">
                      <IoIosCall className="text-lg md:text-2xl" />
                      Call
                    </button>
                    <button className="flex items-center gap-2 border rounded-md px-4 text-base bg-gray-800 text-white p-1 font-semibold">
                      <IoChatbubbleEllipsesOutline className="text-lg md:text-2xl" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center text-gray-600 mt-6">
            <p>No product Found</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default SearchInput;
