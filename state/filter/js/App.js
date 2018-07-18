'use strict'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filter: 'All'};
  }

  filterProjects() {
    if (this.state.filter === 'All') {
      return this.props.projects;
    } else {
      return this.props.projects.filter(project => project.category === this.state.filter);
    }
  }

  render() {
    return (
      <div>
        <Toolbar
          filters={this.props.filters}
          selected={this.state.filter}
          onSelectFilter={filter => this.setState({filter: filter})} />
        <Portfolio projects={this.filterProjects()} />
      </div>
    )
  }
}