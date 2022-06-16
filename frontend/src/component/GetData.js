import axios from "axios";
import { useCallback, useEffect } from "react";

const API = "http://localhost:5000/api/product/";

const GetData = ({ setData }) => {
  const response = useCallback(() => {
    axios.get(API).then((res) => {
      const result = res.data;
      setData(result);
    });
  }, [setData]);

  useEffect(() => {
    response();
    console.log('update');
  }, [response,]);
};

export default GetData;
