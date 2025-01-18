import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favorites = () => {
  const [FavoriteBooks, setFavoriteBooks] = useState();
  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favorite-books",
        { headers }
      );
      setFavoriteBooks(response.data.data);
    };
    fetch();
  }, [FavoriteBooks]);

  return (
    <>
      {FavoriteBooks && FavoriteBooks.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 h-[100%] flex flex-col items-center justify-center w-full">
          No Favorite Books
          <img src="./Bookmark.png" alt="BookMark" className="h-[20vh] my-8"/>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavoriteBooks &&
          FavoriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favorite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favorites;
