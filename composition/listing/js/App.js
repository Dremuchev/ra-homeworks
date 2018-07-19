'use strict';

const App = (props) => (
  <main>
    {getItem(props.items)}
  </main>
);

const getItem = items => {
  return items.map(item => {
    switch(item.type) {
      case 'unisex':
        return <Item color="black" item={item} />;
      case 'male':
        return <Item color="blue" item={item} />;
      case 'female':
        return <Item color="orange" item={item} />;
    }
  })
};