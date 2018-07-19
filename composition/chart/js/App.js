function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

function getMax(arr) {
	return arr.reduce((max, element) => Math.max(max, element.reduce((elementMax, item) => Math.max(elementMax, item), 0)), 0);
}

class App extends React.Component {
	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const	series = 5;
		const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({ data });
	}

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

		return (
			<section>
        <SimpleCharts option={this.state} />
        <ChartsStacked option={this.state} />
        <ChartsLayered option={this.state} />
        <ChartsHorizontal option={this.state} />
        <Legend option={this.state} />
			</section>
		);
	}
}

const SimpleCharts = props => {
	const args = Object.assign(props.option, {
		type: '',
		cls: '',
		elementHieght: 250
	})

	return <Charts option={args} />
}

const ChartsStacked = props => {
	const args = Object.assign(props.option, {
		type: 'stacked',
		cls: '',
		elementHieght: 250
	})

	return <Charts option={args} />
}

const ChartsLayered = props => {
	const args = Object.assign(props.option, {
		type: 'layered',
		cls: '',
		elementHieght: 250
	})

	return <Charts option={args} />
}

const ChartsHorizontal = props => {
	const args = Object.assign(props.option, {
		type: '',
		cls: 'horizontal',
		elementHieght: 'auto'
	})

	return <Charts option={args} />
}

const Charts = props => {
	const {data, cls} = props.option;
	const max = getMax(data);
	
	return (
		<div className={`Charts ${cls}`}>
			{	data.map((serie, serieIndex) => {
					return <ChartSerie {...props.option} serie={serie} serieIndex={serieIndex} max={max} />
				}) }
		</div>
	)
}

const ChartSerie = props => {
	const {serie, serieIndex, series, colors, max, type, elementHieght, cls} = props;
	let sortedSerie = serie.slice(0);
	let sum = serie.reduce((carry, current) => carry + current, 0);
	sortedSerie.sort(compareNumbers);

	return (
		<div className={`Charts--serie ${type}`} key={ serieIndex }	style={ { height: elementHieght } }>
		<label>{ series[serieIndex] }</label>
		{ serie.map((item, itemIndex) => {
			let color = colors[itemIndex];
			let size = item / (max) * 100;
			let style = {
				backgroundColor: color,
				opacity: (item / max + .05),
				zIndex: item
			};

			if (type === '' && cls === '') {
				style.right = null;
				style.height = size + '%';
			}

			if (type === '' && cls === 'horizontal') {
				style.height = null;
				style.width = size + '%';
			}

			if (type === 'stacked') {
				size = item / sum * 100;
				style.opacity = 1;
				style.height = size + '%';
			}

			if (type === 'layered') {
				style.height = size + '%';
				style.right = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
			}

			return <ChartsItem item={item} type={type} style={style} itemIndex={itemIndex} color={color} />
		}) }
		</div>
	); 
}

const ChartsItem = props => {
	const {item, type, style, itemIndex, color} = props;	
	return (
		<div className={`Charts--item ${type}`} style={ style } key={ itemIndex }	>
		<b style={{ color: color }}>{ item }</b>
		</div>
	);
}

const Legend = props => {
	const {colors, labels} = props.option;

	return (
		<div className="Legend">
			{ labels.map((label, labelIndex) => {
				return (
					<div>
						<span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
						<span className="Legend--label">{ label }</span>
					</div>
				);
			}) }
		</div>
	);
}
