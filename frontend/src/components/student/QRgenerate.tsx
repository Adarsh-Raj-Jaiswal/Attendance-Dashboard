import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function QRgenerate(){
  const [dynamicText, setDynamicText] = useState(generateRandomString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicText(generateRandomString());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  function generateRandomString() {
    return Math.random().toString(36).substring(7);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-semibold mb-4">Dynamic QR Code Generator</h2>
      <p className="mb-4">Changing every minute:</p>
      <QRCode value={dynamicText} />
      <p className="mt-4">{dynamicText}</p>
    </div>
  );
};

export default QRgenerate;
