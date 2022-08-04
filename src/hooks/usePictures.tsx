// Libs
import React, { createContext, useState, useContext, useMemo } from "react";

// Models
import { IPictureInformation } from "models/picture/picture.model";

interface IPicturesContextData {
  pictures: string[];
  setPictures: (pictures: string[]) => void;
  picturesInfo: IPictureInformation[];
  setPicturesInfo: (picturesInfo: IPictureInformation[]) => void;
  croppedPictures: string[];
  setCroppedPictures: (croppedPictures: string[]) => void;
}

// Context
const PicturesContext = createContext<IPicturesContextData>(
  {} as IPicturesContextData
);

// Provider
const UsePicturesProvider: React.FC = ({ children }) => {
  const [croppedPictures, setCroppedPictures] = useState<string[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [picturesInfo, setPicturesInfo] = useState<IPictureInformation[]>([]);

  const value = useMemo(
    () => ({
      croppedPictures,
      setCroppedPictures,
      pictures,
      setPictures,
      picturesInfo,
      setPicturesInfo,
    }),
    [croppedPictures, pictures, picturesInfo]
  );

  return (
    <PicturesContext.Provider value={value}>
      {children}
    </PicturesContext.Provider>
  );
};

// Hook
function usePictures(): IPicturesContextData {
  // Get data from context
  const context = useContext(PicturesContext);

  // If user is not using context provider (DEV purposes only)
  if (!context)
    throw new Error("usePictures must be used within a UsePicturesProvider");

  return context;
}

export { UsePicturesProvider, usePictures };
