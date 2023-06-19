import { $authHost, $host } from "./index";

export const createService = async (serviceData) => {
    const { data } = await $authHost.post('/api/service/', serviceData)
    return data
}

export const updateService = async (serviceData, id) => {
    const { data } = await $authHost.put('api/service/' + id, serviceData)
    return data
}

export const deleteService = async (id) => {
    const { data } = await $authHost.delete('api/service/' + id)
    return data
}

export const getServices = async (limit, currentPage) => {
    const { data } = await $host.get(`api/service/?limit=${limit}&page=${currentPage}`)
    return data
}

export const getService = async (dataType) => {
    const { data } = await $host.get('api/service/' + dataType)
    return data
}