import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CartDetails from "./components/CartDetails";
import { useSelector } from "react-redux";

function Layout() {
    const cartTabClicked = useSelector((state) => state.cart.cartTabClicked);

    return (
        <div className="relative flex transition-all duration-300">
            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${
                    cartTabClicked ? "mr-80" : "mr-0"
                }`}
            >
                <Header />
                <Outlet />
                <Footer />
            </main>

            {/* Cart Details (Slide-in from Right) */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    cartTabClicked ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <CartDetails />
            </div>
        </div>
    );
}

export default Layout;
