import axios from "axios";

// these are the methods attached to API Util component
export default {
//Send the argument to the api location
  sendLogin: function(loginInfo) {
  // console.log('loginInfo:', loginInfo)
  
        // const loginInformation 
        
        //Este is just a temp api for now
    return axios.post("/signin", loginInfo, (response) => {
      console.log('loginInfo:', loginInfo)
      console.log(response);
        
    });
  }
};