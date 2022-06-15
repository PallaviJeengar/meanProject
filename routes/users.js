// routes/users.js

/**
 * components:
 *  securitySchemes:
 *     bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
/**
 * security:
 * - bearerAuth: []  
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName: 
 *           type: string
 *         email: 
 *           type: string
 *         mobileNumber: 
 *           type: string
 *         bookIsseued: 
 *            type: string
 *         address: 
 *            type: string
 *         password: 
 *            type: string
 */

var express = require('express');
var router = express.Router();

const userController=require('../controllers/userController');
const userMiddleware=require('../middlewares/userMiddleware.js');

/**
 * @swagger
 * /users/user:
 *   get:
 *     security:
 *      - bearerAuth: []  
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/user',userController.showUsers);

/**
 * @swagger
 * /users/user:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                          $ref: '#/components/schemas/User'
 *                      
 */
router.post('/user',userController.addUser);

/**
 * @swagger
 * /users/user/{id}:
 *   patch:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                         $ref: '#/components/schemas/User'
 *                      
 */
router.patch('/user/:id',userController.updateUser);

/**
 * @swagger
 * /users/user/{id}:
 *   delete:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                 items:
 *                       $ref: '#/components/schemas/User'
 *                      
 */
router.delete('/user/:id',userMiddleware.authenticateToken,userController.deleteUser);

/**
 * @swagger
 * /users/user/issueBook/{id}/{uid}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:            
 *                         type: string
 *                       lastName:            
 *                         type: string
 *                       email:            
 *                         type: string
 *                       mobileNumber:        
 *                         type: string
 *                       bookIsseued:            
 *                         type: string
 *                       address:            
 *                         type: string
 *                       password:            
 *                         type: string
 *                      
 */
router.get('/user/issueBook/:id/:uid',userController.issueBook);

router.post('/login',userController.verifyUser);

module.exports = router;