var express = require('express');
var router = express.Router();

const userController=require('../controllers/userController');

router.get('/user',userController.showUsers);
router.post('/user',userController.addUser);
router.patch('/user/:id',userController.updateUser);
router.delete('/user/:id',userController.deleteUser);
router.get('/user/issueBook/:id/:uid',userController.issueBook);

module.exports = router;