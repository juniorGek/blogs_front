'use client';
import axios from "axios";
import { useEffect } from "react"


function Page() {

    useEffect(() => {
        (async () => {
            let {data} = await axios.get('http://localhost:8990/api/blog/latest')
            const test = process.env.backend_url
            console.log("test................",test)
            
        })()
    }, [])

  return (
    <div className="w-full bg-red-400 h-full " >
      <h1  >
        Test
      </h1>
    </div>
  )
}

export default Page
