import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import './assets/css/style.css';

// Login

import Login from './modules/Login';   // Instanciar classe Login

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();

// Contatos

import Contatos from './modules/Contatos';

const contatosEdit = new Contatos('.form-contatos-edit');
const contatosRegister = new Contatos('.form-contatos-register');
contatosEdit.init();
contatosRegister.init();


