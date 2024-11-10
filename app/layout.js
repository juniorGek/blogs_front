// "use client"
import Providers from '@/providers'
import './../globals.scss'
// import UserContext from '@/context/user'

export const metadata = {
  title: 'Futurx',
  description: '',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='overflow-x-hidden'>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  )
}
