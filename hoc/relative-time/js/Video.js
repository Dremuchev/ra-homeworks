'use strict';

const Video = props => {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
};

const DateTimePretty = withFormatingDate(DateTime);

function withFormatingDate(Component) {
    return class extends React.Component {
        getMinuteDescription(timeAgo) {
            if (
                timeAgo === 1 ||
                timeAgo === 21 ||
                timeAgo === 31 ||
                timeAgo === 41 ||
                timeAgo === 51
            ) {
                return timeAgo + ' минута назад';
            } else if (
                (timeAgo > 1 && timeAgo < 5) ||
                (timeAgo > 21 && timeAgo < 25) ||
                (timeAgo > 31 && timeAgo < 35) ||
                (timeAgo > 41 && timeAgo < 45) ||
                (timeAgo > 51 && timeAgo < 55)
            ) {
                return timeAgo + ' минуты назад';
            } else {
                return timeAgo + ' минут назад';
            }
        }

        getHourDescription(timeAgo) {
            if (
                timeAgo === 1 ||
                timeAgo === 21 ||
                timeAgo === 31 ||
                timeAgo === 41 ||
                timeAgo === 51
            ) {
                return timeAgo + ' час назад';
            } else if (
                (timeAgo > 1 && timeAgo < 5) ||
                (timeAgo > 21 && timeAgo < 25) ||
                (timeAgo > 31 && timeAgo < 35) ||
                (timeAgo > 41 && timeAgo < 45) ||
                (timeAgo > 51 && timeAgo < 55)
            ) {
                return timeAgo + ' часа назад';
            } else {
                return timeAgo + ' часов назад';
            }
        }

        getDaysDescription(timeAgo) {
            if (
                timeAgo === 1 ||
                timeAgo === 21 ||
                timeAgo === 31
            ) {
                return timeAgo + ' день назад';
            } else if (
                (timeAgo > 1 && timeAgo < 5) ||
                (timeAgo > 21 && timeAgo < 25)
            ) {
                return timeAgo + ' дня назад';
            } else {
                return timeAgo + ' дней назад';
            }
        }

        getMonthDescription(timeAgo) {
            if (
                timeAgo === 1
            ) {
                return timeAgo + ' месяц назад';
            } else if (timeAgo > 1 && timeAgo < 5) {
                return timeAgo + ' месяца назад';
            } else {
                return timeAgo + ' месяцев назад';
            }
        }

        getYearDescription(timeAgo) {
            if (
                timeAgo === 1 ||
                timeAgo === 21
            ) {
                return timeAgo + ' год назад';
            } else if (
                (timeAgo > 1 && timeAgo < 5) ||
                (timeAgo > 21 && timeAgo < 25)
            ) {
                return timeAgo + ' года назад';
            } else {
                return timeAgo + ' лет назад';
            }
        }

        getFormatedDate(date) {
            const millisecondsHasPassed = Date.now() - (new Date(date)).getTime();
            const hoursAgo = millisecondsHasPassed / 1000 / 60 / 60;
            if (hoursAgo < 1) {
                return this.getMinuteDescription(Math.floor(hoursAgo * 60));
            } else if (hoursAgo >= 1 && hoursAgo < 24) {
                return this.getHourDescription(Math.floor(hoursAgo));
            } else if (hoursAgo > 24 && hoursAgo < 24 * 31) {
                return this.getDaysDescription(Math.floor(hoursAgo / 24));
            } else if (hoursAgo > 24 * 31 && hoursAgo / 24 < 365) {
                return this.getMonthDescription(Math.floor(hoursAgo / 24 / 31));
            } else if (hoursAgo / 24 > 365) {
                return this.getYearDescription(Math.floor(hoursAgo / 24 / 31 / 12));
            }
        }

        render() {
            return <Component date={this.getFormatedDate(this.props.date)} />;
        }

    };
}
