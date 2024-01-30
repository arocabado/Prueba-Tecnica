import { useGet } from "../hook/useGet";
import { useData } from "../Context/data";
import IconArrow from "../icons/iconArrow";
import IconClose from "../icons/iconClose";
import IconHeart from "../icons/iconHeart";
import { useState } from "react";

interface Props {
  setCarusel: React.Dispatch<React.SetStateAction<boolean>>;
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
  neverEnds?: boolean;
}

const Carrousel = ({
  setCarusel,
  currentImage,
  setCurrentImage,
  neverEnds = false,
}: Props) => {
  const { getData } = useGet();
  const { images, setLikedImages, likedImages, deleteImages } = useData();
  const dataImages = neverEnds ? images : likedImages;

  const changeImage = (type: string) => {
    if (type === "prev") {
      setCurrentImage(currentImage - 1);
    }
    if (type === "next" && neverEnds) {
      if (currentImage === dataImages.length - 2) {
        getData();
      }
      setCurrentImage(currentImage + 1);
    }
    if (type === "next" && !neverEnds) {
      if (currentImage != dataImages.length - 1) {
        setCurrentImage(currentImage + 1);
      }
    }
  };
  const closeCarusel = () => {
    setCarusel(false);
    deleteImages();
    setCurrentImage(0);
  };

  const handleCopiarPortaPapeles = async (valor: string) => {
    await navigator.clipboard.writeText(valor);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full bg-black/[.6]"></div>
      {dataImages.length > 0 && currentImage < dataImages.length && (
        <div
          className="w-3/4 h-3/4 fixed top-1/2 left-1/2 bg-slate-500 transform -translate-x-1/2 -translate-y-1/2 rounded-xl text-slate-200"
          style={{
            backgroundImage: `url(https://cataas.com/cat/${dataImages[currentImage].image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div></div>
          <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center w-full pl-4 pt-2 pr-8">
              <button
                className={`aspect-square w-14 cursor-pointer hover:text-red-800 ${
                  likedImages.some(
                    (data) => data.image === dataImages[currentImage].image
                  ) && "text-red-600"
                }`}
                disabled={likedImages.some(
                  (data) => data.image === dataImages[currentImage].image
                )}
                onClick={() =>
                  setLikedImages({
                    image: dataImages[currentImage].image,
                    message: dataImages[currentImage].message,
                  })
                }
              >
                <IconHeart />
              </button>
              <button
                className="aspect-square w-5 text-red-800 cursor-pointer hover:text-red-950"
                onClick={closeCarusel}
              >
                <IconClose />
              </button>
            </div>

            <div className="flex justify-between items-center w-full h-4/6 px-2">
              <button
                className="aspect-square md:w-14 w-10 -rotate-90 bg-slate-700 rounded-full p-2 hover:bg-slate-900 duration-500 cursor-pointer"
                onClick={() => changeImage("prev")}
                disabled={currentImage <= 0}
              >
                <IconArrow />
              </button>
              <button
                className="aspect-square md:w-14 w-10 rotate-90 bg-slate-700 rounded-full p-2 hover:bg-slate-900 duration-500 cursor-pointer"
                onClick={() => changeImage("next")}
              >
                <IconArrow />
              </button>
            </div>

            <div className="flex w-full h-1/4 text-slate-50 px-5 text-xl font-bold items-center justify-center bg-slate-500/[.6]">
              <label
                className="cursor-pointer"
                onClick={() =>
                  handleCopiarPortaPapeles(dataImages[currentImage].message)
                }
              >
                {dataImages[currentImage].message}
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carrousel;
