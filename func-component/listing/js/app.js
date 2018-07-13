'use strict';

const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/etsy');
    xhr.send();
    xhr.addEventListener('load', () => resolve(JSON.parse(xhr.responseText)));
})

const currencyCode = (code) => {
    if (code === 'USD') {
        return '\u0024';
    } else if (code === 'EUR') {
        return '\u20AC';
    } else {
        return `${code} `;
    }
}

const titleSlice = (title) => {
    const string = title.split('').map((el, index) => index <= 50 ? el : null).join('');
    return string.length <= 50 ? string : string.slice(0, 50) + '...';
}

const quanityClass = (quantity) => {
    if (quantity <= 10) {
        return 'item-quantity level-low';
    } else if (quantity > 20) {
        return 'item-quantity level-high';
    } else {
        return 'item-quantity level-medium';
    }
}

/*
    level-low — если остаток меньше 10 включительно,
    level-medium — если остаток меньше 20 включительно,
    level-high — если остаток больше 20.
*/

promise
    .then(response => ReactDOM.render(<Listing list={response} />, document.getElementById('root')))

function Listing({list}) {

    const items = list.map(item => (
        <div className="item" key={item.listing_id}>
            <div className="item-image">
                <a href={item.url}>
                    <img src={item.MainImage.url_570xN} />
                </a>
            </div>
            <div className="item-details">
                <p className="item-title">{titleSlice(item.title)}</p>
                <p className="item-price">{currencyCode(item.currency_code)}{item.price}</p>
                <p className={quanityClass(item.quantity)}>{item.quantity} left</p>
            </div>
        </div>
    ));

    return (
        <div className="item-list">
            {items}
        </div>
    )
}

