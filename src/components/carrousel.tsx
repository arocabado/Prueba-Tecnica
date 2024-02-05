import { useGet } from "../hook/useGet";
import { useData } from "../Context/data";
import IconArrow from "../icons/iconArrow";
import IconClose from "../icons/iconClose";
import IconHeart from "../icons/iconHeart";
import IconCopy from "../icons/iconCopy";
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
  const {
    images,
    setLikedImages,
    likedImages,
    deleteImages,
    deleteLikedImage,
  } = useData();
  const dataImages = neverEnds ? images : likedImages;
  const [copied, setCopied] = useState<boolean>(false);

  const changeImage = (type: string) => {
    if (type === "prev") {
      setCurrentImage(currentImage - 1);
    }
    if (type === "next" && neverEnds) {
      getData();
      setCurrentImage(currentImage + 1);
    }
    if (type === "next" && !neverEnds) {
      if (currentImage != dataImages.length - 1) {
        setCurrentImage(currentImage + 1);
      }
    }
    if (type === "disliked" && !neverEnds) {
      if (currentImage === dataImages.length - 1) {
        setCurrentImage(currentImage - 1);
      }
      if (likedImages.length === 1) {
        closeCarusel();
      }
    }
  };

  const saveDeleteImage = () => {
    if (
      likedImages.some((data) => data.image === dataImages[currentImage].image)
    ) {
      deleteLikedImage({
        image: dataImages[currentImage].image,
        message: dataImages[currentImage].message,
      });
      changeImage("disliked");
    } else {
      setLikedImages({
        image: dataImages[currentImage].image,
        message: dataImages[currentImage].message,
      });
    }
  };

  const closeCarusel = () => {
    setCarusel(false);
    deleteImages();
    setCurrentImage(0);
  };

  const handleCopiarPortaPapeles = async (valor: string) => {
    await navigator.clipboard.writeText(valor);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full bg-black/[.6] z-20"></div>
      {dataImages.length > 0 && currentImage < dataImages.length && (
        <div
          className="w-3/4 max-w-3xl h-3/4 fixed top-1/2 left-1/2 bg-slate-600 transform -translate-x-1/2 -translate-y-1/2 rounded-xl text-slate-200 z-30"
          style={{
            backgroundImage: `url(https://cataas.com/cat/${dataImages[currentImage].image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between items-center w-full pl-4 pt-2 pr-8">
              <div className="flex gap-5 items-center">
                <button
                  className={`group aspect-square w-11 cursor-pointer hover:text-red-700 ${
                    likedImages.some(
                      (data) => data.image === dataImages[currentImage].image
                    ) && "text-red-600"
                  }`}
                  onClick={saveDeleteImage}
                >
                  <IconHeart />
                  <label className="absolute left-16 top-0 text-lg bg-slate-400/[.8] px-1 rounded-xl hidden group-hover:block">
                    {likedImages.some(
                      (data) => data.image === dataImages[currentImage].image
                    )
                      ? "Quitar"
                      : "Guardar"}
                  </label>
                </button>
                <button
                  className="group aspect-square w-10 cursor-pointer hover:text-slate-300"
                  onClick={() =>
                    handleCopiarPortaPapeles(dataImages[currentImage].message)
                  }
                >
                  <IconCopy />
                  <label className="absolute left-32 top-0 text-lg bg-slate-400/[.8] px-1 rounded-xl hidden group-hover:block text-slate-100">
                    {copied ? "Copiado!" : "Copiar"}
                  </label>
                </button>
              </div>
              <button
                className="aspect-square w-5 cursor-pointer hover:text-red-500"
                onClick={closeCarusel}
              >
                <IconClose />
              </button>
            </div>

            <div className="flex justify-between items-center w-full px-2">
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

            <div className="flex w-full h-1/4 text-slate-50 px-3 text-xl font-bold bg-slate-500/[.6] overflow-auto rounded-xl">
              <label className="w-full h-full flex justify-center">
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
