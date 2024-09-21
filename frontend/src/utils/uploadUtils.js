export async function localUpload(file, masterName) {
    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("master_name", masterName);

    console.log(file);
    console.log(masterName)
    console.log(userId);

    try {
        const response = await fetch("http://127.0.0.1:5000/upload/", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("File uploaded successfully");
        } else {
            alert("Failed to upload file");
        }

    } catch (error) {
        console.error("An error occurred while uploading the file", error);
    }
}
