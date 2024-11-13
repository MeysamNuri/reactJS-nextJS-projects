import React, { useState, useRef, FC } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { Button } from 'antd'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import { useDispatch, useSelector } from "react-redux";
import 'react-image-crop/dist/ReactCrop.css'
import {
  updateDocument,
} from "../../../redux/actions";
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number

) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface IImageCropTest {
  downloadedPicRoute: any,
  rotate: number,
  downloadId: any,
  oneAdjusterList: any
}
const ImageCropComponent: FC<IImageCropTest> = ({ downloadedPicRoute, rotate, downloadId, oneAdjusterList }) => {
  const dispatch = useDispatch();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [fillebase,setFillebase]=useState<any>()
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
 
  function onImageLoad(e: any) {
    console.log(e,"eeee");
    setFillebase(e.target.currentSrc)
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(100, 100, aspect))
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
      
      }
      // let newBlob:any=URL.createObjectURL(blob)


      // hiddenAnchorRef.current!.href = blobUrlRef.current
      // hiddenAnchorRef.current!.click()
      // var file =  new File([newBlob], 'imageCrop.jpg', {
      //   lastModified: new Date().getTime(),
      //   type: "image/jpeg",
      // })


      // dispatch(updateDocument(oneAdjusterList?.ApplicantId, downloadId, file))
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )


  return (
    <div style={{ margin: "15px" }}>
      <div className="Crop-Controls">

        {/* <div>
          <label htmlFor="scale-input">بزرگ کردن: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            // disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div> */}


      </div>
      {!!downloadedPicRoute && (
        <ReactCrop
          // crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
        // aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={`data:image${downloadedPicRoute?.Result?.FileExtension};base64,${downloadedPicRoute?.Result?.Content}`}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {downloadedPicRoute && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                display: "none",
                border: '1px solid black',
                objectFit: 'contain',
                // width: completedCrop.width,
                // height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <Button type="primary" onClick={onDownloadCropClick}>ذخیره تغییرات</Button>
          </div>
        </>
      )}
    </div>
  )
}
export default ImageCropComponent