class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.canvas;
  }

  drawProgress(progress) {
    const ctx = this.canvas.getContext('2d');
    const canvasWidth = this.canvas.clientWidth;
    const canvasHeight = this.canvas.clientHeight;
    let degrees = 360 * progress / 100;
    let radian = degrees * Math.PI / 180;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.strokeStyle = "#4ca89a";
    ctx.lineWidth = '7';
    ctx.arc(canvasWidth / 2, canvasHeight / 2, 52, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#96d6f4";
    ctx.arc(canvasWidth / 2, canvasHeight / 2, 45, 0, radian, false);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "bold 25px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(`${progress}%`, canvasWidth / 2, canvasHeight / 2);

  }

  componentDidMount() {
    this.drawProgress(0);
  }

  componentWillReceiveProps(nextProps) {
    let progress = nextProps.completed === 1
      ? 0 
      : Math.round(nextProps.completed * 100 / nextProps.total);
    this.drawProgress(progress);
  }

  render() {
    return (
      <canvas 
        id="progressCanvas" 
        width="150" 
        height="120" 
        className="progress" 
        ref={canvas => this.canvas = canvas} 
        style={{ height: 'auto' }} />
    );
  }
}