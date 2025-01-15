import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavorite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  
  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 lg:flex lg:flex-row flex-col gap-8">
          <div className="w-full lg:w-3/6 gap-2">
            {" "}
            <div className="bg-zinc-800 p-4 lg:p-12 rounded flex flex-col lg:flex-row justify-around gap-8">
              <img src={Data?.url} alt="/" className="lg:h-[70vh] md:w-full" />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row gap-4 lg:flex-col lg:mt-0 lg:justify-start justify-between">
                  <button
                    className="bg-white rounded lg:rounded-full Text-3xl p-3 text-red-500 flex items-center justify-center"
                    onClick={handleFavorite}
                  >
                    <FaHeart />{" "}
                    <span className="ms-4 block lg:hidden">Favorites</span>
                  </button>
                  <button
                    className="text-white rounded mt-8 md:mt-0 lg:rounded-full Text-3xl p-3 bg-blue-500 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />{" "}
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
            </div>
            {isLoggedIn === true && role === "admin" && (
              <div className="flex flex-col md:flex-row gap-4 lg:flex-col lg:mt-0 lg:justify-start justify-between">
                <button className="bg-white rounded lg:rounded-full Text-3xl p-3 flex items-center justify-center">
                  <FaEdit /> <span className="ms-4 block lg:hidden">Edit</span>
                </button>
                <button className="text-red-500 rounded mt-8 md:mt-0 lg:rounded-full Text-3xl p-3 bg-white flex items-center justify-center">
                  <MdOutlineDelete />
                  <span className="ms-4 block lg:hidden">Delete Book</span>
                </button>
              </div>
            )}
          </div>
          <div className="p-4 w-full lg:w-3/6 text-white">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data?.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data?.author}</p>
            <p className="text-zinc-500 mt-4">by {Data?.desc}</p>
            <p className="flex items-center justify-start text-zinc-400 mt-4">
              <GrLanguage className="me-3" />
              {Data?.language}
            </p>
            <p className="text-zinc-100 mt-4 text-3xl font-semibold">
              Price : ${Data?.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="flex items-center justify-center bg-zinc-900 h-screen">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
