import axios from "axios";
import { tsPropertySignature } from "@babel/types";

export default {
    
    getUserData: function(userID) {

        return axios.get("/api/user/"+ userID);
    },
    getItems: function(userID) {

        return axios.get("/api/items/"+ userID);
    },
    postSummary: function(userID, summary) {

        return axios.post("/api/summary/"+ userID, summary, (response) => {
            console.log(response);
        });
    },
    putQuanityItem: function(itemID, itemsUpdate) {

        return axios.put("/api/items/one/"+ itemID, itemsUpdate, (response) => {
            console.log(response);
        });
    },
    postStripe: function(code) {

        return axios.post("/api/stripe", code, (response) => {
            console.log(response);
        });
    },
    getCategoryData: function(userID) {

        return axios.get("/api/category/"+ userID);
    },
    getOneCategory: function(categoryID) {

        return axios.get("/api/category/one/"+ categoryID);
    },
    getStripe: function(userID) {

        return axios.get("/api/stripe/" + userID, (response) => {
            
        });
    },
    postCategory: function(userID, category) {

        console.log(category)
        return axios.post("/api/category/one/"+ userID, category, (response) => {
            console.log(response);
        });
    },
    putCategory: function(catID, catUpdate) {

        return axios.put("/api/category/"+ catID, catUpdate, (response) => {
            console.log(response);
        });
    },
    deleteCategory: function(catID, catUpdate) {

        return axios.delete("/api/category/"+ catID, (response) => {
            console.log(response);
        });
    },
    putNewItem: function(itemID, itemsUpdate) {

        return axios.put("/api/items/"+ itemID, itemsUpdate, (response) => {
            console.log(response);
        });
    },
    deleteItems: function(itemID) {

        return axios.delete("/api/items/"+ itemID, (response) => {
            console.log(response);
        });
    },
    postNewItem: function(catID, newIteObj) {
    console.log('newIteObj:', newIteObj)

        return axios.post("/api/items/one/"+ catID, newIteObj, (response) => {
            console.log(response);
        });
    },
    getSpecificItem: function(itemId) {
        return axios.get("/api/items/one/" + itemId, (response) => {
            console.log(response)
        })
    },

    logout: function() {
        return axios.get('/logout', (response ) => {
            
        }).then(() => {
            window.location.replace('/')
            sessionStorage.clear()
        })
    }

}