export const otpTemplate = (otp) => {
    return `
        <h2>Email Verification</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 20 minutes.</p>

        <p>Do not share it with anyone.</p>
    `;
};