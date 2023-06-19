import { $authHost, $host } from "./index";

export const createFeedback = async (feedbackData) => {
    const { data } = await $authHost.post('/api/feedback/', feedbackData)
    return data
}

export const updateFeedback = async (id, feedbackData) => {
    const { data } = await $authHost.put('api/feedback/' + id, feedbackData)
    return data
}

export const deleteFeedback = async (id) => {
    const { data } = await $authHost.delete('api/feedback/' + id)
    return data
}

export const getFeedbacks = async () => {
    const { data } = await $host.get('api/feedbacks/')
    return data
}   
