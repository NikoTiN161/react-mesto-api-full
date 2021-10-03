const allowedCors = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'https://praktikum.tk',
    'http://praktikum.tk',
];

export default function cors(req, res, next) {
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 
    const requestHeaders = req.headers['access-control-request-headers']; 
    const { origin } = req.headers; 
    const { method } = req;
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        return res.end();
    } 
    next();
}; 