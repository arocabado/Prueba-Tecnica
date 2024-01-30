import { useEffect } from "react";
import { useData } from "../Context/data";

interface ReturnValues {
  getData: () => void;
}

export const useGet = (): ReturnValues => {
  const { setImages } = useData();

  const getData = async () => {
    try {
      const imageResponse = await fetch("https://cataas.com/cat?json=true");
      const imageJson = await imageResponse.json();
      const factResponse = await fetch("https://catfact.ninja/fact");
      const factJson = await factResponse.json();
      setImages({ image: imageJson._id, message: factJson.fact });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    getData,
  };
};
