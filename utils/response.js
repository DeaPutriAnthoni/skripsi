const Validator = require('../utils/validator');

// Error Handling Middleware
class ApiError extends Error {
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error
    console.error(`[ERROR] ${req.method} ${req.path}:`, {
        message: err.message,
        stack: err.stack,
        body: req.body,
        query: req.query,
        params: req.params
    });

    // Validation Errors
    if (err.message.includes('harus') || err.message.includes('tidak valid')) {
        return res.status(400).json({
            success: false,
            message: err.message,
            code: 'VALIDATION_ERROR',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    // Database Errors
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: 'Data sudah ada',
            code: 'DUPLICATE_ENTRY'
        });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: 'Referensi data tidak ditemukan',
            code: 'REFERENCE_ERROR'
        });
    }

    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token tidak valid',
            code: 'INVALID_TOKEN'
        });
    }

    // Default Error
    const statusCode = error.statusCode || 500;
    const code = error.code || 'INTERNAL_ERROR';
    
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Terjadi kesalahan server',
        code: code,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

// Async Error Wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Success Response Helper
const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

// Error Response Helper
const errorResponse = (res, message = 'Error', statusCode = 400, code = 'BAD_REQUEST') => {
    res.status(statusCode).json({
        success: false,
        message,
        code,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    ApiError,
    errorHandler,
    asyncHandler,
    successResponse,
    errorResponse,
    Validator
};