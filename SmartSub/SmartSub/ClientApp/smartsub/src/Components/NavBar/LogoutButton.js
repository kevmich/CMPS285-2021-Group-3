// import React, {useState} from "react";
// import {Button} from "@material-ui/core";
// import axios from "axios";
// import {Redirect} from "react-router-dom";
//
// const [redirect, setRedirect] = useState(false);
//
// let LogOutAxiosCall = () => {
//     axios({
//         method: 'post',
//         url: '/Auth/Logout',
//         data: {
//         }
//     })
//         .catch(function (error) {// Error case
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.log(error.response.data);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 console.log(error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message);
//             }
//             console.log(error.config);
//         }).then((res) => {
//         if (res.status == 200){
//             setRedirect(true);
//         }
//     })
//         .then(res => {// Success case
//
//             return <Redirect to={'/'}/>
//             // console.log('REEEEEEEEEEEEEEr ' + res)
//             // if(res.response.status === 200){
//             //     console.log("Logout was successful")
//             //     console.log(res);
//             //
//             // }
//         });
// }
//
// const LogoutButton = props => {
//     let { isLoggedIn } = props;
//
//     if (isLoggedIn) {
//         return <button>Logout</button>;
//     } else {
//         return <button>Login</button>;
//     }
// };
//
// export default LogoutButton;