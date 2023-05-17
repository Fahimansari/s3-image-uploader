import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import  Uploaded from "../components/Uploaded";

interface ImageUploaderProps {
    onUpload: (val : boolean) => void;
  }

export default function ImageUploader({onUpload} : ImageUploaderProps) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0] || undefined;
    console.log("Yes this is success");
    
    setSelectedFile(file || null);
  };
  
  

    return ( <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      {selectedFile? (<Uploaded /> ):( <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span >Upload a file</span>
                      <input id="file-upload" name="file-upload" accept="image/jpeg" type="file" onChange={handleFileChange} className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">JPG up to 10MB</p>
                </div>)
                    }              </div>)
                  }
                
