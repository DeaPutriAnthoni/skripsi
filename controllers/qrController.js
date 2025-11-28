const { asyncHandler, successResponse, errorResponse, Validator } = require('../utils/response');
const QRCode = require('qrcode');

// GET /api/qrcode/:table - Generate QR Code untuk meja
const generateQRCode = asyncHandler(async (req, res) => {
    const { table } = req.params;
    
    const tableNumber = Validator.validateTableNumber(table);
    
    const url = `http://localhost:${process.env.PORT || 3000}/menu.html?table=${tableNumber}`;
    
    const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
    });

    successResponse(res, {
        table_number: tableNumber,
        qr_code: qrCodeDataURL,
        url: url
    }, 'QR Code berhasil digenerate');
});

module.exports = {
    generateQRCode
};