import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"; // assuming you have a mailer helper to send emails

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Create token
        const token = await bcryptjs.hash(user._id.toString(), 10);

        // Save token to user's document
        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send email
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id,
        });

        return NextResponse.json({
            message: "Password reset link sent to your email",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
