import React from 'react';

const Category = (props) => {
    return (

        <li {...props} onClick={() => props.onClick(props.dataid)}>{props.item}</li>
    );
}

export default Category;
