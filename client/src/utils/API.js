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
    }
}