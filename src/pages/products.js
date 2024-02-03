import { useCallback, useEffect } from "react";
import useAsync from "../hooks/useAsync";
import { navbarLinks } from "../libs/constants";
import Skeleton from "../components/skeleton";
import ProductComponent from "../components/ProductComponent";
import AsyncHOC from "../HOC/asyncHOC";
import useFilter from "../hooks/useFilter";
import { debounce } from "lodash";

export function ProductsPage() {
  const { onChangeFilter, parseUrl } = useFilter();
  const { loading2, data2, error2, getData2 } = useAsync(
    "products?offset=0&limit=10"
  );
  const getDataWithDebounce = useCallback(
    debounce(() => {
      console.log("hiiii");
      getData2(window.location.search);
    }, 1000),
    []
  );
  useEffect(() => {
    getDataWithDebounce();
  }, [window.location.search]);

  //console.log("data2:",data2);
  return (
    <div className="flex flex-wrap justify-around ">
      <div className="w-[100%] block text-center my-4">
        <input
          type="search"
          onChange={(e) => {
            onChangeFilter("search", e.target.value);
          }}
          placeholder="Product Name..."
          className="input input-bordered input-warning max-w-xs text-[10px] sm:text-[14px] w-[60%] h-8"
        />
      </div>

      <AsyncHOC loading={loading2}>
        {data2?.data?.map((item) => {
          return <ProductComponent {...item} key={item.id} />;
        })}
      </AsyncHOC>
      <div className="w-[100%] block text-center my-4">
        <div className="join">
          {Array.from(Array(5)).map((item, index) => (
            // console.log("ddddd");
            <button
              onClick={() => {
                onChangeFilter("page", index + 1);
              }}
              className="join-item btn btn-md"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
