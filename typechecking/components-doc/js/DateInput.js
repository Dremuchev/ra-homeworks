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

const birthdayPropType = (props, propName, componentName) => {
  const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
  const showError = (string) => new Error(`Неверное значение '${props[propName]}' 
    параметра ${propName} в компоненте ${componentName}`);
  let birthday = props[propName];
  let isDate = (typeof birthday === 'string') && regex.test(birthday);
  if (!birthday) {
    return null;
  }
  if (!isDate) {
    return showError();
  }
  birthday = birthday.split('-');
  birthday = new Date(birthday[0], birthday[1] - 1, birthday[2]);
  if (birthday.getTime() >= Date.now()) {
    return showError();
  }
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: birthdayPropType
}

DateInput.defaultProps = {
  value: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
}
