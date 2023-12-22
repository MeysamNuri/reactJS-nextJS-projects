import React, { useEffect } from 'react';
import { Alert, Space,Spin } from 'antd';
import {
    G4BRegister
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export interface G4BRegisterationProps {

}

const G4BRegisteration: React.FC<G4BRegisterationProps> = () => {
    const dispatch = useDispatch()
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let requestId: any = url.searchParams.get("request_number")
    useEffect(() => {
        let requestBody={
            id:requestId
        }
        dispatch(G4BRegister(requestBody))
    }, [])

    const { g4bRegisterDetails,g4bRegisterLoading } = useSelector(
        (state: any) => state.G4BDetails
    );
    return (
        <>
            {
                g4bRegisterLoading?<Spin style={{margin:" 100px auto",width:"100%"}}/>:
                g4bRegisterDetails?.Result ?
                    <Alert
                        message="توجه"
                        description="ثبت نام شما با موفقیت انجام شد ادامه روند از طریق پیامک به شما اطلاع داده می شود"
                        type="success"
                        showIcon
                    /> :
                    <Alert
                        message="خطا"
                        description={g4bRegisterDetails?.Message}
                        type="error"
                        showIcon
                    />
            }



        </>
    );
}

export default G4BRegisteration;