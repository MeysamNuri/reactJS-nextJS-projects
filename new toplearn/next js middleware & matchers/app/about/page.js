import Image from "next/image";
import Link from "next/link";
import logo from '../../public/vercel.svg'
export default async function About() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const photo ="https://roozaneh.net/wp-content/uploads/2019/09/%D8%B9%DA%A9%D8%B3-%D9%85%D9%86%D8%B8%D8%B1%D9%87-8.jpg"
    return (
        <main className="p-5 mt-2 bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-dark rounded mx-auto w-7/12 ">
            <div>
                <div className="text-gray-300  text-center mb-5">
                    <h1 className="text-lg">یونس قربانی</h1>
                    <h2>برنامه نویس و مدرس</h2>
                </div>
                <Link href={`/about/photo`}>
                    <Image
                        alt=""
                        src={photo}
                        height={400}
                        width={400}
                        className="mx-auto rounded object-cover aspect-square"
                    />
                </Link>
            </div>
        </main>
    );
}
