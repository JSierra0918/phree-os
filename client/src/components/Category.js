import React from 'react';

const Category = (props) => {
    return (
        <div>
            <button type="button" class="btn btn-light" data-id={props.dataId} onClick={() => props.onClick(props.dataId)}>{props.item}</button>
        </div>
    );
}

export default Category;
