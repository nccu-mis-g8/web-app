export async function refresh() {
    const refreshToken = localStorage.getItem("refreshToken");

    // 先確認有沒有 refresh token
    if (!refreshToken) {
        return false;
    };

    try {
        const response = await fetch(
            "https://nccu-group-8.work/auth/refresh",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + refreshToken,
                },
            }
        );

        // 若返回ok，更新所儲存的tokens
        if (response.ok) {
            const resData = await response.json();
            localStorage.setItem("accessToken", resData.access_token);
            // localStorage.setItem("refreshToken", resData.refresh_token);
            return true; // refresh 成功
        } else {
            console.error(`Refresh failed with status: ${response.status}`);
            return false; // refresh 失敗
        }

    } catch(error) {
        console.error('Error during token refresh:', error);
        return false; // 出現網路錯誤等問題
    }

}