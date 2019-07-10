import axios from "axios";

export default {
    
    getUserData: function(userID) {

        return axios.get("/api/user/"+ userID);
    },

    getCategoryData: function(userID) {

        return axios.get("/api/category/"+ userID);
    },
    getOneCategory: function(categoryID) {

        return axios.get("/api/category/one/"+ categoryID);
    },
    getItems: function(userID) {

        return axios.get("/api/items/"+ userID);
    },
    postSummary: function(userID, summary) {

        return axios.post("/api/summary/"+ userID, summary, (response) => {
            console.log(response);
        });
    },
    putItems: function(itemID, itemsUpdate) {

        return axios.put("/api/items/"+ itemID, itemsUpdate, (response) => {
            console.log(response);
        });
    },
    postStripe: function(code) {

        return axios.post("/api/stripe", code, (response) => {
            console.log(response);
        });
    },
    postCategory: function(userID, category) {

        console.log(category)
        return axios.post("/api/category/"+ userID, category, (response) => {
            console.log(response);
        });
    }
}