import Image from "next/image";

export default function Frame({ photo }) {
    return (
        <>
            <Image
                alt=""
                src={photo}
                height={600}
                width={600}
                className="w-full object-cover aspect-square col-span-2"
            />
        </>
    );
}
