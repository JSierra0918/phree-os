import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Items from './Items';

function ItemsContainer(props) {
    return (
        <div className="items text-center p-main-col mb20">
            <h5>Items</h5>
            {props.items.map(item => <button  dataid={item.id} key={item.id} item={item.itemname} className="btn btn-light" style={props.style}  >{item.itemname}</button>)}
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