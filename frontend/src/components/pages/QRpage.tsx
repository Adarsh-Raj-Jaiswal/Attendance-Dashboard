import { useEffect, useState } from "react";
import "./QRpage.css";
import QRCode from "qrcode.react";
import { qrcodegenerator } from "../../api-helper/api-helper";

//@ts-ignore
const QRpage = () => {
  const [text, setText] = useState();

  useEffect(() => {
    const fetchqrcode = async () => {
      try {
        const response = await qrcodegenerator();
        //@ts-ignore
        setText(response.data.hash);
        console.log(response.data);
      } catch (error: any) {}
    };
    setInterval(() => {
      fetchqrcode();
    }, 1000);
  }, []);

  return (
    <>
      <div className="font-outfit bg-light-gray text-center">
        <section className="bg-white mx-auto my-20 rounded-3xl p-4 w-80">
          <div className="mb-6">
            <QRCode value={text} />
          </div>
          <h1 className="text-2xl text-center font-bold text-dark-blue mb-3">
            Scan the QR to mark your Attendance
          </h1>
        </section>
      </div>
    </>
  );
};

export default QRpage;
