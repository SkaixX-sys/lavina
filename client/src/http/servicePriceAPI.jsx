import { $authHost, $host } from "./index";

export const createPrice = async (service) => {
    try {
        const response = await $authHost.post('/api/servicePriceList/', service, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePrice = async (id, service) => {
    const { data } = await $authHost.put('api/servicePriceList/' + id, service, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}

export const deletePrice = async (id) => {
    const { data } = await $authHost.delete('api/servicePriceList/' + id)
    return data
}

export const getPrices = async (type) => {
    const { data } = await $host.get('api/servicePriceList/' + type)
    return data
}