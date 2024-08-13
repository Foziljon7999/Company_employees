const { fetchData } = require("../utils/postgres");

const createCompany = async (req, res) => {
  try {
    let { name } = req.body;
    await fetchData("INSERT INTO companies(name) VALUES($1)", name);
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

const getAllCompany = async (req, res) => {
  try {
    let company = await fetchData("SELECT * FROM companies");
    res.send({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    await fetchData("UPDATE companies SET name = $1 WHERE id = $2", name, id);
    res.send({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  let { id } = req.params;
  try {
    await fetchData("DELETE FROM companies WHERE id = $1", id);
    res.send({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getAllCompany,
  updateCompany,
  deleteCompany,
};
