const TextRenderLine = ({ value, onChange }) => {
    const changeHandler = event => {
        let currentValue = event.currentTarget.value;
        const symbolReg = /^[a-z\s]+$/i;
        if (!symbolReg.test(currentValue)) {
            currentValue = currentValue.replace(currentValue[currentValue.length - 1], '');
        }
        currentValue = currentValue.toLowerCase();
        onChange(currentValue)
    };

    return ( <
        div className = "type-text" >
        <
        textarea name = "text"
        id = "font-text"
        cols = "30"
        rows = "2"
        placeholder = "Введите текст для футболки"
        onChange = { changeHandler }
        value = { value }
        /> <
        /div>
    );
};