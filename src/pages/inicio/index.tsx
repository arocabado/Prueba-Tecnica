import Cat from "../../assets/cat.jpg";
import Carrousel from "../../components/carrousel";
import { useState } from "react";


const Inicio = () => {
  const [caruselState, setCaruselState] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <div
      className="w-full h-full relative text-slate-200"
      style={{
        backgroundImage: `url(${Cat})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(57, 68, 83, 1) 45%, rgba(71, 85, 105, .7) 75%, rgba(81, 98, 120, .4) 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center md:w-3/4 lg:w-2/4 h-full w-full gap-2">
          <label className="font-bold sm:text-4xl xl:text-5xl text-3xl">
            Datos curiosos sobre gatos
          </label>
          <label className="text-lg">
            Generador de imágenes y datos curiosos sobre gatos
          </label>
          <button
            className="bg-sky-700 rounded-2xl h-8 w-[70%] hover:bg-sky-800 focus:outline-none text-lg font-bold"
            onClick={() => setCaruselState(!caruselState)}
          >
            Nueva curiosidad
          </button>
        </div>
      </div>
      <div className="absolute right-40 top-9">
        {caruselState && <Carrousel setCarusel={setCaruselState} currentImage={currentImage} setCurrentImage={setCurrentImage} neverEnds={true}/>}
      </div>
    </div>
  );
};

export default Inicio;
