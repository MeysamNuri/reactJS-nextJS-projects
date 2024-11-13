import localFont from "next/font/local";

const vazir = localFont({
  variable: "--font-vazirmatn",
  src:  "./fonts/Vazir.woff2",
  display: "swap",
});
export const metadata = {
  title: {
    default: "میثم اپ",
    template: "%s | میثم اپ"
  },
  description: 'آموزش نکست',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir='rtl'>
      <head>
        <link href="" rel="stylesheet"/>
      </head>
      <body className={`${vazir.variable}`}>{children}</body>
    </html>
  )
}
