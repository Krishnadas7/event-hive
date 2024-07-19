import React, { useRef, useState, useCallback, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  Crop,
} from "react-image-crop";
import { setCredential } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";
import { profileImageUpload } from "../../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  closeModal: () => void;
  updateAvatar: (dataUrl: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ closeModal, updateAvatar }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState<string>("");
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (!imgSrc) return;

    const imageElement = new Image();
    imageElement.src = imgSrc;

    const handleImageLoad = async (e: Event) => {
      const image = e.currentTarget as HTMLImageElement;
      if (error) setError("");
      const { naturalWidth, naturalHeight } = image;
      if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
        setError("Image must be at least 150 x 150 pixels.");
        return setImgSrc("");
      }

      const blob = await fetch(imgSrc).then(res => res.blob());
      const fileWithCorrectMimeType = new File([blob], "profileImage.jpg", {
        type: blob.type,
        lastModified: Date.now()
      });
     
      const formData = new FormData();
      formData.append('image', fileWithCorrectMimeType);
      if(userInfo && userInfo._id && userInfo.email){
         formData.append('id', userInfo._id);
      formData.append('email',userInfo.email)
      }
     
      const prof = async (formData: FormData) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res:any = await profileImageUpload(formData);
        dispatch(setCredential({...res.data.data}))
        console.log('res from image crop', res);
      };
      prof(formData);
    };

    imageElement.addEventListener("load", handleImageLoad);

    return () => {
      imageElement.removeEventListener("load", handleImageLoad);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc, error, userInfo?._id]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "px",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }, []);

  const handleCropComplete = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(
          crop,
          imgRef.current.width,
          imgRef.current.height
        )
      );
      const dataUrl = previewCanvasRef.current.toDataURL();
      updateAvatar(dataUrl);
      closeModal();
    }
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={( percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={handleCropComplete}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
