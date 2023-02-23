import axios from "axios";

const BASE_URL = 'http://localhost:4000'

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true

})

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: {'Content-Type': 'application/json'},
//   withCredentials: true
// })


// export const registerRoute = `${BASE_URL}/api/auth/register`


// export const BASE_URL = "http://localhost:4000";
// export const loginRoute = `${BASE_URL}/api/auth/login`;
// export const registerRoute = `${BASE_URL}/api/auth/register`;
// export const logoutRoute = `${BASE_URL}/api/auth/logout`;
// export const allUsersRoute = `${BASE_URL}/api/auth/allusers`;
// export const sendMessageRoute = `${BASE_URL}/api/messages/addmsg`;
// export const recieveMessageRoute = `${BASE_URL}/api/messages/getmsg`;
// export const setAvatarRoute = `${BASE_URL}/api/auth/setavatar`;