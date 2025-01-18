import { useState } from "react";
import Loader from "../components/Loader/Loader";

const Cart = () => {
  const [Cart, setCart] = useState();
  return (
    <>
      {!Cart && <Loader />}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="/EmptyCart.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-center"
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Cart;
