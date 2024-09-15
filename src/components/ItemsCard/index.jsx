import React, { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/slices/favouritesItem";
import { fetchApi } from "../../services/helper";

function ItemsCard(props) {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesFromStore = useSelector((state) => state.favourites.wishList);

  useEffect(() => {
    fetchApi(props.apiCategory, setData);
  }, [props.apiCategory]);

  useEffect(() => {
    const initialFavorites = {};
    favoritesFromStore.forEach((item) => {
      initialFavorites[item.id] = true;
    });
    setFavorites(initialFavorites);
  }, [favoritesFromStore]);

  const getRandomDays = useMemo(() => {
    return data.map(() => {
      const randomDays = Math.floor(Math.random() * 30 + 1);
      return `${randomDays} days ago`;
    });
  }, [data]);

  const handleAddItems = (e, item) => {
    e.stopPropagation();
    dispatch(addItem(item));
    setFavorites((prev) => ({
      ...prev,
      [item.id]: true,
    }));
  };

  const handleRemoveItems = (e, item) => {
    e.stopPropagation();
    dispatch(removeItem(item));
    setFavorites((prev) => ({
      ...prev,
      [item.id]: false,
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-2 pt-3 sm:px-6 lg:px-8">
      <h1 className="font-bold pt-4 pb-4 text-xl md:text-2xl">{props.title}</h1>
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-none w-64 sm:w-72 rounded border border-[#d8dfe0] bg-white cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img
                className="w-full h-32 sm:h-48 object-cover"
                src={item.images[0]}
                alt={item.title}
              />
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="font-bold text-lg sm:text-xl mb-2">{`$ ${item.price}`}</div>
                <div>
                  {favorites[item.id] ? (
                    <FaHeart
                      className="w-full h-5"
                      onClick={(e) => handleRemoveItems(e, item)}
                    />
                  ) : (
                    <FaRegHeart
                      className="w-full h-5"
                      onClick={(e) => handleAddItems(e, item)}
                    />
                  )}
                </div>
              </div>
              <div>
                <p className="px-4 text-gray-700 text-sm sm:text-base">
                  {item.title}
                </p>
              </div>
              <div className="px-4 pt-4 pb-2">
                <p className="text-gray-700 text-sm sm:text-base">
                  {item.returnPolicy}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {getRandomDays[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsCard;
