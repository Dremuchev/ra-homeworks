'use strict';

const content = [
    {
        header: 'Компоненты',
        article: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.'
    },
    {
        header: 'Выучил раз, используй везде!',
        article: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.'
    },
    {
        header: 'Использование JSX',
        article: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.'
    }
];

class Accordion extends React.Component {
    render() {
        const {content, header} = this.props;
        return (
            <main className='main'>
                <h2 className='title'>{header}</h2>
                {content.map((section, index) => { return <ListItem section={section} index={index} /> })}
            </main>
        );
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { section, index } = this.props;
        return (
            <section className={`section ${this.state.isOpen ? 'open' : ''}`} key={`Item-${index}`}>
                <button>toggle</button>
                <h3 className='sectionhead' onClick={this.toggleOpen.bind(this)}>{section.header} </h3>
                <div className='articlewrap'>
                    <div className='article'>{section.article}</div>
                </div>
            </section>
        );
    }
}

ReactDOM.render(<Accordion content={content} header={'React'} />, document.getElementById('accordian'));