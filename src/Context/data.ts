import { create } from "zustand";

export interface ImageData {
  image: string;
  message: string;
}

interface State {
  images: ImageData[];
  setImages: (data: ImageData) => void;
  deleteImages: () => void;
  likedImages: ImageData[];
  setLikedImages: (data: ImageData) => void;
  deleteLikedImage: (deleteImage: ImageData) => void;
}

export const useData = create<State>((set) => {
  const storedLikedImages = JSON.parse(
    localStorage.getItem("likedImages") || "[]"
  );

  return {
    images: [],
    setImages: (newImageData) => {
      set((old) => {
        const updatedImages = [...old.images, newImageData];
        return { ...old, images: updatedImages };
      });
    },
    deleteImages: () => set((old) => ({ ...old, images: [] })),
    likedImages: storedLikedImages,
    setLikedImages: (newLikedImage) => {
      set((old) => {
        const updatedLikedImages = [...old.likedImages, newLikedImage];
        localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
        return { ...old, likedImages: updatedLikedImages };
      });
    },
    deleteLikedImage: (deleteImage) => {
      set((old) => {
        const newLikedImages = old.likedImages.filter(
          (image) => image.image !== deleteImage.image
        );
        localStorage.setItem("likedImages", JSON.stringify(newLikedImages));
        return { ...old, likedImages: newLikedImages };
      });
    },
  };
});
