import Frame from "@/src/components/modal/Frame";
import Modal from "@/src/components/modal/Modal";

export default function PhotoModal() {
    const photo =
        "https://ghorbany.dev/static/media/avatar.ec0231db6078aebd81c7.jpg";

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    );
}
