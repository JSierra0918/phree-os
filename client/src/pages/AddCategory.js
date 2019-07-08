import React, { Component } from "react";
// import './styles/addCategory.css';


export class AddCategory extends React.Component {


  

////// ATTEMPT 3 : :( /////
  //   addCategory(newCategory) {
//     console.log(newCategory);
//   }


//   onSubmit(e) {
//     const newCategory = {
//       name: this.refs.name.value
//     }
//     this.addCategory(newCategory);
//     e.preventdefault();
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.onSubmit.bind(this)}>
//           <div className="input type1">
//             <label htmlFor="name">Name</label>
//             <input type="text" name="name" ref="name" />
//           </div>
//           <input type="submit" value="Save" className="btn" />
//         </form>
//       </div>
//     )
//   }
// }




////// ATTEMP 2 : creating cat form and list //////
//   constructor() {
//     super();
//     this.addCat = this.addCat.bind(this);
//   }

//   addCat(e) {
//     e.preventDefault();
//     var inp = document.getElementById("todoInput");
//     var val = inp.value;
//     inp.value = '';
//     this.props.addCat(val);
//   };
//   render() {
//     return (
//       <div>
//         <div className="todo type1">
//           <form className="input-wrapper" onSubmit={this.addCat}>
//             <input id="todoInput" type="text" className="add-todo" name="add-todo" placeholder="Category name" />
//           </form>
//         </div>
//         <button type="button" onClick={this.addCat} className="add-btn" />
//         {/* <Button onClick={this.addCat} >Add Category</Button> */}
//       </div>
//     )
//   }
// }

// class CatList extends React.Component {
//   constructor() {
//     super();
//     this.remove = this.remove.bind(this);
//     this.edit = this.edit.bind(this);
//     this.state = { activeList: "All" };
//   }

//   remove(e) {
//     this.props.removeCategory(e.target.parentNode.id);
//   }

//   edit(e) {
//     this.props.editCategory.bind(this);
//   }

//   render() {
//     const categories = this.props.myList.map((elem, i) => {
//       let category_id = 'category_' + i;
//       if (this.state.activeList === "All") {
//         return (
//           <li key={i} id={category_id} className={elem.status}>
//             <span className="id">{i + 1}</span>
//             <span className="title">{elem.text}</span>
//             <span className="delete" onClick={this.remove}></span>
//           </li>
//         )
//       }
//     });

//     return (
//       <div>
//         <div className="todo-list type1">
//           <ul>
//             {categories}
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }

/////ATTEMPT 1 : SAVE EDIT VERSION /////////
// class AddCategory extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {text: '', inputText: '', mode:'view'};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSave = this.handleSave.bind(this);
//     this.handleEdit = this.handleEdit.bind(this);
//   }

//   handleChange(e) {
//     this.setState({ inputText: e.target.value });
//   }

//   handleSave() {
//     this.setState({text: this.state.inputText, mode: 'view'});
//   }

//   handleEdit() {
//     this.setState({mode: 'edit'});
//   }

//   render () {
//     const view = this.state.mode === 'view';

//     return (
//       <div>
//         <p>Text: {this.state.text}</p>

//         {
//           view
//           ? null
//           : (
//             <p>
//               <input
//                 onChange={this.handleChange}
//                 value={this.state.inputText} />
//             </p>
//           )
//         }

//         <button
//           onClick={
//             view 
//               ? this.handleEdit 
//               : this.handleSave
//           }
//         >
//           {view ? 'Edit' : 'Save'}
//         </button>
//       </div>
//     );
//   }
// }

export default AddCategory;

