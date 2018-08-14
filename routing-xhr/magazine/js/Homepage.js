class Homepage extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/routing-xhr/magazine/' component={Home} />
          <Route exact path='/routing-xhr/magazine/index.html' component={Home} />
          <Route exact path='/routing-xhr/magazine/subscribtion' component={SubscribtionPage} />
          <Route path='/routing-xhr/magazine/article' component={ArticlePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row m-3">
          <div className="col-sm">
            <div className="card">
              <img className="card-img-top" src={`https://picsum.photos/800/180}`} alt="Подписка" />
              <div className="card-body">
                <p className="card-text">Уникальная возможность — подписаться на издание!</p>
                <Link to="/routing-xhr/magazine/subscribtion" className="btn btn-primary">Подписаться</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-3">
          {articles.map(article =>
            <div className="col-sm" key={article.id}>
              <Article {...article} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
