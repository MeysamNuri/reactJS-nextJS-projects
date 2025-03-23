import React from 'react';
import { useSelector } from "react-redux";
import { Logout, TokenValue } from "sanhab-components-library";
import {
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
export interface UserMessagePageProps {

}

const UserMessagePage: React.FC<UserMessagePageProps> = () => {
    let history = useHistory();
    const { userLogin } = useSelector((state: any) => state.userLogin);

    const buttonStyle = {
        width: "200px",
        backgroundColor: "red",
        color: "white",
        margin: "0 auto",
        borderRadius: "8px",
        cursor: "pointer"
    }
    const handlExit = () => {
        Logout();
        history.push("/login");
        window.location.reload();
    }
    return (

        <div style={{ width: "100%", textAlign: "center" }}>

            <h2 style={{ color: "red" }}> ! توجه </h2>
            <br />
            {userLogin?.Result?.StatusId == 7 ?
                <p style={{ backgroundColor: "white", padding: "30px" }}>.ارزیاب محترم، با توجه به عضویت شما در ارزیابی حقوقی امکان ورود به میزکار شخصی را ندارید</p>
                :
                !userLogin?.Result?.IsActive ?
                    <p style={{ backgroundColor: "white", padding: "30px" }}>.کاربر محترم، با توجه به غیر فعال بودن کاربری شما امکان ورود به میزکار را ندارید</p>
                    : null
            }

            <div style={buttonStyle} onClick={handlExit}>
                خروج
            </div>
        </div>
    );
}

export default UserMessagePage;