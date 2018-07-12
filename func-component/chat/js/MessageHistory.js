'use strict';

function MessageHistory({list}) {
    const create = (item) => {
        if (item.type === 'response') {
            return (<Response from={item.from} message={item} key = {item.id}/>)
        }
        if (item.type === 'message') {
            return (<Message from={item.from} message={item} key = {item.id}/>)
        }
        if (item.type === 'typing') {
            return (<Typing from={item.from} message={item} key = {item.id}/>)
        }
    }

    return (
        list.length ? <ul>{list.map(el => create(el))}</ul> : null
    )
}

MessageHistory.defaultProps = {
    list: []    
}