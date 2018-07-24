'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'user@gmail.com',
      first_name: 'Алексей',
      last_name: 'Иванов',
      age: 29,
      nickname: 'anonimizer_me',
      is_married: false
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSearch(e) {
    e.preventDefault();

    alert('Поиск работает!');
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    alert('Профиль обновлен');
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    const menuItems = ['Google', 'https://google.com', 'Яндекс', 'https://yandex.ru'];
    const menuItemsArray = [];
    let obj = {};
    menuItems.forEach((el, i) => {
      if (i % 2 === 0) {
        obj.name = el;
      }
      if (i % 2 != 0) {
        obj.url = el;
        menuItemsArray.push(obj);
        obj = {};
      }
    })

    return (
      <React.Fragment>
        <Menu handleSearch={this.onSearch} title={'Приложение'} version={'1.3'} items={menuItemsArray}/>
        <div className="row">
          <Form {...this.state} handleChange={this.onChange} handleSubmit={this.onSubmit}/>
        </div>
      </React.Fragment>
    );
  }
};
