'use strict';

const DateInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
    </div>
  )
};

const birtdayPropType = (props, propName, componentName) => {
  const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
  let birthday = props[propName];
  let isBirthday = (typeof birthday === 'string') && regex.test(birthday);
  if (!birthday) {
    return null;
  }
  if (!isBirthday) {
    return new Error(`Неверный параметр ${propName} в компоненте
      ${componentName}: формат даты должен соответствовать маске YYYY-MM-DD`);
  }
  let date = birthday.split('-');
  date = new Date(date[0], date[1] - 1, date[2]);
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: birtdayPropType
}

DateInput.defaultProps = {
  value: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
}
