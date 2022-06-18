import validator from 'validator';

export default class Contatos{
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', evento => {
            evento.preventDefault();              // Impede o envio do formulario para podermos verificarmos
            this.validate(evento);           // Método que recebe o "evento"
        });
    }

    validate(evento) {
        const el = evento.target;            // Elemento que recebe "evento" que é um sinal submit
        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let  error = false;

        if(nomeInput.value.length > 50) {
            alert('Nome não pode ter mais de 50 caracteres');
            error = true;
        }

        if(sobrenomeInput.value.length > 50) {
            alert('Sobrenome não pode ter mais de 50 caracteres');
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail invalido');
            error = true;
        }

        if(!telefoneInput.value.length == 11) {
            alert('Telefone invalido');
            error = true;
        }

        if(!error) el.submit();
    };
}
