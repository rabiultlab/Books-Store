import axios from "axios";
import { Link } from "react-router-dom";

const BookCard = ({ data, favorite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id, 
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-700 p-4 rounded flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh] rounded" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold text-xl">
            by {data.author}
          </p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            Price : ${data.price}
          </p>
        </div>
      </Link>
      {favorite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favorite
        </button>
      )}
    </div>
  );
};

export default BookCard;
