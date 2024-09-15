import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../services/helper';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../redux/slices/favouritesItem';
import PageWrapper from '../../components/PageWrapper';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import Loader from '../../components/Loader';

const CategoryPage = () => {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios
          .get(`${API_URL}category/${id}?limit=4&skip=${page}`)
          .then((response) => {
            setData(response.data);
            setLoading(false);
          });
      } catch (err) {
        console.log("error:", err);
        setLoading(false);
      }
    };
    fetchData();

    // Clean-up function
    return () => {
      setLoading(false);
    };
  }, [id, page]);

  console.log("total", data.total);

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
    <PageWrapper>
      {loading ? (
        <div className="flex min-h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto md:max-w-7xl">
          {data.products.map((item, index) => (
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
                  <p className="text-lg md:text-2xl font-bold">${item.price}</p>
                  <button onClick={(e) => favorites[item.id] ? handleRemoveItems(e, item) : handleAddItems(e, item)} className="text-2xl">
                    {favorites[item.id] ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
                <p className="text-base md:text-xl font-semibold mt-2">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="flex gap-3 justify-center md:justify-start mt-3">
                  <button className="flex items-center gap-2 border-2 rounded-md px-4 py-2 text-base border-gray-800 font-semibold hover:bg-gray-100 transition duration-300">
                    <IoIosCall className="text-lg md:text-2xl" />
                    Call
                  </button>
                  <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-base bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300">
                    <IoChatbubbleEllipsesOutline className="text-lg md:text-2xl" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage} data={data} />
    </PageWrapper>
  );
};

export default CategoryPage;
