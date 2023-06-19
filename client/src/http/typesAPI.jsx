import { $authHost, $host } from "./index";

export const createType = async (dataTypes) => {
    try {
        const response = await $authHost.post('/api/dataTypes/', dataTypes, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateType = async (id, dataTypes) => {
    const { data } = await $authHost.put('api/dataTypes/' + id, dataTypes, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}

export const deleteType = async (id) => {
    const { data } = await $authHost.delete('api/dataTypes/' + id)
    return data
}

export const getTypes = async (relateTo) => {
    const { data } = await $authHost.get('api/dataTypes/' + relateTo)
    return data
}
export const getType = async (relateTo) => {
    const { data } = await $authHost.get('api/dataTypes/' + relateTo)
    return data
}