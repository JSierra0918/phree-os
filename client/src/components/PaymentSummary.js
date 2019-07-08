import React from 'react';
import API from '../utils/API';
// import ReactTable fom 'react-table';

function PaymentSummary(props) {

    function tableToObj(event, urTable) {
        console.log('event:', event.target);
        event.preventDefault();
        const table = document.getElementById('summary-table');

        const rows = table.rows;
        const propCells = rows[0].cells;
        let propNames = [];
        let paymentSummary = [];
        let obj, row, cells;
      
        // Use the first row for the property names
        // Could use a header section but result is the same if
        // there is only one header row
        for (var i=0, iLen=propCells.length; i<iLen; i++) {
          propNames.push(propCells[i].textContent || propCells[i].innerText);
        }
      
        // Use the rows for data
        // Could use tbody rows here to exclude header & footer
        // but starting from 1 gives required result
        for (var j=1, jLen=rows.length; j<jLen; j++) {
          cells = rows[j].cells;
          obj = {};
          
      
          for (var k=0; k<iLen; k++) {
            obj[propNames[k]] = cells[k].textContent || cells[k].innerText;
          }
         
          paymentSummary.push(obj)
        }
        console.log('paymentSummary:', paymentSummary);
        const userId = sessionStorage.getItem('userId');

        API.postSummary(userId, paymentSummary).then((response) => {
            console.log(response.data);

            // Clear Summary table
            // Send the response to update the Items from the data table       
        });
          
        return paymentSummary;
      }

    return (
        <div className="summary text-center mb20">
            <h5>Payment Summary</h5>
            {/* Get summary list array and map through it.  First, just have it populate. 2nd, maybe popluate if it has an item. Somehow try and update the same item on each click */}
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
                    {props.paymentList.map(item =>
                        <tr key={item.id} dataid={item.id}>
                            <td >{item.itemname}</td>
                            <td >{props.count}</td>
                            <td >{item.price}</td>
                            <td onClick={() => props.deleteRow(item.id)} >
                                <i className="fa fa-trash delete-icon" aria-hidden="true">trash</i>
                            </td>
                        </tr>)}
                </tbody>
            </table>

            {/* if items exist show button */}
            <button className="btn" onClick={tableToObj}>Pay</button>
        </div>

    )
}
export default PaymentSummary;