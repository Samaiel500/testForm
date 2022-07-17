'use strict'

document.addEventListener('DOMContentLoaded', function () {
    //Animation form
    const itemForm = document.querySelectorAll('.form_item');
    if (itemForm.length > 0) {
        let count = 0;
        function visibleForm() {
            setTimeout(function () {
                itemForm[count].style.opacity = 1;
                itemForm[count].style.transform = 'translate(0, 0)';
                count++;
                if (count < itemForm.length) {
                    visibleForm();
                }
            }, 200);
        };
        visibleForm();
    }

    //Form validate
    const form = document.getElementById('form');
    const formButton = document.querySelector('.form_button');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
    }
    
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
            

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    addAnimationButton(formButton);
                    error++;
                }
            } else if (input.classList.contains('password')) {
                const pass = document.querySelector('.password'),
                      passConf = document.querySelector('.passwordConf');
                if (checkPassword(pass, passConf)) {
                    formAddError(input);
                    addAnimationButton(formButton);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    addAnimationButton(formButton);
                    error++;
                }
            }
        }
    }
    //Add nad Remove class .error
    function formAddError(input) {
        input.classList.add('_error');
    };
    function formRemoveError(input) {
        input.classList.remove('_error');
    };
    function emailTest(email) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
    };
    //Check Password
    function checkPassword(pass, passConf) {
        if (pass.value === passConf.value) {
            if (/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(pass.value)) {
                document.querySelector('.message').textContent = '';
                return false;
            } 
            document.querySelector('.message').textContent = 'The password must contain at least 8 characters and a capital letter.';
            return true;
        }
        document.querySelector('.message').textContent = 'The password is not validate.';
        return true;
    };
    //Animation button
    function addAnimationButton(btn) {
        btn.classList.add('button_req');
        btn.addEventListener('animationend', removeAnimationButton, false);
    };
    function removeAnimationButton() {
        formButton.classList.remove('button_req');
    };
});

