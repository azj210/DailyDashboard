// import React from 'react';
// import lifecycle from 'react-pure-lifecycle';

// const componentWillMount = async() => {
//     // async function checkAuth() {
//       const token = localStorage.getItem('decisionMakerToken');
//       if (token) {
//         const response = await DataService.checkToken(token)
//           .catch(e => {
//             console.log(e);
//           });
//         if (response.data.success === 1) {
//           console.log("success");
//           setAuthenticated(true);
//         } else {
//           console.log("failed");
//           setAuthenticated(false);
//         }
//       } else {
//         console.log("no token");
//         setAuthenticated(false);
//       }
//     // }
//   }

//   const methods = {
//     componentDidMount(props) {
//       console.log('I mounted! Here are my props: ', props);
//     }
//   };

// export default componentWillMount;