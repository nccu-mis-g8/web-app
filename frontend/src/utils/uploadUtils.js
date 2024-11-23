export async function uploadTxt(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/utils/user/upload_txt_file",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                "Content-Type": "application/json",
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
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
            body: formData,
        }
    );

    return response;
}