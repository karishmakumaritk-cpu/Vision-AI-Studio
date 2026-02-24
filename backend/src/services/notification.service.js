exports.sendEmail = async ({ to, subject }) => ({ success: true, to, subject });
exports.sendWhatsApp = async (phone, message) => ({ success: true, phone, message });
