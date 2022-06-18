const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');    // destructuring

// Rotas da home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);  // loginRequired é um middleware e contatoController.index é o controller que renderiza a página contato nas views // Primeiro ele faz o requirimento do login e se passar ele vai renderizar os contatos
route.post('/contato/register', loginRequired, contatoController.register); // loginRequired é um middleware que olha se o usuário está logado, contatoController.register é o caminho para registrar o contato
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); // loginRequired é um middleware que olha se o usuário está logado 
route.post('/contato/edit/:id', loginRequired, contatoController.edit); // loginRequired é um middleware que olha se o usuário está logado
route.get('/contato/delete/:id', loginRequired, contatoController.delete); 

module.exports = route;
