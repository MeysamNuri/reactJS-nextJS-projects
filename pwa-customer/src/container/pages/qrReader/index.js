import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import Header from "../../components/header/Header";
function QRReader() {
    const [result, setResult] = useState('No result')
    const handleClick = (e) => {
    }
    const handleScan = data => {
        if (data) {
            setResult(data)
        }
    }
    const handleError = () => {

    }
    return (
        <>
            <Header
                title={"QR Reader"}
                leftIcon="assets/images/segmentation.svg"
                handleLeftClick={e => handleClick(e)}
                serachbar={false}
            />
            <QrReader
                delay={300}
                onError={handleError}
                onScan={data => handleScan(data)}
                style={{ width: '100%' }}
            />
        </>
    )
}

export default QRReader
