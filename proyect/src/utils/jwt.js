import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(user, "mi-clave-secreta", { expiresIn: "12h" });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Usuario no autenticado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "mi-clave-secreta", (error, decoded) => {
    if (error) {
      return res.status(403).send({ error: "Usuario no autorizado" });
    }
    req.user = decoded;
    next();
  });
};
