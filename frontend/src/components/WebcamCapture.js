import Webcam from "react-webcam";
import React, { useRef, useCallback } from "react"; 

const videoConstraints = {
  width: 1080,
  height: 720,
  facingMode: "user",
};

function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

const WebcamCapture = ({ setOpenCamera,setSelectedFile }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);

    urltoFile(imageSrc, new Date().getTime() + ".png", "text/plain").then(
      function (file) {
        console.log(file);
        setSelectedFile(file)
      }
    );
    setOpenCamera(false);
  }, [webcamRef]);

  return (
    <div style={{ width: 160, borderWidth: 1, borderColor: "black" }}>
      <Webcam
        audio={false}
        height={160}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={160}
        videoConstraints={videoConstraints}
        style={{}}
      />
      <button style={{ marginLeft: "20%" }} onClick={capture}>
        Capture photo
      </button>
    </div>
  );
};

export default WebcamCapture;
