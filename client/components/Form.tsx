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
  

  const ACCESS_ID = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
  const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME;

/////                  Event-Handling Functions Starts Here               /////

  const handleChange: MyFunctionType = (val) => {
    setUploaded(val)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!(accessKeyIdRef.current?.value && secretAccessKeyRef.current?.value && bucketNameRef.current?.value && regionNameRef.current?.value && selectedFile)) {
      alert("You have missed to fill a field")
    console.log(accessKeyIdRef);
    
    }

    
    
    if (accessKeyIdRef.current?.value && secretAccessKeyRef.current?.value && bucketNameRef.current?.value && regionNameRef.current?.value && selectedFile) {

      const access_ID = accessKeyIdRef.current.value;
      const secret_Access_Key = secretAccessKeyRef.current.value;
      const bucket_Name = bucketNameRef.current.value;
      const region_Name = regionNameRef.current.value;
      const file = selectedFile;

      const formData = new FormData();
      

      

      try {
        
              formData.append("access_ID", access_ID);
              formData.append("secret_Access_Key", secret_Access_Key);
              formData.append("bucket_Name", bucket_Name);
              formData.append("region_Name", region_Name);
        file? formData.append('image', file): {}          
          
      
          const response = await axios.post(`${baseUrl}/upload`, formData);
        

        
// console.log(response.status);

      } catch (error : any) {
        console.log(`We reached here`);
        
        console.error(error.response.data);
        
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
                    defaultValue={ACCESS_ID}
                    required
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
                    name="secret-access-key"
                    id="secret-access-key" ref={secretAccessKeyRef}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Secret Access Key here"
                    defaultValue={SECRET_ACCESS_KEY}
                    required
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
                    type="text"
                    name="bucket-name"
                    id="bucket-name" ref={bucketNameRef}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Bucket Name here"
                    defaultValue={BUCKET_NAME}
                    required
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
                  required
                >
                  <option key= "ap-south-1" value="ap-south-1">ap-south-1</option>
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

