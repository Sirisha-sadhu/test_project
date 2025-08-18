import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducers';
import logoutReducer from './reducers/logoutReducers';
import loginReducer from './reducers/loginReducers';
import otpReducer from './reducers/otpReducer';
import kycReducer from "./reducers/kycSlice";


const store = configureStore({
    reducer: {
        login: loginReducer,
        otp: otpReducer,
        register: registerReducer,
        logout: logoutReducer,
        kyc: kycReducer,
    },
});

export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import registerReducer from "./reducers/registerReducers";
// import logoutReducer from "./reducers/logoutReducers";
// import loginReducer from "./reducers/loginReducers";
// import kycReducer from "./reducers/kycSlice";
// import adminReducer from './reducers/adminSlice';
// import userReducer from "./reducers/userSlice";

// const store = configureStore({
//   reducer: {
//     login: loginReducer,
//     register: registerReducer,
//     logout: logoutReducer,
//     kyc: kycReducer,
//        admin: adminReducer,
//         users: userReducer,
//   },
// });

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import registerReducer from "./reducers/registerReducers";
// import logoutReducer from "./reducers/logoutReducers";
// import loginReducer from "./reducers/loginReducers";
// import kycReducer from "./reducers/kycSlice";
// import adminReducer from "./reducers/adminSlice";
// import userReducer, { replace } from "./reducers/userSlice"; 


// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("reduxState");
//     if (serializedState === null) return undefined;
//     return { users: JSON.parse(serializedState) }; 
//   } catch (err) {
//     console.error("Error loading state:", err);
//     return undefined;
//   }
// };

// const store = configureStore({
//   reducer: {
//     login: loginReducer,
//     register: registerReducer,
//     logout: logoutReducer,
//     kyc: kycReducer,
//     admin: adminReducer,
//     users: userReducer,
//   },
//   preloadedState: loadState(),
// });

// store.subscribe(() => {
//   try {
//     const state = store.getState();
//     localStorage.setItem("reduxState", JSON.stringify(state.users));
//   } catch (err) {
//     console.error("Error saving state:", err);
//   }
// });

// window.addEventListener("storage", (event) => {
//   if (event.key === "reduxState" && event.newValue) {
//     try {
//       const users = JSON.parse(event.newValue);
//       store.dispatch(replace(users));
//     } catch (err) {
//       console.error("Error syncing state:", err);
//     }
//   }
// });

// export default store;

