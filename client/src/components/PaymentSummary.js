import React from 'react';
// import ReactTable fom 'react-table';

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
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody >
                    {props.paymentList.map(item =>
                        <tr key={props.id}>
                            <td key={props.id}>{item.itemname}</td>
                            <td key={props.id}>{props.count}</td>
                            <td key={props.id}>{item.price}</td>
                            <td onClick={() => props.deleteRow(item.id)} key={props.id}>
                                <i className="fa fa-trash delete-icon" aria-hidden="true">trash</i>
                            </td>
                            {item.id} {props.count}
                        </tr>)}
                </tbody>
            </table>

            {/* if items exist show button */}
            <button className="btn" >Pay</button>
        </div>

    )
}
export default PaymentSummary;