import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Admin, Home, About, Contact, Login, Signup, Unauthorized, NotFound, Product } from "./pages/index.js";
import Layout from "./Layout.jsx";
import Protected from "./components/AuthLayout.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import { ProductsProvider } from "./context/ProductsProvider.jsx";
import { AdminProductsProvider } from "./context/AdminProductsProvider.jsx"


const ProductsProviderWrapper = () => {
  return (
    <ProductsProvider>
      <Outlet />
    </ProductsProvider>
  )
};

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/signup",
        element: <Protected authentication={false}>
          <Signup />
        </Protected>,
      },
      {
        path: "/login",
        element: <Protected authentication={false}>
          <Login />
        </Protected>,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <ProductsProviderWrapper />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/home",
                element: <Home />,
              },
              {
                path: "/about",
                element: <About />,
              },
              {
                path: "/contact",
                element: <Contact />,
              },
              {
                path: "/product/:productId",
                element: <Product />,
              },
            ]
          },
          {
            path: "/unauthorized",
            element: <Unauthorized />
          },
          {
            path: '*',
            element: <NotFound />
          },
          // {
          // element: <PersistLogin />,
          // children: [
          {
            path: "/admin",
            element:
              <Protected authentication={true} allowedRoles={['admin']}>
                <AdminProductsProvider>
                  <Admin />
                </AdminProductsProvider>
              </Protected>
          },
          {
            path: "/checkout",
            element: <Protected authentication allowedRoles={['user']}>
              <h1>Checkout </h1>
            </Protected>
          },
          {
            path: "/orders",
            element: <Protected authentication allowedRoles={['user']}>
              <h1>Orders Page is auth protected</h1>
            </Protected>
          },
          // ]
          // }

        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
