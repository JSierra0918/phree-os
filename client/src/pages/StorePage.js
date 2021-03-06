import React, { Component } from "react";
import "./styles/storepage.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavTab, NavItem } from "../components/Bootstrap/NavTab";
import { Container, Row, Col } from "../components/Bootstrap/Grid";
import API from "../utils/API";
import CategoryContainer from "../components/CategoryContainer";
import PaymentSummary from "../components/PaymentSummary";
import ManagePage from "./ManagePage";
import ModalPaymentWrapper from "../components/ModalPaymentWrapper";
import ModalWelcomeWrapper from "../components/ModalWelcomeWrapper";
import ModalPayment from "../components/ModalPayment";
import ItemContainer2 from "../components/ItemContainer2";
import ModalWelcome from "../components/ModalWelcome";

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calc: undefined,
      catID: undefined,
      category: [],
      items: [],
      paymentList: [],
      count: 0,
      total: 0,
      payment: false,
      hasStripe: true,
      checkoutObj: {},
      categoryIsSelected: false,
      chartData: {},
      summarySaleItems: [],
      ssNames: [],
      ssTotal: 0,
      ssQuantity: [],


    };
    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    //find out if the ID is connected to a stripe account
    this.getUserData();
    // sessionStorage.clear()
    if (sessionStorage.getItem("names")) {
      
        let sessionStorageTotal = sessionStorage.getItem("total")

      let names = sessionStorage.getItem("names")
      if (sessionStorage.getItem("quantity")) {
        let quantity = sessionStorage.getItem("quantity");
        let quantityInt = [];
        var jsonQuantity = JSON.parse(quantity);
        for (let i = 0; i < jsonQuantity.length; i++) {
          quantityInt.push(parseFloat(jsonQuantity[i]));
        }

        this.displayPaymentSummary(quantityInt, names, parseFloat(sessionStorageTotal).toFixed(2));
      }
    }
    //find the ID of the user and check to see if he has store.  If he has a store, load the items else make a store.
  }

  openModalHandler = paid => {
    this.setState({
      payment: true
    });
  };

  closeModalHandler = paid => {
    this.setState({
      payment: false
    });
  };

  makePayment = paid => {
    this.setState({
      payment: paid
    });
    if (this.state.payment) {
      this.openModalHandler();
      // return  <ModalPayment/>
    }
  };

  getUserData = () => {
    const userId = sessionStorage.getItem("userId");

    API.getUserData(userId).then(userResponse => {
      var boolean = userResponse.data.hasStripe;
      if (boolean === false) {
        this.setState({
          hasStripe: boolean
        });
      }

      if (!userResponse.data.storename) {
        // go to create store
      } else {
        API.getCategoryData(userId).then(categories => {
          // update the state with the categories, remember is an array
          // it is going to render
          this.setState(state => {
            return { category: (state.category = categories.data) };
          });
        });
      }
    });
  };

  selectCategory = id => {
    //set the state of the category based off of the name
    API.getOneCategory(id).then(category => {
      //find items and return the array possibly pass it as an argument for displayItem.
      if (!category.data.id) {
        return;
      } else {
        this.grabItems(category.data.id);
      }
    });
  };

  grabItems = catID => {
    //when category is returned, then create a call based off
    API.getItems(catID).then(returnedItems => {
      this.setState({
        items: returnedItems.data.map(item => {
          item.orginalQuantity = item.quantity;
          return item;
        }),
        catID: catID
      });
      //If you're role is 1 (manager) then make the categoryIsSelected to true.
      // this.categoryIsSelected();
    });
  };

  totalPrice = () => {
    let total = this.state.paymentList.reduce(
      (a, b) => {
        return { price: parseFloat(a.price) + parseFloat(b.price) };
      },
      { price: 0 }
    ).price;

    this.setState({
      total: parseFloat(total).toFixed(2)
    });
  };

  subtractPrice = deletedItem => {
    const currentTotal = this.state.total;
    const deletedItemTotal = deletedItem[0].price;
    const newTotal = currentTotal - deletedItemTotal;

    this.setState({
      total: newTotal.toFixed(2)
    });
  };

  addItem = selectedItem => {
    // e.stopPropagation();
    const statePaymentList = this.state.paymentList;

    //if Quantity of item has reached 0, return Item is zero and add a Class of strikethrough
    //Find index of specific object using findIndex method.
    let objIndex = statePaymentList.findIndex(
      obj => obj.id === selectedItem.id
    );
    if (objIndex > -1) {
      //if the counter equals the quantity then there are no more of this item, make it disabled
      if (selectedItem.quantity === 0) {
        // TODO: SHow Isabela
        //set the item quantity to 0
        selectedItem.quantity = 0;
        return;
      }

      // make new object of updated object.
      let updatedItem = {
        ...statePaymentList[objIndex],
        price: (
          parseFloat(this.state.paymentList[objIndex].price) +
          parseFloat(selectedItem.price)
        ).toFixed(2),
        counter: statePaymentList[objIndex].counter + 1
      };
      // //Add a count to the array
      updatedItem = { ...updatedItem, count: statePaymentList.count + 1 };

      let updatedItems = [
        ...statePaymentList.slice(0, objIndex),
        updatedItem,
        ...statePaymentList.slice(objIndex + 1)
      ];

      //Update object's name property.
      this.setState(
        state => {
          return { paymentList: (state.paymentList = updatedItems) };
        },
        () => {
          this.totalPrice();
        }
      );

      // reset objIndex
      objIndex = -1;
    } else {
      // //UPDATE STATE HERE
      // let addedItem = this.state.paymentList.concat(selectedItem);
      if (selectedItem.quantity === 0) {
        // TODO: SHow Isabela
        //set the item quantity to 0
        selectedItem.quantity = 0;
        alert("You're all out of " + selectedItem.itemname);
        return;
      }
      const newList = [...this.state.paymentList];
      newList.push(selectedItem);

      this.setState(
        {
          paymentList: newList
        },
        () => {
          this.totalPrice();
        }
      );
    }
  };

  incrementItem = () => {
    let count = this.state.count;
    count++;
    this.setState({
      count: count
    });
  };

  deleteRow = id => {
    // create a variable based off of statePaymentList, possibly not to grab the exact state
    const statePaymentList = this.state.paymentList;
    //create obj based off of what the state paymentList is
    let updatedItem = statePaymentList.filter(item => {
      return item.id !== id;
    });

    let deletedItem = statePaymentList.filter(item => {
      return item.id === id;
    });

    let retainItemQuantity = this.state.items.map(item => {
      if (deletedItem[0].id === item.id) {
        item.quantity = item.orginalQuantity;
      }
      return item;
    });

    this.setState(
      {
        paymentList: updatedItem,
        catID: deletedItem[0].CategoryId
      },
      () => {
        this.subtractPrice(deletedItem);
      }
    );

    this.setState(state => {
        
        return {items: state.items = retainItemQuantity}
    })
  };

  clearSummary = emptyArr => {
    //get an empty parameter that clears paymentList and resets items.
    let retainItemQuantity = this.state.items.map(item => {
      item.quantity = item.orginalQuantity;
      return item;
    });

    this.setState((state, props) => {
      return {
        paymentList: (state.paymentList = emptyArr),
        total: 0,
        items: (state.items = retainItemQuantity)
      };
    });
  };

  deleteCategory = (e, id) => {
    e.stopPropagation();
    // create a variable based off of statePaymentList, possibly not to grab the exact state
    const stateCategory = this.state.category;
    //create obj based off of what the state paymentList is
    let updatedItem = stateCategory.filter(item => {
      return item.id !== id;
    });

    //Update the category DB
    API.deleteCategory(id).then(response => {
      this.setState(state => {
        return { category: (state.category = updatedItem) };
      });
    });
  };

  deleteItem = (e, id) => {
    e.stopPropagation();
    // create a variable based off of statePaymentList, possibly not to grab the exact state
    const stateItems = this.state.items;
    //create obj based off of what the state paymentList is
    let updatedItem = stateItems.filter(item => {
      return item.id !== id;
    });

    //Update the category DB
    API.deleteItems(id).then(response => {
      this.setState(state => {
        return { items: (state.items = updatedItem) };
      });
    });
  };

  addCategory = () => {
    const userId = sessionStorage.getItem("userId");
    //grab value
    var inp = document.getElementById("catInput");
    var val = inp.value.trim();
    const whiteSpace = " ";

    if (val === whiteSpace.trim()) {
      // TODO: check with Isabel
      alert("Must have a category name");
      return;
    }
    //If name exists propmt user to create a new name
    for (let i = 0; i < this.state.category.length; i++) {
      let element = this.state.category[i];
      let stripedElementName = element.categoryName
        .replace(" ", "")
        .toLowerCase();
      if (
        stripedElementName.trim() ===
        val
          .replace(" ", "")
          .toLowerCase()
          .trim()
      ) {
        // TODO: Check with isabel
        alert("You've already got a category by that name");

        return;
      }
    }

    let newCategory = {
      UserId: userId,
      categoryName: val
    };

    API.postCategory(userId, newCategory).then(response => {
      //copy and generate a new array for the categories
      let newCatArr = [...this.state.category];

      newCatArr.push(response.data);

      this.setState(state => {
        return { category: (state.category = newCatArr) };
      });
    });
    //empty value
    inp.value = "";
  };

  addNewItem = (e, catID, itemObj) => {
    e.stopPropagation();

    API.postNewItem(catID, itemObj).then(responseItem => {
      //grab the response and set it to the state.
      //add originalQuantity to the item retreived.

        let newItemList = responseItem.data.map(item => {
          item.orginalQuantity = item.quantity;
          return item;
        })

      this.setState(state => {
        return { items: (state.items = newItemList) };
      });
    });
  };

  setCategories = categories => {
    this.setState({
      category: categories
    });
  };

  getQuantityUpdate = checkoutObj => {
    this.setState({
      checkoutObj: checkoutObj
    });
  };

  categoryIsSelected = () => {
    if (this.props.role === "1") {
      return this.setState(state => {
        return { categoryIsSelected: (state.categoryIsSelected = true) };
      });
    }

    return this.setState({ categoryIsSelected: false });
  };

  routeToStore = () => {
    let path = `store`;
    this.props.history.push(path);
  };

  updateItemQuantity = (id, updatedQuantity) => {
    let decreasedItems = this.state.items.map(item => {
      if (id === item.id) {
        if (updatedQuantity <= 0) {
          item.quantity = 0;
        } else {
          item.quantity = updatedQuantity;
        }
      }
      return item;
    });

    this.setState(state => {
      return { items: (state.items = decreasedItems) };
    });
  };

  logout = () => {
    API.logout();
  };

  stopReloadOnInput = e => {
    e.preventDefault();
  };

  getPaymentSummary = (payment) => {

    let ssNames = this.state.ssNames;
    let ssQuantity = this.state.ssQuantity;
    let names = [...ssNames];
    let quantity = [...ssQuantity];
    let total = this.state.total
    let currentSavedtotal = this.state.ssTotal
    let newTotal = total + currentSavedtotal
    sessionStorage.setItem('total', newTotal) ;


    for (let i = 0; i < payment.length; i++) {
      if (names.includes(payment[i].Item)) {
        let index = names.indexOf(payment[i].Item);
        quantity[index] = quantity[index] + parseInt(payment[i].Quantity);
      } else {
        names.push(payment[i].Item);
        quantity.push(parseInt(payment[i].Quantity));
      }
    }
        sessionStorage.setItem("names", names);
        sessionStorage.setItem("quantity", JSON.stringify(quantity));
  };

  displayPaymentSummary = (quantity, names, total) => {
    var string = names.split(",");
    var array = [];
    for (let i = 0; i < string.length; i++) {
      array.push(string[i]);
    }
    this.setState({
      ssTotal: total,
      ssNames: array,
      ssQuantity: quantity
    });
    let numberSet = [...quantity]
    numberSet.push(0)
    let newData = {
      labels: array,
      datasets: [
        {
          label: "Sales Summary",
          backgroundColor: this.randomColor(quantity),
          borderColor: "rgba(255, 96, 41, .2)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(10, 91, 153, .5)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: numberSet
        }
      ]
    };

    this.setState({
      chartData: newData
    });

  };

  randomColor =(int)=> {
    const letters = "0123456789ABCDEF"; 
  
    // html color code starts with # 
    let color = '#'; 
    // generating 6 times as HTML color code consist 
    // of 6 letter or digits 
    let colorArr = []
    let map = int.map((item) => {
        
        for (let i = 0; i < 6; i++) {
            
            color += letters[(Math.floor(Math.random() * 16))]; 
        }
        colorArr.push(color)
        color = '#'
                
    })
    return colorArr
  }
  render() {
    return (
      <div className="col-md-12 main-row">
        <p />
        <div className="row">
          <Col size="md-10">
            <p className="p-logo">
              <span className="phree-logo">Phree-</span>
              <span className="o-logo">O</span>
              <span className="s-logo">S</span>
            </p>
          </Col>
          <Col size="md-2">
            <button onClick={this.logout} className="logout-btn">
              LogOut
            </button>
          </Col>
        </div>
        <div className="row mid-section">
          <Col size="md-6">
            <PaymentSummary
              paymentList={this.state.paymentList}
              count={this.state.count}
              deleteRow={this.deleteRow}
              clearSummary={this.clearSummary}
              total={this.state.total}
              makePayment={this.makePayment}
              reload={this.getUserData}
              getQuantityUpdate={this.getQuantityUpdate}
              role={this.props.role}
              chartData={this.state.chartData}
            />
          </Col>
          <Col size="md-3">
            <CategoryContainer
              category={this.state.category}
              id={this.state.catID}
              onClick={this.selectCategory}
              role={this.props.role}
              delete={this.deleteCategory}
              edit={this.editCategory}
              editable={this.state.editable}
              reload={this.getUserData}
              addCategory={this.addCategory}
              setCategories={categories => {
                this.setCategories(categories);
              }}
            />
          </Col>
          <Col size="md-3">
            <ItemContainer2
              items={this.state.items}
              id={this.state.catID}
              addItem={this.addItem}
              role={this.props.role}
              delete={this.deleteItem}
              edit={this.editCategory}
              editable={this.state.editable}
              reload={this.getUserData}
              catID={this.state.catID}
              grabItems={this.grabItems}
              addNewItem={this.addNewItem}
              updateItemQuantity={this.updateItemQuantity}
              // categoryIsSelected={this.state.categoryIsSelected}
            />
          </Col>
          <ModalPaymentWrapper show={this.state.payment}>
            <ModalPayment
              //   show={this.state.payment}
              close={this.closeModalHandler}
              open={this.openModalHandler}
              total={this.state.total}
              userId={sessionStorage.getItem("userId")}
              checkoutObj={this.state.checkoutObj}
              reload={this.routeToStore}
              getPaymentSummary={this.getPaymentSummary}
            />
          </ModalPaymentWrapper>

          <ModalWelcomeWrapper show={this.state.hasStripe}>
            <ModalWelcome
              //   show={this.state.hasStripe}
              close={this.closeModalWelcomeHandler}
              open={this.openModalHandler}
              hasStripe={this.state.hasStripe}
            />
          </ModalWelcomeWrapper>
        </div>
      </div>
    );
  }
}

export default StorePage;