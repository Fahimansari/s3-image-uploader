//Package Imports
"use client"
import { useState, useRef } from "react";
import axios from "axios";

//Function and Variable Imports
import ImageUploader from "./ImageUploader";
import S3RegionKeywords from "./values";

const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME
const PORT = process.env.NEXT_PUBLIC_PORT
const baseUrl = `http://${HOSTNAME}:${PORT}`


export default function Form() {

  const [uploaded, setUploaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  type MyFunctionType = (val: boolean) => void;
  const accessKeyIdRef = useRef<HTMLInputElement>(null);
  const secretAccessKeyRef = useRef<HTMLInputElement>(null);
  const bucketNameRef = useRef<HTMLInputElement>(null)
  const regionNameRef = useRef<HTMLSelectElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);
  




/////                  Event-Handling Functions Starts Here               /////

  const handleChange: MyFunctionType = (val) => {
    setUploaded(val)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (accessKeyIdRef.current && secretAccessKeyRef.current && bucketNameRef.current && regionNameRef.current) {

      const access_ID = accessKeyIdRef.current.value
      const secret_Access_Key = secretAccessKeyRef.current.value
      const bucket_Name = bucketNameRef.current.value
      console.log(`Hy From ${regionNameRef.current.value} \n ${accessKeyIdRef.current.value} \n ${bucketNameRef.current.value} \n ${secretAccessKeyRef.current.value}`);
      
      const formData = new FormData();
      
      
      const file = selectedFile
      console.log(`This is ${file?.name}`);

      try {
        
        formData.append("data1", access_ID);
        formData.append("data2", secret_Access_Key);
        
        if (file){ 
          formData.append('image', file);
          console.log(`Dit it reach here?`);
          console.log(baseUrl);
          
        }
          
        const response = await axios.post(`${baseUrl}/test-form`, formData);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /////                  Event-Handling Functions Ends Here               /////


  return (
    <form className="flex justify-center items-center h-screen">
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">


          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Access ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input ref={accessKeyIdRef}
                    type="text"
                    name="website"
                    id="website"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Access ID here"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Secret Access Key
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input
                    type="password"
                    name="access-key"
                    id="access-key" ref={secretAccessKeyRef}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Secret Access Key here"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Bucket Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input
                    type="password"
                    name="access-key"
                    id="access-key" ref={bucketNameRef}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Secret Access Key here"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Region
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  ref={regionNameRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">-- Select Region --</option>
        {S3RegionKeywords.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <ImageUploader onUpload={handleChange} selectedFile = {selectedFile} setSelectedFile={setSelectedFile} fileInputRef={fileInputRef}/>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit" onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

