import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Items from './Items';

class ItemsContainer extends Component {
    constructor(props){
        super(props);

        this.state ={
            itemsList: this.props.items
        }
    }

    componentDidMount(){
        console.log(this.props.items);
        this.setState({itemsList: this.props.items});
    }

    renderItems(){

        console.log("i think so ", this.props.items);

        return  this.state.itemsList.map(item => <Items  dataid={item.id} key={item.id} item={item.categoryName} className="btn btn-light" style={this.state.style} />)
    }
    render() {
        return (
            
                <div className="items text-center p-main-col mb20">
                    <h5>Items</h5>
                    {/* //render a category button */}
                    {this.renderItems()}
                    {this.props.items.map(item => {
                        return <div> {item.id}</div>
                    })}
                    
                </div>
           
        )
    }

}


export default ItemsContainer;