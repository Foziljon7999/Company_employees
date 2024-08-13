const { fetchData } = require("../utils/postgres");

const createUser_task = async (req, res) => {
  let { user_id, task_id, start_at, end_at, status } = req.body;
  try {
    await fetchData(
      "INSERT INTO user_tasks(user_id, task_id, start_at, end_at, status) VALUES($1, $2, $3, $4, $5)",
      user_id,
      task_id,
      start_at,
      end_at,
      status
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

const updateUser_task = async (req, res) => {
  let { id } = req.params;
  let { user_id, task_id, start_at, end_at, status } = req.body;
  try {
    await fetchData(
      "UPDATE user_tasks SET user_id = $1, task_id = $2, start_at = $3, end_at = $4, status = $5 WHERE id = $6",
      user_id,
      task_id,
      start_at,
      end_at,
      status,
      id
    );
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

const deleteUser_task = async (req, res) => {
  let { id } = req.params;
  try {
    await fetchData("DELETE FROM user_tasks WHERE id = $1", id);
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

const getByTaskId = async (req, res) => {
  let { id } = req.params;
  try {
    let taskId = await fetchData(
      "SELECT * FROM user_tasks WHERE task_id = $1",
      id
    );
    res.send({
      success: true,
      data: taskId,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const getByUserId = async (req, res) => {
  let { id } = req.params;
  try {
    let userId = await fetchData(
      "SELECT * FROM user_tasks WHERE user_id = $1",
      id
    );
    res.send({
      success: true,
      data: userId,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

const getOneById = async (req, res) => {
  let { id } = req.params;
  try {
    let oneById = await fetchData("SELECT * FROM user_tasks WHERE id = $1", id);
    res.send({
      success: true,
      data: oneById,
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser_task,
  updateUser_task,
  deleteUser_task,
  getByTaskId,
  getByUserId,
  getOneById,
};
