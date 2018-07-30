const SearchBox = ({filterBooks}) => {
    return (
        <input
            type = "text"
            placeholder = "Поиск по названию или автору"
            onChange={event => filterBooks(event.currentTarget.value)}
        />
    );
};