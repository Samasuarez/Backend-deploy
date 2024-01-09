import userModel from "../models/users.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    const formattedUsers = users.map((user) => ({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      rol: user.rol,
    }));

    res.status(200).send(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const postUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    return res.status(200).send({ mensaje: "Usuario creado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
  }
};

export const cleanInactiveUsers = async (req, res) => {
  try {
    const inactiveUsers = await userModel.deleteMany({
      last_connection: { $lt: new Date(Date.now() - 30 * 60 * 1000) }, 
    });
    inactiveUsers.forEach((user) => {
      sendInactiveUserEmail(user.email);
    });

    res
      .status(200)
      .send({ mensaje: "Usuarios inactivos eliminados correctamente" });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: `Error al limpiar usuarios inactivos: ${error}` });
  }q
};
