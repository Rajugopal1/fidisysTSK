const express=require("express");
const bodyParser=require("body-parser");
const JWT = require("jsonwebtoken");
const mongoose= require("mongoose");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const error = require('../middleware/error');
const registerController = require('../controller/register');
const login = require('../controller/login');
const {paramsId, headerUserId} = require('../middleware/objectId');
const { userAuth, isLogin, verifyRoles } = require('../middleware/auth');
// const {authRole} = require('../middlewares/verifyRoles')
const roles_list = require("../config/roles");

const categoryController = require('../controller/category');
const gameController = require('../controller/game');


module.exports = (app) => {

app.post('/user/login', login.userLogin);
// app.post('/user/logout',[userAuth, isLogin], login.userLogout);
app.post('/user/registration', registerController.createUser);
app.get('/user',[userAuth, isLogin],verifyRoles(roles_list.ADMIN), registerController.getAllUser,);
app.get('/user/:id', [userAuth, isLogin , paramsId],verifyRoles(roles_list.ADMIN), registerController.getUser);


//Category
app.post('/category',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),categoryController.createCategories);
app.get('/category',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.USER), categoryController.getAllCategories);
app.get('/category/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.USER), categoryController.getCategories);
app.patch('/category/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),categoryController.updateCategories);
app.delete('/category/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),categoryController.deleteCategories);

//Game 
app.post('/game',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),gameController.createGame);
app.get('/game',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.USER), gameController.getAllGames);
app.get('/game/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.USER), gameController.getGames);
app.get('/gamesbycategory/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN, roles_list.USER), gameController.getGamesByCategory);
app.patch('/game/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),gameController.updateGame);
app.delete('/game/:id',[userAuth, isLogin],verifyRoles(roles_list.ADMIN),gameController.deleteGame);









app.use(error);

}


