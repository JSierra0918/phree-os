import React from 'react';

const Category = (props) => {
    return (
        <div>
            
            <button {...props} onClick={() => props.onClick(props.dataid)}>{props.item}</button>
            {/* <button type="button" className="btn btn-light" data-id={props.dataId} onClick={() => props.onClick(props.dataId)}>{props.item}</button> */}
        </div>
    );
}

export default Category;
