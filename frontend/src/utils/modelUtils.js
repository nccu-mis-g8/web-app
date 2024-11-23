﻿export async function getAllModel() {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/utils/user/all_model_info",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    return response;
}

export async function createModel(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/userinfo/user/create_model",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            body: formData,
        }
    );

    return response;
}

export async function deleteModel(modelId) {
    const access_token = localStorage.getItem("accessToken");
    const response = await fetch(
        `https://nccu-group-8.work/userinfo/user/delete_model/${modelId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        }
    );

    return response;
}

export async function inference(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/finetune/chat",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            body: formData,
        }
    );

    return response;
}