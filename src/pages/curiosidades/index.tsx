import { useData } from "../../Context/data";
import { useState } from "react";
import Carrousel from "../../components/carrousel";

const Curiosidades = () => {
  const { likedImages } = useData();
  const [caruselState, setCaruselState] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <div className="bg-slate-700 w-full h-full flex gap-5 flex-wrap flex-row items-start px-2 py-4 justify-center">
      {likedImages.map((data, i) => (
        <div
          className="aspect-square sm:w-48 w-3/4 pt-0 pb-5 px-5"
          key={data.image}
        >
          <img
            src={`https://cataas.com/cat/${data.image}`}
            className="h-full w-full hover:opacity-50 transition-all duration-500 object-cover"
            onClick={() => {setCaruselState(!caruselState); setCurrentImage(i)}}
          />
        </div>
      ))}
      {caruselState && <Carrousel currentImage={currentImage} setCarusel={setCaruselState} setCurrentImage={setCurrentImage}/>}
    </div>
  );
};

export default Curiosidades;
