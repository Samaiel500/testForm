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
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
    }

    function formAddError(input) {
        input.classList.add('_error');
    };
    function formRemoveError(input) {
        input.classList.remove('_error');
    };
    function emailTest(email) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
    };
});

