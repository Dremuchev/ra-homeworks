class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: props.isOpen}
    }

    componentWillReceiveProps(args) {
        this.setState({isOpen: args.items.length !== 0})
    }

    render() {
        if(this.state.isOpen) {
            return (
                <CartView {...this.props} isOpen = {this.state.isOpen}/>
            );
        } else {
            return null;
        }
    }

}