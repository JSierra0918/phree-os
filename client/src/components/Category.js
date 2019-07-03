import React from 'react';

const Category = (props) => {
    return (
        <div>
            <button type="button" class="btn btn-light" data-id={props.dataid}>{props.item}</button>
        </div>
    );
}

export default Category;
