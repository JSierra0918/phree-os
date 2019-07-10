import React from 'react';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// import ReactTable fom 'react-table';


function PaymentSummary(props) {

    function tableToObj(event, urTable) {
        event.preventDefault();
        const table = document.querySelector('#summary-table');
        const id = table.getAttribute("dataid");

        const rows = table.rows;
        const propCells = rows[0].cells;
        let propNames = [];
        let paymentSummary = [];
        let obj, row, cells;


        // Use the first row for the property names
        // Could use a header section but result is the same if
        // there is only one header row
        for (var i = 0, iLen = propCells.length; i < iLen; i++) {
            propNames.push(propCells[i].textContent || propCells[i].innerText);
        }

        // Use the rows for data
        // Could use tbody rows here to exclude header & footer
        // but starting from 1 gives required result
        for (var j = 1, jLen = rows.length; j < jLen; j++) {
            cells = rows[j].cells;
            obj = {};
            const id = rows[j].getAttribute("dataid");
            //add id to the obj so we can use it for the Items API
            obj.id = id;

            for (var k = 0; k < iLen; k++) {
                obj[propNames[k]] = cells[k].textContent || cells[k].innerText;
            }

            paymentSummary.push(obj)
        }
        //get User id for summary API
        const userId = sessionStorage.getItem('userId');

        API.postSummary(userId, paymentSummary).then((response) => {
            console.log(response.data);

            // TODO:Send the response to update the Items from the data table  
            //Items only needs ID and quantity...I think.

            //clears the payment list for the client
            props.clearSummary([]);
        });

        // return paymentSummary;
    }
 
    let paymentListArray = props.paymentList.map(item =>
        <tr key={item.id} dataid={item.id}>
            <td >{item.itemname}</td>
            <td >{item.counter}</td>
            <td >{item.price}</td>
            <td onClick={() => props.deleteRow(item.id)} className="delete-icon">
                <FontAwesomeIcon icon="trash-alt" />
            </td>
        </tr>)

    return (
        <div className="summary text-center mb20">
            <div className="table-container">
                <h5>Payment Summary</h5>
                <table className="table" id="summary-table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {paymentListArray}
                    </tbody>
                </table>
            </div>

            {/* if items exist show button */}
            <button className="btn pay" onClick={tableToObj}>Pay</button>
        </div>

    )
}
export default PaymentSummary;