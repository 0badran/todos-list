export default function Loading() {
   const shapes = [
      "w-1/12",
      "w-2/12",
      "w-3/12",
      "w-4/12",
      "w-5/12",
      "w-6/12",
      "w-7/12",
      "w-8/12",
      "w-9/12",
      "w-10/12",
      "w-11/12",
      "w-full",
   ]

   return (
      <div role="status" className="animate-pulse">
         {
            shapes.map((width, index) => (
               <div key={index} className={`${width} h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4`} />
            ))
         }
         <span className="sr-only">Loading...</span>
      </div>
   )
}