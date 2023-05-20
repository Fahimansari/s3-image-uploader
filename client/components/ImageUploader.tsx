import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState, RefObject } from "react";
import Uploaded from "../components/Uploaded";

interface ImageUploaderProps {
  onUpload: (val: boolean) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  fileInputRef: RefObject<HTMLInputElement>;

}

export default function ImageUploader({ onUpload, selectedFile, setSelectedFile, fileInputRef }: ImageUploaderProps) {


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Yes this is success");

    setSelectedFile(fileInputRef.current?.files?.[0] || null);
    console.log(selectedFile);
    
  };



  return (<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    {selectedFile ? (<Uploaded name = {selectedFile.name} size= {selectedFile.size}/>) : (<div className="text-center">
      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
      <div className="mt-4 flex text-sm leading-6 text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span >Upload a file</span>
          <input id="file-upload" name="file-upload" accept="image/jpeg" type="file" onChange={handleFileChange} ref={fileInputRef} className="sr-only" />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs leading-5 text-gray-600">JPG up to 10MB</p>
    </div>)
    }              </div>)
}

