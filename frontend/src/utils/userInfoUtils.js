export async function getUserAvatar() {
    try{
        const userId = localStorage.getItem("userId");
    
        const response = await fetch(
            "http://127.0.0.1:5001/userinfo/user/retrieve_photo/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            return false;
        } else {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }

        return response;
    } catch(error) {
        console.error('Error during get avatar:', error);
        return false; // 出現網路錯誤等問題
    }
}