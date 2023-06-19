import { $authHost, $host } from "./index";

export const createInfo = async (infoData) => {
    const { data } = await $authHost.post('/api/info/', infoData)
    return data
}

export const updateInfo = async (id, infoData) => {
    const { data } = await $authHost.put('api/info/' + id, infoData)
    return data
}

export const deleteInfo = async (id) => {
    const { data } = await $authHost.delete('api/info/' + id)
    return data
}

export const getInfos = async () => {
    const { data } = await $host.get('api/info/')
    return data
}   