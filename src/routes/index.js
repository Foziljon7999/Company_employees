const { Router } = require('express')
const { createCompany, getAllCompany, updateCompany, deleteCompany } = require('../controller/companyController')
const { createManager, createUsers, updateUsers, deleteUsers, getAllUsers, getOneUser, getManager, getUser } = require('../controller/usersController')
const { login } = require('../controller/loginController')
const { verifyRole } = require('../middleware/verifyRole')
const { createTasks, updateTask, deleteTask, getByCompanyIdTask, getOneByIdTasks } = require('../controller/tasksController')
const { createUser_task, updateUser_task, deleteUser_task, getByTaskId, getByUserId, getOneById } = require('../controller/user_taskController')

const router = Router()

// ----------login--------------
router.post("/login", login)

// ----------companies----------
router.post("/create/company", verifyRole("admin"), createCompany)
router.get("/get/companyAll", verifyRole("admin"), getAllCompany)
router.patch("/update/company/:id", verifyRole("admin"), updateCompany)
router.delete("/delete/company/:id", verifyRole("admin"), deleteCompany)

// ---------users---------------
router.post("/create/manager", verifyRole("admin"), createManager)
router.post("/create/users", verifyRole("manager"), createUsers)
router.patch("/update/users/:id", verifyRole("manager"), updateUsers)
router.delete("/delete/users/:id", verifyRole("manager"), deleteUsers)
router.get("/getAll/users/", verifyRole("manager"), getAllUsers)
router.get("/getOne/user/:id", verifyRole("manager"), getOneUser)
router.get("/getManager", verifyRole("admin"), getManager)
router.get("/getUser", verifyRole("manager"), getUser)

// ----------tasks----------------------
router.post("/create/tasks", verifyRole("manager"), createTasks)
router.patch("/update/tasks/:id", verifyRole("manager"), updateTask)
router.delete("/delete/tasks/:id", verifyRole("manager"), deleteTask)
router.get("/getByCompanyId/tasks/:id", getByCompanyIdTask)
router.get("/getOneById/tasks/:id", getOneByIdTasks)

// --------------user_task---------------
router.post("/create/user_tasks", verifyRole("manager"), createUser_task)
router.patch("/update/user_tasks/:id", verifyRole("manager"), updateUser_task)
router.delete("/delete/user_tasks/:id", verifyRole("manager"), deleteUser_task)
router.get("/byTaskId/user_tasks/:id", getByTaskId)
router.get("/byUserId/user_tasks/:id", getByUserId)
router.get("/oneById/user_tasks/:id", getOneById)

module.exports = router