import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const fetchTables = async () => {
    const {data} = await $host.get('api/tables')
    return data
}

export const deleteRows = async ( rowsId1 ) => {
    const {data} = await $host.delete('api/tables', { data: {rowsId: rowsId1}})
    return data
}

export const addRow = async ( row ) => {
    const {data} = await $host.post('api/tables', row)
    return data
}

export const putRows = async ( row ) => {
    const {data} = await $host.put('api/tables', row)
    return data
}