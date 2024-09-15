import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import Slider from "../../components/Slider";
import Categories from "../../components/Categories";
import { API_URL } from "../../services/helper";
import PageWrapper from "../../components/PageWrapper";
import Loader from "../../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [id]);

  const getRandomDays = useMemo(() => {
    const randomDays = Math.floor(Math.random() * 30 + 1);
    return `${randomDays} days ago`;
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">
          <Loader />
        </p>
      </div>
    );
  }

  return (
    <>
      <PageWrapper>
        <Categories />
        <Slider images={data.images} />
        <div className="pt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="border w-full lg:w-2/3 p-4 rounded-md ">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-4xl font-bold">{`$${data.price}`}</h3>
              <div>
                <FaRegHeart className="w-full h-5" />
              </div>
            </div>
            <div className="pt-4 flex flex-row items-center justify-between">
              <h1 className="text-xl font-semibold">{data.title}</h1>
              <p>{getRandomDays}</p>
            </div>
          </div>

          <div className="border  w-full lg:w-2/3 p-4 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-left  ">Details</h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex justify-between">
                <span className="">Available Status</span>
                <span className="font-bold">{data.availabilityStatus}</span>
              </div>
              <div className="flex justify-between ">
                <span className="">Brand</span>
                <span className="font-bold">{data.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Price</span>
                <span className="font-bold">$ {data.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Condition</span>
                <span className="font-bold">New</span>
              </div>
            </div>
          </div>

          <div className="border  w-full lg:w-2/3 p-4 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-left  ">Description</h1>

            <div className="">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ProductDetail;
