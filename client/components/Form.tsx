
"use client"
import ImageUploader from "./ImageUploader";
import { useState, useRef } from "react";
import axios from "axios";


const baseUrl = process.env.HOST
console.log(baseUrl);


export default function Form() {


  const [uploaded, setUploaded] = useState(false)
  const [accessID, setAccessID] = useState<string>("")
  const [secret_AccessKey, setSecret_AccessKey] = useState<string>("")
  type MyFunctionType = (val: boolean) => void;
  const accessKeyIdRef = useRef<HTMLInputElement>(null);
  const secretAccessKeyRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleChange: MyFunctionType = (val) => {
    setUploaded(val)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (accessKeyIdRef.current && secretAccessKeyRef.current) {

      const access_ID = accessKeyIdRef.current.value
      const secret_Access_Key = secretAccessKeyRef.current.value

      const formData = new FormData();
      const file = fileInputRef.current?.files?.[0];

      
      try {
        
        formData.append("data1", access_ID);
        formData.append("data2", secret_Access_Key);
        
        if (file) {
          formData.append('image', file);
          
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/test-form`, formData);

        
        console.log(response.data);
      } catch (error) {
        
        console.error(error);
      }
    }


  }

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




            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <ImageUploader onUpload={handleChange} />
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
