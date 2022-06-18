const session = require('express-session');
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors); // mostra o erro
            req.session.save(function() {
                return res.redirect('/login/index');  //nos mandará para a pagina que já estavamos caso ocorrer um erro
            });
            return; //retorna o if
        }
    
        req.flash('success', 'Seu usuario foi cadastrado'); // mostra o erro
        req.session.save(function() {
            return res.redirect('/login/index');  //nos mandará para a pagina que já estavamos informando successo
        });

    }  catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors); // mostra o erro
            req.session.save(function() {
                return res.redirect('/login/index');  //nos mandará para a pagina que já estavamos caso ocorrer um erro
            });
            return; //retorna o if
        }
    
        req.flash('success', 'Você entrou no sistema'); // entrou
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/index');  //nos mandará para a pagina que já estavamos informando successo
        });

    }  catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}