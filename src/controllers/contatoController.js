const req = require('express/lib/request');
const res = require('express/lib/response');
const Contato = require('../models/ContatoModel');           // Aqui eu coloco uma constante que chama o arquivo ContatoModel.js 

exports.index = (req, res) => {
    res.render('contato', {                                  // Renderizando a pagina contato que está na pasta views
        contato: {}                                          // Retorna um objato vazio para não retornar um erro por não ter nada escrito
    });
}

exports.register = async (req, res) => {                     // É assincrona por que na ContatoModel a função assincrona retorna uma promessa
    try {
        const contato = new Contato(req.body);               // Aqui é criada uma constante que chama uma função construtora com o parametro body da ContatoModel
        await contato.register();                            // Aqui ele espera a const contato chamar a construtora na ContatoModel que dentro terá um parâmetro chamado "register"
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso.');
        console.log(contato.contato._id);
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));        // Exibe contato(constante).contato(construtora na ContatoModel)._id(chave que aparece no banco de dados MongoDB)
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');                            // Caso houver erro ele retornará o render da página 404.ejs
    }
}

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', { contato });
};

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);                       // Chama a função Contato.prototype.edit que está no ContatoModel
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));            // Exibe contato(constante).contato(construtora na ContatoModel)._id(chave que aparece no banco de dados MongoDB)
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function(req, res) {
        if(!req.params.id) return res.render('404');
    
        const contato = await Contato.delete(req.params.id);
        if(!contato) return res.render('404');
    
        req.flash('success', 'Contato apagado com sucesso.');
        req.session.save(() => res.redirect('/'));
        return;
};