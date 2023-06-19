import { $authHost, $host } from "./index";

export const createHotel = async (hotelData) => {
    const { data } = await $authHost.post('/api/hotels/', hotelData)
    return data
}

export const updateHotel = async (id, hotelData) => {
    const { data } = await $authHost.put('api/hotels/' + id, hotelData)
    return data
}

export const deleteHotel = async (id) => {
    const { data } = await $authHost.delete('api/hotels/' + id)
    return data
}

export const getHotels = async () => {
    const { data } = await $host.get('api/hotels/')
    return data
}   
export const getHotel = async (type) => {
    const { data } = await $host.get('api/hotels/' + type)
    return data
}   