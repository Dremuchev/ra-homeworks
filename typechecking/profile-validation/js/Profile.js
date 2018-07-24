'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const Profile = props => {
  return (
    <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle}/>
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
      </div>
    </div>
  );
};

const urlPropType = (props, propName, componentName) => {
  const regex = /^https:\/\/vk\.com\/(id[0-9]+|[a-zA-Z0-9_-]+)$/;
  let url = props[propName];
  let isUrl = (typeof url === 'string') && regex.test(url);
  if (!isUrl) {
    return new Error(`Неверное значение '${props[propName]}' 
    параметра ${propName} в компоненте ${componentName}`);
  }
  return null;
}

const birthdayPropType = (props, propName, componentName) => {
  const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
  const showError = () => new Error(`Неверное значение '${props[propName]}' 
    параметра ${propName} в компоненте ${componentName}`);
  let birthday = props[propName];
  let isDate = (typeof birthday === 'string') && regex.test(birthday);
  if (!birthday) {
    return showError();
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

Profile.defaultProps = {
  img: './images/profile.jpg'
}

Profile.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  url: urlPropType,
  birthday: birthdayPropType
};