import { PhotoIcon } from '@heroicons/react/24/solid'
interface   NotUploadedProps    {
    name: string,
    size: number
}
export default function NotUploaded({name, size} : NotUploadedProps) {
    return ( <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                 Uploaded {name} {`[Size: ]`} : {size/1024} KB
              </div>
)}