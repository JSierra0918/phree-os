import axios from "axios";

// these are the methods attached to API Util component
export default {
//Send the argument to the api location
  sendLogin: function(loginInfo) {
        const loginInformation = {
            loginInfo
        }
        //Este is just a temp api for now
    return axios.post("/api/este", loginInformation, (response) => {
      console.log(response);
        
    });
  }
};