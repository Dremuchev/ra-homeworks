'use strict';

class App extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            list: []
        };
        this.WithDataMonth = withData(MonthTable);
        this.WithDataYear = withData(YearTable);
        this.WithDataSort = withData(SortTable);
    }

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/l2s9l').then(response => {
            this.setState(response.data);
        });
    }

    render() {
        const { WithDataMonth, WithDataYear, WithDataSort } = this;
        return (
            <div id="app">
                <WithDataMonth list={ this.state.list } type='month' />
                <WithDataYear list={ this.state.list } type='year' />
                <WithDataSort list={ this.state.list } type='sort' />
            </div>
        );
    }
}

function withData(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                type: this.props.type
            };
        }

        getType(type) {
            if (type === 'month') {
                return this.groupByType(this.props.list, type);
            } else if (type === 'year') {
                return this.groupByType(this.props.list, type);
            } else if (type === 'sort') {
                return this.props.list.sort((first, next) => new Date(next.date) - new Date(first.date));
            }
        }

        groupByType(dataArray, type) {
            return dataArray.reduce((groupedArray, currentItem) => {
                const itemDate = new Date(currentItem.date);
                let groupBy;
                if (type === 'month') {
                    groupBy = itemDate.toLocaleString('ru', { month: "long" }); 
                } else {
                    groupBy = itemDate.getFullYear();
                }
                
                let currentElement = groupedArray.find(element => element[type] === groupBy);

                if (currentElement) {
                    currentElement.amount += currentItem.amount;
                } else {
                    groupedArray.push({ [type]: groupBy, amount: currentItem.amount });
                }
                return groupedArray;
            }, []);
        }

        render() {
            return <Component list={ this.getType(this.state.type) } />
        }
    }
}