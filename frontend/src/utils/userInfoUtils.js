export async function uploadUserAvatar(formData) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/userinfo/user/upload_photo",
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