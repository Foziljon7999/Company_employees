const { fetchData } = require("../utils/postgres");

const createManager = (req, res) => {
  try {
    let { login, password, full_name, company_id, role } = req.body;

    fetchData(
      "INSERT INTO users(login, password, full_name, company_id, role) VALUES($1, $2, $3, $4, $5)",
      login,
      password,
      full_name,
      company_id,
      "manager"
    );
    res.send({
      success: true,
      message: "Created",
    });
  } catch (error) {
    res.status(403).send({
      success: true,
      message: error.message,
    });
  }
};

const createUsers = async (req, res) => {
  let { login, password, full_name, company_id, role } = req.body;
  try {
    fetchData(
      "INSERT INTO users(login, password, full_name, company_id, role) VALUES($1, $2, $3, $4, $5)",
      login,
      password,
      full_name,
      company_id,
      "worker"
    );
    res.send({
      success: true,
      message: "Created",
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const updateUsers = async (req, res) => {
  let { id } = req.params;
  let { login, password, full_name, company_id, role } = req.body;
  try {
    await fetchData(
      "UPDATE users SET login = $1, password = $2, full_name = $3, company_id = $4, role = $5 WHERE id = $6",
      login,
      password,
      full_name,
      company_id,
      role,
      id
    );
    res.send({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.status({
      success: false,
      message: error.message,
    });
  }
};

const deleteUsers = async (req, res) => {
  let { id } = req.params;
  try {
    await fetchData("DELETE FROM users WHERE id = $1", id);
    res.send({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(403).send({
      success: true,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await fetchData("SELECT * FROM users");
    res.send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  let { id } = req.params;
  try {
    let oneUser = await fetchData("SELECT * FROM users WHERE id = $1", id);
    res.send({
      success: true,
      data: oneUser,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const getManager = async (req, res) => {
  let { role } = req.body;
  try {
    let manager = await fetchData("SELECT * FROM users WHERE role = $1", role);
    res.send({
      success: true,
      data: manager,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  let { role } = req.body;
  try {
    let manager = await fetchData("SELECT * FROM users WHERE role = $1", role);
    res.send({
      success: true,
      data: manager,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createManager,
  createUsers,
  updateUsers,
  deleteUsers,
  getAllUsers,
  getOneUser,
  getManager,
  getUser,
};
