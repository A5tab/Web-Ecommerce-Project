import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Admin, Home, Login, Signup, Unauthorized, NotFound, Product, Checkout, PaymentFailed, PaymentSuccess, About, Contact, Blog, Services, TermsConditions, FAQ, Privacy } from "./pages/index.js";
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
                path: "/faq",
                element: <FAQ />,
              },
              {
                path: "/terms-conditions",
                element: <TermsConditions />,
              },
              {
                path: "/blog",
                element: <Blog />,
              },
              {
                path: "/services",
                element: <Services />,
              },
              {
                path: "/privacy-policy",
                element: <Privacy />,
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
              <Checkout />
            </Protected>
          },
          {
            path: "/payment-success",
            element: <Protected authentication allowedRoles={['user']}>
              <PaymentSuccess />
            </Protected>
          },
          {
            path: "/payment-failed",
            element: <Protected authentication allowedRoles={['user']}>
              <PaymentFailed />
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
