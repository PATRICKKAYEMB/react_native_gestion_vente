import { api } from "./api";



export async function countNotification(){
    const response = await api.get("countNotification/")
    return response.data
}

export async function voir_notification(){
    const response = await api.get("notification/")
    return response.data
}