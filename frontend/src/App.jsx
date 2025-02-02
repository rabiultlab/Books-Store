
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import Favorites from "./components/Profile/Favorites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";

const App = () => {
    const dispatch = useDispatch();
    const role = useSelector((state)=> state.auth.role);
    useEffect(()=>{
        if(
            localStorage.getItem("id") &&
            localStorage.getItem("token") &&
            localStorage.getItem("role")
        ){
            dispatch(authActions.Login());
            dispatch(authActions.changeRole(localStorage.getItem("role")));
        }
    },[]);
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />}>
                <Route index element = {<Favorites/>}/>
                <Route path="/profile/orderHistory" element = {<UserOrderHistory
                />}/>
                <Route path="/profile/setting" element = {<Setting
                />}/>
                <Route index element = {<Favorites/>}/>
                </Route>
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/LogIn" element={< LogIn />} />
                <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App