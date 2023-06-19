import { $authHost, $host } from "./index";

export const createRoom = async (type, roomData) => {
    const { data } = await $authHost.post('/api/rooms/' + type, roomData)
    return data
}

export const updateRoom = async (id, roomData) => {
    const { data } = await $authHost.put('api/rooms/' + id, roomData)
    return data
}

export const deleteRoom = async (id) => {
    const { data } = await $authHost.delete('api/rooms/' + id)
    return data
}

export const getRooms = async (type) => {
    const { data } = await $host.get('api/rooms/getRooms/' + type)
    return data
}
export const getRoom = async (id) => {
    const { data } = await $host.get('api/rooms/getRoom/' + id)
    return data
}   