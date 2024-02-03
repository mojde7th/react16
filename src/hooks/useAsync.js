import axios from "axios";
import { useState } from "react";
import { BASE_URL,BASE_URL2 } from "../libs/constants";

function useAsync(suburl, method = "GET") {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState(undefined);
  const [err2, setErr2] = useState(undefined);
  const [loading3, setLoading3] = useState(false);
  const [data3, setData3] = useState(undefined);
  const [err3, setErr3] = useState(undefined);
  function getData() {
    setLoading(true);
    axios({
      url: `${BASE_URL}${suburl}`,
      method,
      //params: { limit: 5 },
    })
      .then((res) => {
        //console.log(res.data);
        setData(res);
        setLoading(false);
      })
      .catch((er) => {
       // console.log("errrrr:", er || `can't get data`);
        setErr(er);
        setLoading(false);
      })
      .finally(() => {
        console.log("Succefully finished");
      });
  }
  function getData2(params) {
    setLoading2(true);
    axios({
      url: `${BASE_URL2}${suburl}${params}`,
      method,
       
    })
      .then((res) => {
        console.log(res.data);
        setData2(res);
       setLoading2(false);
      })
      .catch((er) => {
       // console.log("errrrr:", er || `can't get data`);
        setErr2(er);
        setLoading2(false);
      })
      .finally(() => {
        console.log("Succefully finished");
      });
  }
  function getData3() {
    setLoading(true);
    axios({
      url: `${BASE_URL2}${suburl}`,
      method,
      //params: { limit: 5 },
    })
      .then((res) => {
        console.log(res.data);
        setData3(res);
        setLoading3(false);
      })
      .catch((er) => {
       // console.log("errrrr:", er || `can't get data`);
        setErr3(er);
        setLoading3(false);
      })
      .finally(() => {
        console.log("Succefully finished");
      });
  }
 
  return {
    loading,
    data,
    err,
    getData,
    loading2,
    data2,
    err2,
    getData2,
    loading3,
    data3,
    err3,
    getData3,
  };
}

export default useAsync;
