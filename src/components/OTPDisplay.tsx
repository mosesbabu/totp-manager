import React from "react";
import QRCode from "react-qr-code";

interface OTPDisplayProps {
  totpKey: string;
}

const OTPDisplay: React.FC<OTPDisplayProps> = ({ totpKey }) => {
  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <p className="text-sm">Secret Key: {totpKey}</p>
      <QRCode value={totpKey} size={150} />
    </div>
  );
};

export default OTPDisplay;
