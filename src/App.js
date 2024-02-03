import { useState } from "react";
import Navbar from "./components/navbar";
import { ProductsPage } from "./pages/products";
import Products from "./pages/products";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorMoj from "./pages/ErrorMoj";
import ProductDetail from "./pages/ProductDetail";
import Modal from "./components/modal";
import { ProductContext } from "./libs/context";

function App() {
  const [cardData, setcardData] = useState({ cardList: [] });
  const router = createBrowserRouter([
    {
      element: (
        <div>
          <ProductContext.Provider
            value={{ data: cardData, dispatch: setcardData }}
          >
            <Navbar />
            <Outlet />
            <Modal />
          </ProductContext.Provider>
        </div>
      ),
      path: "/",

      //errorElement: <ErrorMoj />,
      children: [
        {
          element: <ErrorMoj />,
          path: "*",
        },
        {
          element: <ProductsPage />,
          path: "react16/products",
        },
        {
          element: <div className="m-4 text-[17px] font-bold">Home Page</div>,
          path: "react16/Home",
        },
        {
          element: <div></div>,
          path: "react16",
        },
        {
          element: <div className="m-4 text-[17px] font-bold">About</div>,
          path: "react16/about",
        },

        {
          element: (
            <div>
              <Outlet />
            </div>
          ),
          path: "/react16/products/:productId",
          children: [
            {
              element: <ProductDetail />,
              path: "/react16/products/:productId",
            },
            {
              element: <div>Error inside Products URL </div>,
              path: "*",
            },
          ],
        },

        ,
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
