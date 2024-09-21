import { useState } from "react";
import { Form } from "react-router-dom";
import { localUpload } from "../utils/uploadUtils";

function Upload() {
    const [file, setFile] = useState(null);
    const [masterName, setMasterName] = useState("");
    const [error, setError] = useState("");

    function fileChangeHandler(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "text/plain") {
            setFile(selectedFile);
        }
    }

    async function submitHandler() {
        if (!file) {
            setError("Please select a file");
            return;
        }

        if (!masterName) {
            setError("Please enter a name");
            return;
        }

        try {
            await localUpload(file, masterName);
        } catch(error) {
            console.error("有點問題喔", error);
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="file">Choose a .txt file:</label>
                    <input
                        type="file"
                        id="file"
                        accept=".txt"
                        onChange={fileChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="name">Enter your name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setMasterName(e.target.value)}
                    />
                </div>
                <div>{error}</div>
                <button>Upload</button>
            </Form>
        </div>
    );
}

export default Upload;
