import axios from "axios";

export default () => {
    return axios.create({
        baseURL:'https://62ecd34ca785760e675dae20.mockapi.io/test',
        withCredentials: false
        // headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('token')
        // }
    })
}