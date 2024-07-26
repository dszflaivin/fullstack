import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async({email, emailType,userId}:any) => {
    try {
        // hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken, 
            verifyTokenExpiry: Date.now() + 3600000})
            } else if(emailType === "RESET"){
                await User.findByIdAndUpdate(userId, 
                    {forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000})
            }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "3a6fc6601f8b8c",
                  pass: "33e2b3e6150e0e"
                  //TODO env
                }
              });

              const mailOptions = {
                from:'flaivindsouza6@gmail.com',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
                or copy and paste the link in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
                </p>`
              }

              const mailresponse= await transport.sendMail(mailOptions);
              return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}