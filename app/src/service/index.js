import axios from "axios"

export const axiosGet = (endpoint) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export const axiosPost = (endpoint, data) => {
    const token = localStorage.getItem('token')
    return axios.post(`http://localhost:3001/${endpoint}`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export const axiosPut = (endpoint, data) => {
    const token = localStorage.getItem('token')
    return axios.put(`http://localhost:3001/${endpoint}`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}
export const axiosDelete = (endpoint) => {
    const token = localStorage.getItem('token')
    return axios.delete(`http://localhost:3001/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}