import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Quiz App",
        template: "Quiz App | %s",
    },
};

//MetadataApi

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
