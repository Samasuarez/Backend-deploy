import { generateToken } from "../utils/jwt.js";

export const postSession = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: "Usuario no válido" });
    }

    if (req.user.email === "admin@coder.com") {
      req.user.rol = "admin";
    } else {
      req.user.rol = "usuario";
    }

    const tokenPayload = {
      sub: req.user._id,
      email: req.user.email,
      rol: req.user.rol,
    };

    const token = generateToken(tokenPayload);

    res.cookie("jwtCookie", token, {
      maxAge: 43200000,
    });

    res.status(200).send({ payload: req.user });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesión ${error}` });
  }
};

export const logoutSession = async (req, res) => {
  try {
    if (req.session) {
      await req.session.destroy();
    }

    res.clearCookie("jwtCookie");
    res.status(200).send({ resultado: "Login eliminado" });
  } catch (error) {
    console.error("Error al cerrar la sesión:", error);
    res.status(500).send({ error: "Error al cerrar la sesión" });
  }
};
