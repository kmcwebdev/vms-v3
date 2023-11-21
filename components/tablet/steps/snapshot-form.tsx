import React, { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

type CameraErrorMessage = {
  noCameraAccessible?: string;
  permissionDenied?: string;
  switchCamera?: string;
  canvas?: string;
};

interface ISnapshotForm {
  takePhotoTrigger: boolean;
  setHasImageTaken: (e: boolean) => void;
}

const SnapshotForm = ({
  takePhotoTrigger,
  setHasImageTaken,
}: ISnapshotForm) => {
  const [count, setCount] = useState<string | number>();

  const { setValue, getValues } = useFormContext();

  const camera = useRef<{ takePhoto: () => string } | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const cameraErroMessage: CameraErrorMessage = {
    noCameraAccessible:
      "No camera device accessible. Please connect your camera or try a different browser.",
    permissionDenied:
      "Permission denied. Please refresh and give camera permission.",
    switchCamera:
      "It is not possible to switch camera to different one because there is only one video device accessible.",
    canvas: "Canvas is not supported.",
  };

  console.log("snap", getValues());

  const startCountdown = () => {
    let count = 3;

    const intervalId = setInterval(() => {
      if (count > 1) {
        setCount(count);
        count--;
      } else if (count === 1) {
        setCount(count);
        count--;
      } else {
        clearInterval(intervalId);
        setCount("Smile!");
        camera.current && setImage(camera.current.takePhoto());
      }
    }, 1000);
  };

  useEffect(() => {
    if (takePhotoTrigger) {
      startCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takePhotoTrigger]);

  useEffect(() => {
    if (image) {
      setHasImageTaken(true);
      setValue("snapShot.image", image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, setHasImageTaken]);

  return (
    <div>
      {image ? (
        <div className="relative h-72 w-full">
          <Image src={image} alt="Taken photo" fill />
        </div>
      ) : (
        <div className="relative flex items-center justify-center rounded-md">
          <p className="absolute z-20 text-3xl font-bold text-white">{count}</p>
          <Camera
            ref={camera}
            aspectRatio={16 / 9}
            errorMessages={cameraErroMessage}
          />
        </div>
      )}
    </div>
  );
};

export default SnapshotForm;
