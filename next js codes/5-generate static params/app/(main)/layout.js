import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
  default:"گروه میثم اپ",
  template:"%s | میثم اپ"
  },
  description: 'آموزش نکست',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir='rtl'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}