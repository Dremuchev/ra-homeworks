class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="tabs">
          <nav className='tabs__items'>
            <NavLink exact activeClassName='tabs__item-active' className='tabs__item' to='/'>Рефераты</NavLink>
            <NavLink activeClassName='tabs__item-active' className='tabs__item' to='/creator'>Криэйтор</NavLink>
            <NavLink activeClassName='tabs__item-active' className='tabs__item' to='/fortune'>Гадалка</NavLink>
          </nav>
          <div className="tabs__content">
            <Route exact path="/" component={Essay} />
            <Route path="/creator" component={Creator} />
            <Route path="/fortune" component={Fortune} />
          </div>
        </div>
      </Router>
    );
  }
}