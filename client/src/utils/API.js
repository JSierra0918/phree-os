import axios from "axios";

export default {
    
    getUserData: function(userID) {

        return axios.get("/api/user/:id");
    }
}