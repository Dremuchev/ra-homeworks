const newDate = document.getElementById('myDate');
const sendDate = document.getElementById('sendDate');
sendDate.addEventListener('click', (event) => {
    event.preventDefault();
    ReactDOM.render(
        <Calendar date={newDate.value} />,
        document.getElementById('root')
    );
})


function Calendar(props) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    const temp = props.date.toLocaleString("ru", options).split('.');
    const currentDate = new Date(temp[2], temp[1] - 1, temp[0]);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();
    const monthName = currentDate.toLocaleString("ru", { month: 'long' });
    const dayName = currentDate.toLocaleString("ru", { weekday: 'long' });
    const firstDay = new Date(year, month, 1);
    const firstWeekDay = firstDay.getDay();
    const oneHour = 1000 * 60 * 60;
    const oneDay = oneHour * 24;
    const nextMonth = new Date(year, month + 1, 1);
    const lastDate = Math.ceil((nextMonth.getTime() - firstDay.getTime() - oneHour) / oneDay);
    const lastMonth = new Date(year, month - 1, 1);

    const monthArray = [];
    let weekArray = [];
    let isEmpty = true;
    let otherDays = 0;

    for (let count = 1; count <= lastDate;) {
        if (isEmpty) {
            for (let daysBefore = -5; daysBefore < 2; daysBefore++) {
                let weekBefore = new Date(year, month, daysBefore);
                if (lastMonth.getMonth() !== month && weekBefore.getDate() !== 1) {
                    if (weekBefore.getDay() === 0) {
                        weekArray = [];
                    } else {
                        weekArray.push({ 'className': "ui-datepicker-other-month", 'number': weekBefore.getDate() });
                    }
                }
            }
            isEmpty = false;
        } else {
            for (let empty = 7 - weekArray.length; weekArray.length < 7; empty--) {
                if (count === today && count !== lastDate) {
                    weekArray.push({ 'className': "ui-datepicker-today", 'number': count });
                    count++;
                } else if (count > lastDate) {
                    weekArray.push({ 'className': "ui-datepicker-other-month", 'number': ++otherDays });
                    count++;
                } else {
                    weekArray.push({ 'number': count });
                    count++;
                }
            }
            monthArray.push(weekArray.map((day, tdIndex) => <td key={'td' + tdIndex} className={day.className || {}}>{day.number}</td>));
            weekArray = [];
        }
    }

    const item = monthArray.map((week, trIndex) => <tr key={'tr' + trIndex}>{week}</tr>);

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{dayName[0].toUpperCase() + dayName.slice(1)}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{today}</div>
                    <div className="ui-datepicker-material-month">{currentDate.toLocaleString("ru", { day: 'numeric', month: 'long' }).toUpperCase().slice(2)}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{monthName[0].toUpperCase() + monthName.slice(1)}</span>&nbsp;
          <span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col className="ui-datepicker-week-end"></col>
                    <col className="ui-datepicker-week-end"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {item}
                </tbody>
            </table>
        </div>
    );
}

const now = new Date();

ReactDOM.render(
    <Calendar date={now} />,
    document.getElementById('root')
);

const canvas = document.getElementById('wall');
canvas.width = window.clientWidth;
canvas.height = window.clientHeight
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
ctx.strokeStyle = '#203a58';
const curves = [];

function getCross(x, y, size, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5 * size;
    size = 20 * size;
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(angle);
    ctx.translate(- (x + size / 2), - (y + size / 2));
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(x + size, y + size / 2);
    ctx.stroke();
    ctx.restore();
}

function getCircle(x, y, size) {
    ctx.beginPath();
    ctx.lineWidth = 5 * size;
    size = 12 * size;
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    ctx.stroke();
}

function createObjects() {
    const quanity = getRandom(50, 200);
    for (let i = 0; i < quanity; i++) {
        const item = {};
        item.nextPoint = getTimeFunc();
        item.x = getRandom(5, canvas.width - 5);
        item.y = getRandom(5, canvas.height - 5);
        item.size = getRandom(0.1, 0.6, 2);
        if (i < quanity / 2) {
            item.func = getCross;
            item.type = 'cross';
            item.stepAngle = getRandom(0, 1) ? getRandom(0, 0.2, 2) : getRandom(0, 0.2, 2) * -1;
            item.currentAngle = 0;
        } else {
            item.func = getCircle;
            item.type = 'circle';
        }
        curves.push(item);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.forEach(item => {
        const coords = item.nextPoint(item.x, item.y, Date.now());
        item.func(coords.x, coords.y, item.size, item.currentAngle += item.stepAngle);
        if (item.currentAngle >= 2 * Math.PI || item.currentAngle <= -2 * Math.PI)
            item.currentAngle = 0;
    });
}

function getTimeFunc() {
    let value = getRandom(0, 1);
    if (value === 0) {
        return function (x, y, time) {
            return {
                x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
                y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
            };
        }
    } else {
        return function (x, y, time) {
            return {
                x: x + Math.sin((x + (time / 10)) / 100) * 5,
                y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
            }
        }
    }
}

function getRandom(min, max, digits = 0) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
}

createObjects();

let frameCount = 0;

function tick() {
    if (frameCount === 3) {
        animate();
        frameCount = 0;
    }
    frameCount++;
    requestAnimationFrame(tick);
}

tick();