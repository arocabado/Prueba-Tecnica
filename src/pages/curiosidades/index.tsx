import { useData } from "../../Context/data";
import { useState, useEffect } from "react";
import Carrousel from "../../components/carrousel";
import { ImageData } from "../../Context/data";
import IconNotFound from "../../icons/iconNotFound";

const Curiosidades = () => {
  const { likedImages } = useData();
  const [dataDisplay, setDataDisplay] = useState<ImageData[] | []>(likedImages);
  const [caruselState, setCaruselState] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const filterData = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.value === "") {
      setDataDisplay(likedImages);
    } else {
      const patron = new RegExp(`^${value.target.value}`, "i");

      setDataDisplay(
        likedImages.filter((data) =>
          patron.test(data.message.split(" ")[0].toLocaleLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setDataDisplay(likedImages);
  }, [likedImages]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-700">
      <div className="flex py-4 justify-center">
        <input type="text" onChange={(e) => filterData(e)} />
      </div>
      {likedImages.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center pt-[8%] gap-4 text-slate-300 px-2">
          <div className="aspect-square w-36">
            <IconNotFound />
          </div>
          <label className="text-3xl">No se tienen elementos guardados</label>
        </div>
      ) : (
        <div className="w-full h-full flex gap-5 flex-wrap flex-row items-start px-2 py-4 justify-center">
          {dataDisplay.map((data, i) => (
            <div
              className="aspect-square sm:w-48 w-3/4 p-2 hover:sm:w-52 transition-all duration-500 relative"
              key={data.image}
            >
              <img
                src={`https://cataas.com/cat/${data.image}`}
                className="h-full w-full hover:opacity-50 transition-all duration-500 object-cover rounded-2xl"
                onClick={() => {
                  setCaruselState(!caruselState);
                  setCurrentImage(i);
                }}
              />
              <label className="absolute top-1 left-1/2 -translate-x-1/2 text-xl text-slate-200">
                {data.message.split(" ")[0]}
              </label>
            </div>
          ))}
          {caruselState && (
            <Carrousel
              currentImage={currentImage}
              setCarusel={setCaruselState}
              setCurrentImage={setCurrentImage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Curiosidades;
