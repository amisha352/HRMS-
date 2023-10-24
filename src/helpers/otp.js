const generateOTP = () => {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += characters[Math.floor(Math.random() * characters.length)];
    }
    return otp;
};

module.exports = {
    generateOTP,
}
