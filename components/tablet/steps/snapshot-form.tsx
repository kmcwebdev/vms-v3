import React, { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    if (takePhotoTrigger) {
      camera.current && setImage(camera?.current?.takePhoto());
    }
  }, [takePhotoTrigger]);

  useEffect(() => {
    if (image) {
      setHasImageTaken(true);
    }
  }, [image, setHasImageTaken]);

  return (
    <div>
      <div className="rounded-md">
        <Camera
          ref={camera}
          aspectRatio={16 / 9}
          errorMessages={cameraErroMessage}
        />
      </div>

      {image && (
        <Image src={image} alt="Taken photo" width={100} height={100} />
      )}
    </div>
  );
};

export default SnapshotForm;
