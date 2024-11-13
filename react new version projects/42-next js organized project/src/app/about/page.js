import Image from "next/image";
import Link from "next/link";

export default async function About() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const photo =
        "https://ghorbany.dev/static/media/avatar.ec0231db6078aebd81c7.jpg";

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
