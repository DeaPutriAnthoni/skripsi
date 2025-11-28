const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-hashes'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", `http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`, `ws://localhost:${PORT}`, `ws://127.0.0.1:${PORT}`],
            frameSrc: ["'none'"],
            scriptSrcAttr: ["'unsafe-inline'"],
        },
    },
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS Configuration - More permissive for development
const corsOptions = {
    origin: function (origin, callback) {
        // Allow all origins in development
        callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json({ 
    limit: '10mb',
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

// Static Files with Security Headers
app.use(express.static("public", {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('X-Content-Type-Options', 'nosniff');
        }
    }
}));

module.exports = { app, PORT };