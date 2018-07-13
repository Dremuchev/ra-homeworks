'use strict';

function Stars(props) {
  const count = (typeof (props.count) === 'number' && props.count >= 1 && props.count <= 5) ? props.count : null;
  return (
    count && <ul className="card-body-stars u-clearfix">{new Array(count).fill(<li><Star /></li>)}</ul>
  )
}
