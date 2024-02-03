import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import useAddProduct from "../hooks/GetSimilarproduct";
import Skeleton from "../components/skeleton";
import AsyncHOC from "../HOC/asyncHOC";
import ErrorMoj from "./ErrorMoj";

import { ProductsPage } from "./products";
import { ProductContext } from "../libs/context";

function ProductDetail() {
  const { loading3, data3, err3, getData3 } = useAsync(`products`);
  //console.log("myyyyyy", parseInt(productId));
  const GetMaxx = () => {
    //const maxindexapi2 = data3?.data?.id;

    const maxindexapi2 =
      data3 && data3.data ? Math.max(...data3.data.map((item) => item.id)) : null;
    console.log("hhhhhh", maxindexapi2);
    return maxindexapi2;
  };
  const GetproductId = () => {
    const { productId } = useParams();
    if (data3) {
      console.log("typeeeeeof", Math.ceil(productId));
      const maxindexapi3 = parseInt(GetMaxx());
      console.log("My mazzzzzzzzz", maxindexapi3);
      switch (true) {
        case Math.ceil(productId) >= 1 && Math.ceil(productId) <= maxindexapi3:
          return productId;

        case Math.ceil(productId) < 1 || Math.ceil(productId) > maxindexapi3:
          return null;
        default:
          return null;
      }
    }
  };
  const { loading, data, err, getData } = useAsync(
    `products/${GetproductId()}`
  );

  const { loading2, data2, err2, getData2 } = useAsync(
    `products/${GetproductId()}`
  );

  const location = useLocation();
  console.log("My location:", location);
  console.log("My productId:", GetproductId());

  useEffect(() => {
    getData3();
  }, []);
  useEffect(() => {
    getData();
    getData2();
  }, [data3]);
  const data4=useContext(ProductContext)
  console.log("dataaaaa4",data4);
  //console.log(productId);
  const Rating = (ratingNum) => {
    const ratingList = Array.from(Array(5));

    console.log("roundedrate:", ratingNum);
    return (
      <div className="rating rating-md ">
        {ratingList.map((item, index) => {
          return (
            <input
              key={index}
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-green-500"
              checked={
                parseInt(ratingNum.ratingNum) === index + 1 ? true : false
              }
            />
          );
        })}
      </div>
    );
  };
  {
    console.log("******", GetproductId());
  }

  if (GetproductId() != null)
    return (
      <div>
        <AsyncHOC loading={loading}>
          <div className="card card-side bg-base-100 shadow-xl w-[90%] mx-auto my-8 flex sm:flex-row  flex-col ">
            <figure className="md:w-[100%] lg:w-[80%] my-auto xl:w-[70%] mx-auto sm:scale-75 md:scale-90 lg:scale-75 scale-75">
              <img
                className="  mx-auto"
                src={
                  data2?.data?.images?.[0] ||
                  data2?.data?.images?.[1] ||
                  data2?.data?.images?.[2] ||
                  data2?.data?.category?.image
                }
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {data?.data?.category}</h2>
              <p className="text-justify">
                {" "}
                {data?.data?.description || data2?.data?.description}
                {console.log(".......",data2)}
              </p>
              <div className="card-actions justify-end">
                <h4> ${data2?.data?.price}</h4>
                <br />
                <Rating ratingNum={data?.data?.rating?.rate} />

                {console.log("datanew2:", data2)}
              </div>
              <button className="btn flex w-32 ms-auto btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
          {console.log("datanew2:", typeof GetproductId())}
        </AsyncHOC>
      </div>
    );
  else return <loading2 />;
}

export default ProductDetail;
