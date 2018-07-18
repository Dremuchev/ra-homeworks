'use strict';
let content;

const submitForm = f => {
    event.preventDefault();
    const object = {};
    const formData = new FormData(content);
    formData.forEach((value, key) => object[key] = value);
    f(JSON.stringify(object));
}

const FeedbackForm = ({data, onSubmit}) => {
    return (
        <form className="content__form contact-form" ref={element => content = element}>
            <div className="testing">
                <p>Чем мы можем помочь?</p>
            </div>
            <div className="contact-form__input-group">
                <input className="contact-form__input contact-form__input--radio" id="salutation-mr" name="salutation" type="radio" value="Мистер" checked={data.salutation && data.salutation === 'Мисис'} />
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mr">Мистер</label>
                <input className="contact-form__input contact-form__input--radio" id="salutation-mrs" name="salutation" type="radio" value="Мисис" checked={data.salutation && data.salutation === 'Мисис'} />
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-mrs">Мисис</label>
                <input className="contact-form__input contact-form__input--radio" id="salutation-ms" name="salutation" type="radio" value="Мис" checked={data.salutation && data.salutation === 'Мис'} />
                <label className="contact-form__label contact-form__label--radio" htmlFor="salutation-ms">Мис</label>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="name">Имя</label>
                <input className="contact-form__input contact-form__input--text" id="name" name="name" type="text" value={data.name || null}/>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
                <input className="contact-form__input contact-form__input--email" id="email" name="email" type="email" value={data.email || null}/>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
                <select className="contact-form__input contact-form__input--select" id="subject" name="subject" defaultValue={data.subject || null}>
                <option>У меня проблема</option>
                <option>У меня важный вопрос</option>
                </select>
            </div>
            <div className="contact-form__input-group">
                <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
                <textarea className="contact-form__input contact-form__input--textarea" id="message" name="message" rows="6" cols="65" defaultValue={data.message || null}></textarea>
            </div>
            <div className="contact-form__input-group">
                <p className="contact-form__label--checkbox-group">Хочу получить:</p>
                <input className="contact-form__input contact-form__input--checkbox" id="snacks-pizza" name="snacks" type="checkbox" value="пицца" checked={data.snacks && data.snacks.some(el => el === 'пицца')}/>
                <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-pizza">Пиццу</label>
                <input className="contact-form__input contact-form__input--checkbox" id="snacks-cake" name="snacks" type="checkbox" value="пирог" checked={data.snacks && data.snacks.some(el => el === 'пирог')}/>
                <label className="contact-form__label contact-form__label--checkbox" htmlFor="snacks-cake">Пирог</label>
            </div>
            <button onClick={onSubmit && (() => submitForm(onSubmit))} className="contact-form__button" type="submit">Отправить сообщение!</button>
            <output id="result" />
        </form>
    );
};