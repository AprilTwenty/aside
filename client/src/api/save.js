import api from "./api.js";

export async function getRecentSaves() {
    const respone = await api.get("/saves", {
        params: {
            page: 1,
            limit: 5,
            sort: "created_at",
            order: "desc"
        }
    });
    return respone.data.data
}

export async function getSave() {
    const respone = await api.get("/saves")
    return respone.data.data
}