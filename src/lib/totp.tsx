import { authenticator } from "otplib"; 

export function getTOTPCode(secret: string): string {
  return authenticator.generate(secret); 
}
