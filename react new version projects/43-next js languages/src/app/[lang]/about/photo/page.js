import Frame from "@/src/components/modal/Frame";

export default function PhotoPage() {
    const photo =
        "https://ghorbany.dev/static/media/avatar.ec0231db6078aebd81c7.jpg";

    return (
        <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto border border-gray-700">
                <Frame photo={photo} />
            </div>
        </div>
    );
}
