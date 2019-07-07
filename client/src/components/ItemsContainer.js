import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Items from './Items';

function ItemsContainer(props) {
    const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2
      })
      
      formatter.format(1000) // "$1,000.00"
      formatter.format(10) // "$10.00"
      formatter.format(123233000) // "$123,233,000.00"

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
                                <span>$:</span><p>{ formatter.format(item.price)}</p>
                            </div>

                        </div>
                    </li>)}
            </ul>
            {/* <button className="btn btn-light" > {(props.items[0] && props.items[0].itemname) || "There are no categories selected"}</button> */}
        </div>
    )
}

// class ItemsContainer extends Component {
//     constructor(props){
//         super(props);

//         this.state ={
//             itemsList: this.props.items
//         }
//     }

//     componentDidMount(){
//         console.log(this.props.items);
//         this.setState({itemsList: this.props.items});
//     }

//     renderItems(){

//         console.log("i think so ", this.props.items);

//         return  this.state.itemsList.map(item => <Items  dataid={item.id} key={item.id} item={item.categoryName} className="btn btn-light" style={this.state.style}  onClick={this.props.onClick} />)
//     }
//     render() {
//         return (

//                 <div className="items text-center p-main-col mb20">
//                     <h5>Items</h5>
//                     {/* //render a category button */   }
//                     {this.renderItems()}
//                     {this.props.items.map(item => {
//                         return <div  dataid={item.id} key={item.id} item={item.categoryName} className="btn btn-light" style={this.state.style}  onClick={this.props.onClick}> {item.id}</div>
//                     })}
//                 </div>

//         )
//     }

// }


export default ItemsContainer;