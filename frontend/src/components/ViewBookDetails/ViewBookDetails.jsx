import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";


const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);
    return (
        <>
            {Data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 lg:flex md:flex-row flex-colgap-8'>
                    <div className=" bg-zinc-800 rounded p-8 lg:w-3/6  flex  items-center justify-center">
                        <img src={Data?.url} alt="/" className="h-[70vh" />
                    </div>
                    <div className='p-4 w-full lg:w-3/6 text-white'>
                        <h1 className="text-4xl text-zinc-300 font-semibold">{Data?.title}</h1>
                        <p className="text-zinc-400 mt-1">by {Data?.author}</p>
                        <p className="text-zinc-500 mt-4">by {Data?.desc}</p>
                        <p className="flex items-center justify-start text-zinc-400 mt-4"><GrLanguage className="me-3" />{Data?.language}</p>
                        <p className="text-zinc-100 mt-4 text-3xl font-semibold">Price : ${Data?.price}{" "}</p>
                    </div>
                </div>
            )}
            {!Data && (
                <div className="flex items-center justify-center bg-zinc-900 h-screen"><Loader />{" "}
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;