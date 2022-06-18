import validator from 'validator';

export default class Login{
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', evento => {
            evento.preventDefault();              // Impede o envio do formulario para podermos checkarmos
            this.validate(evento);           // Método que recebe o "evento"
        });
    }

    validate(evento) {
        const el = evento.target;            // Elemento que recebe "evento" que é um sinal submit
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let  error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail invalido');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert('A senha precisa ter entre 3 e 50 caracteres.');
            error = true;
        }

        if(!error) el.submit();
    };
}
