import Frame from "../components/frame";

export default function PhotoPage() {
    const photo =
        "https://rosepack.com/wp-content/uploads/2024/01/3584588.jpg";

    return (
        <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto border border-gray-700">
                <Frame photo={photo} />
            </div>
        </div>
    );
}
