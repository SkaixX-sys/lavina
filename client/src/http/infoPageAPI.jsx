import { $authHost, $host } from "./index";

export const createInfoPages = async (infoPageData) => {
    const { data } = await $authHost.post('/api/infoItem/', infoPageData)
    return data
}

export const updateInfoPages = async (id, infoPageData) => {
    const { data } = await $authHost.put('api/infoItem/' + id, infoPageData)
    return data
}

export const deleteInfoPages = async (id) => {
    const { data } = await $authHost.delete('api/infoItem/' + id)
    return data
}

export const getInfoPages = async (type) => {
    const { data } = await $host.get(`api/infoItem/` + type);
    return data;
};
 