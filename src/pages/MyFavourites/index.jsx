import React, { useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../../redux/slices/favouritesItem";
import PageWrapper from "../../components/PageWrapper";
import Categories from "../../components/Categories";

const MyFavourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.favourites.wishList);

  const handleRemoveItems = (e, item) => {
    e.stopPropagation();
    dispatch(removeItem(item));
  };

  const getRandomDays = useMemo(() => {
    return cart.map(() => {
      const randomDays = Math.floor(Math.random() * 30 + 1);
      return `${randomDays} days ago`;
    });
  }, []);

  return (
    <>
      <PageWrapper>
        <Categories />
        <div className="mx-auto max-w-7xl w-full px-2 pt-3 sm:px-6 lg:px-8">
          <h1 className="font-bold pt-4 pb-4 text-2xl">
            Favourites & Saved searches
          </h1>
          <div className="grid grid-cols-4 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex-none w-72 rounded border border-[#d8dfe0] bg-white cursor-pointer"
                style={{ minWidth: "280px" }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={item.images[0]}
                  alt={item.title}
                />
                <div className="px-4 py-2 flex items-center justify-between">
                  <div className="font-bold text-xl mb-2">{`$ ${item.price}`}</div>
                  <div onClick={(e) => handleRemoveItems(e, item)}>
                    <FaHeart className="w-full h-5" />
                  </div>
                </div>
                <div className="px-4">
                  <p className="text-gray-700 text-base">{item.title}</p>
                  <p className="text-gray-700 text-base">{item.returnPolicy}</p>
                  <p className="text-gray-700 text-base">
                    {getRandomDays[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default MyFavourites;
