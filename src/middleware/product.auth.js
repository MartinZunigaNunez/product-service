import jwt from 'jsonwebtoken'

export function authenticateToken  (req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try{
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({ error: 'Token invalido'})
    }
}

export function requireAdmin(req, res, next){
    if(req.user?.role !== 'admin'){
        return res.status(403).json({ error: 'Solo puedes si eres admin'})
    }
    next()
}