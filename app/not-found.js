import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center' >
            <Image src='/404.svg' width={400} height={400} />
            <h2 className='header_2' > 404 Not Found!</h2>
            <Link className='header_4 text-Primary_Color mt-4' href="/">
            Return Home</Link>
        </div>
    )
}