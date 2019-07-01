import axios from "axios";

// these are the methods attached to API Util component
export default {
//Send the argument to the api location
  sendLogin: function(loginInfo) {
      
        //Este is just a temp api for now
    return axios.post("/api/este", loginInfo, (response) => {
      console.log(response);
        
    });
  }
};