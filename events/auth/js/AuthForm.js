'use strict';
const user = {};

const deafultCancel = f => {
    event.preventDefault();
    if (user.name && user.email && user. password) {
        f(user);
    }
    return false;
}

const appendData = event => {
    const field = event.currentTarget;
    const fieldTitle = event.currentTarget.placeholder;
    if (fieldTitle === 'Имя') {
        user['name'] = field.value;
    } else if (fieldTitle === 'Электронная почта') {
        user['email'] = field.value;
    } else {
        user['password'] = field.value;
    }
}

const checkSymbol = event => {
    const regexEmail = /[a-zA-Z]|\d|\@|\.|\-|\_/gm;
    const regexPass = /[a-zA-Z]|\d|\_/gm;
    const key = event.key;
    const fieldTitle = event.currentTarget.placeholder;
    if (fieldTitle === 'Электронная почта' && !regexEmail.test(key)) {
        event.preventDefault();
    } else if (fieldTitle === 'Пароль' && !regexPass.test(key)) {
        event.preventDefault();
    }
}

function AuthForm({onAuth}) {
    return (
        <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={() => deafultCancel(onAuth)}>
            <div className="Input">
                <input required type="text" placeholder="Имя" onChange={appendData} />
                <label></label>
            </div>
            <div className="Input">
                <input type="email" placeholder="Электронная почта" onChange={appendData} onKeyPress={checkSymbol} />
                <label></label>
            </div>
            <div className="Input">
                <input required type="password" placeholder="Пароль" onChange={appendData} onKeyPress={checkSymbol} />
                <label></label>
            </div>
            <button type="submit">
                <span>Войти</span>
                <i className="fa fa-fw fa-chevron-right"></i>
            </button>
        </form>
    )
}
