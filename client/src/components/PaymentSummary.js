import React from 'react';

function PaymentSummary(props) {
    console.log(props.paymentList)
    return (
        <div className="summary text-center mb20">
            <h5>Payment Summary</h5>
            {/* Get summary list array and map through it.  First, just have it populate. 2nd, maybe popluate if it has an item. Somehow try and update the same item on each click */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.paymentList.map(item =>
                        <tr onChange={props.incrementItem()} >
                            <td>{item.itemname}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            {item.id} {props.incrementItem()}
                        </tr>)}
                </tbody>
                <button className="btn" >Pay</button>
            </table>

        </div>

    )
}
export default PaymentSummary;