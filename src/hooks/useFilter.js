import React from "react";
import { useSearchParams } from "react-router-dom";

export default function useFilter() {
  const AND_SIGN = "&";
  const EQUAL_SIGN = "=";
  const ARRAY_SEPARATOR = "+";
  const [search, setSearch] = useSearchParams();
  //const url="?search=samsung+apple&off=true"
  const parseUrl = (url) => {
    if(!url)
    return {}
    return url
      ?.slice(1)
      ?.split(AND_SIGN)
      ?.reduce((acc, curr, index) => {
        const separated = curr?.split(EQUAL_SIGN);
        console.log("Mycur", curr, separated);
        return {
          ...acc,
          [separated?.[0]]: separated?.[1]?.split(ARRAY_SEPARATOR),
        };
      }, {});
  };
  const stringifyUrl = (data) => {
    if(!data)
    return ''
    return Object.entries(data).reduce((acc, curr, index) => {
      const isAtEnd = index + 1 === Object.keys(data)?.length;
      console.log("strigfy:",curr);
      return (
        acc +
        curr?.[0] +
        EQUAL_SIGN +
        curr?.[1]?.join(ARRAY_SEPARATOR) +
        (!isAtEnd ? AND_SIGN : "")
      );
    }, "?");
  };
  const onChangeFilter = (name, value) => {
    const url = window.location.search;
    const parsedUrl = parseUrl(url || "");
    console.log("pppppp", parsedUrl);
   if (value!=='')
    {parsedUrl[name] = [value];}
else delete parsedUrl[name];
    setSearch(stringifyUrl(parsedUrl));
  };
  return { parseUrl, stringifyUrl, onChangeFilter };
}
