import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Items from './Items';

function ItemsContainer(props) {

    // add decimals to the number
    const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2
      })

    return (
        <div className="items text-center p-main-col mb20">
            <h5>Items</h5>
            <ul>
                {props.items.map(item =>
                    <li dataid={item.id} key={item.id}
                        onClick={() => props.addItem(item)}
                        className="items-li"  >
                        <h6>
                            {item.itemname}
                        </h6>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex item-highlight">
                                <span>Q:</span><p>{item.quantity}</p>
                            </div>
                            <div className="d-flex item-highligh">
                                <span>$</span><p>{ formatter.format(item.price)}</p>
                            </div>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default ItemsContainer;