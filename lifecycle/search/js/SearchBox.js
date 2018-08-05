class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  isFixed(offset) {
    const searchBox = document.querySelector('.search-box');
    return offset > searchBox.offsetTop;
  }

  setPosition(isFixed) {
    this.setState({fixed: isFixed});
  }

  scrollHandler = () => {
    this.setPosition(this.isFixed(window.pageYOffset));
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }
}
