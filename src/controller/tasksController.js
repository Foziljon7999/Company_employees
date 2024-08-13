const { fetchData } = require("../utils/postgres");

const createTasks = async (req, res) => {
  let { title, description, company_id } = req.body;
  try {
    await fetchData(
      "INSERT INTO tasks(title, description, company_id) VALUES($1, $2, $3)",
      title,
      description,
      company_id
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

const updateTask = async (req, res) => {
  let { id } = req.params;
  let { title, description, company_id, created_at } = req.body;
  try {
    await fetchData(
      "UPDATE tasks SET title = $1, description = $2, company_id = $3, created_at = $4 WHERE id = $5",
      title,
      description,
      company_id,
      created_at,
      id
    );
    res.send({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.status(403).send({
      success: true,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  let { id } = req.params;
  try {
    await fetchData("DELETE FROM tasks WHERE id = $1", id);
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

const getByCompanyIdTask = async (req, res) => {
  let { id } = req.params;
  try {
    let companyId = await fetchData(
      "SELECT * FROM tasks WHERE company_id = $1",
      id
    );
    res.send({
      success: true,
      data: companyId,
    });
  } catch (error) {
    res.status(403).send({
      success: true,
      message: error.message,
    });
  }
};

const getOneByIdTasks = async (req, res) => {
  let { id } = req.params;
  try {
    let oneTask = await fetchData("SELECT * FROM tasks WHERE id = $1", id);
    res.send({
      success: true,
      data: oneTask,
    });
  } catch (error) {
    res.status(403).send({
      success: true,
      message: error.message,
    });
  }
};

module.exports = {
  createTasks,
  updateTask,
  deleteTask,
  getByCompanyIdTask,
  getOneByIdTasks,
};
