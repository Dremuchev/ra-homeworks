const FontSelector = ({ fonts, selectedFont, onSelect }) => {
    return ( 
        <div className = "font-picker"> {
            fonts.map(item => {
                return (
                    <ItemFont
                    item = { item }
                    onSelect = { onSelect }
                    checked = { selectedFont && selectedFont.name === item.name }
                    />
                )
            })
        } </div>
    )
};

const ItemFont = ({ item, onSelect, checked }) => {
    const { name, path } = item;

    return (
        <div className = "grid center font-item">
            <input type="radio" name="font" value={name} id={name} 
                onChange={() => onSelect(item)}
                defaultChecked={checked} />
            <label htmlFor={name} className="grid-1">
                <PictureFont text={name.replace(name[name.length - 1], '')} path={path} />
            </label>
        </div>
    );
};
