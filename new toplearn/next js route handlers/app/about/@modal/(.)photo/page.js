import Frame from "../../components/frame";
import Modal from "../../components/modal";
import logo from '../../../../public/vercel.svg'
export default function PhotoModal() {
    const photo = "https://roozaneh.net/wp-content/uploads/2019/09/%D8%B9%DA%A9%D8%B3-%D9%85%D9%86%D8%B8%D8%B1%D9%87-8.jpg"

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    );
}
