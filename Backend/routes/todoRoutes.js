const express=require('express')
const router=express.Router()
const {getAllTodo,createTodo,updateTodo,deleteTodo}=require('../controllers/todoController')

router.route('/todos').get(getAllTodo)
router.route('/todo/new').post(createTodo)
router.route('/todo/:id').put(updateTodo)
router.route('/todo/:id').delete(deleteTodo)
module.exports=router