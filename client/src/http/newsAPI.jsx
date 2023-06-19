import { $authHost, $host } from "./index";

export const createNews = async (newData) => {
    const { data } = await $authHost.post('/api/news/', newData)
    return data
}

export const updateNews = async (id, newData) => {
    const { data } = await $authHost.put('api/news/' + id, newData)
    return data
}

export const deleteNews = async (id) => {
    const { data } = await $authHost.delete('api/news/' + id)
    return data
}

export const getNews = async (limit, currentPage) => {
    const { data } = await $host.get(`api/news?limit=${limit}&page=${currentPage}`);
    return data;
};
export const getNew = async (type) => {
    const { data } = await $host.get('api/news/' + type)
    return data
}   