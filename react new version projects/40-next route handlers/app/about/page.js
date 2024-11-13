import Image from "next/image";
import Link from "next/link";

export default async function About() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const photo =
        "https://rosepack.com/wp-content/uploads/2024/01/3584588.jpg";

    return (
        <main className="p-5 mt-2 bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-dark rounded mx-auto w-7/12 ">
            <div>
                <div>
                    <h1 className="text-lg">میثم</h1>
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
