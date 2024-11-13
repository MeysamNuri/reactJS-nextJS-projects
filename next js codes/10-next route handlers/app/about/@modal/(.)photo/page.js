import Frame from "../../components/frame";
import Modal from "../../components/modal";

export default function PhotoModal(){
    const photo =
    "https://rosepack.com/wp-content/uploads/2024/01/3584588.jpg";

    return(
        <Modal>
            <Frame photo={photo}/>
       
        </Modal>
    )
}