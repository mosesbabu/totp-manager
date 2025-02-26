import { QRCodeCanvas } from "qrcode.react"; 
import { getTOTPCode } from "@/lib/totp"; 

interface Group {
  id: string;
  name: string;
}

interface TOTPCode {
  username: string;
  notes?: string;
  secretKey: string;
  groupId?: string;
}

interface ViewOTPProps {
  codes: TOTPCode[];
  groups: Group[];
}

export default function ViewOTP({ codes, groups }: ViewOTPProps) {
  const generateQRCodeUrl = (username: string, secret: string) => {
    return `otpauth://totp/${encodeURIComponent(username)}?secret=${secret}&issuer=MyApp`;
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <h2 className="text-lg font-semibold">Generated OTPs</h2>
      {codes.length === 0 ? (
        <p className="text-gray-500">No OTPs available</p>
      ) : (
        codes.map((code, index) => (
          <div key={index} className="p-2 mt-2 bg-white shadow rounded">
            <p><strong>Group:</strong> {groups.find(g => g.id === code.groupId)?.name || "None"}</p>
            <p><strong>OTP:</strong> {getTOTPCode(code.secretKey)}</p> 

            {/* QR Code */}
            <div className="flex justify-center mt-2">
              <QRCodeCanvas value={generateQRCodeUrl(code.username, code.secretKey)} size={150} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
