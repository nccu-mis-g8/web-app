export async function uploadTxt(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/utils/user/upload_txt_file",
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

export async function uploadCsv(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/utils/user/upload_csv_file",
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

export async function startTraining(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/finetune/train_model",
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

export async function checkModelStatus(id) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        `https://nccu-group-8.work/utils/user/model_status/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    return response;
}