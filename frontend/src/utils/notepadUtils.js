export async function getEvents(time) {
    const accessToken = localStorage.getItem("accessToken");
    let url
    if (time) {
        url = `https://nccu-group-8.work/event/getevents/${time}`
    } else {
        url = "https://nccu-group-8.work/event/getevents";
    }
    const response = await fetch( url,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    return response;
}

export async function getOneEvent(id) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        `https://nccu-group-8.work/event/getevent/${id}`,
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

export async function createEvent(content, date, photo, title) {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
        "https://nccu-group-8.work/event/create_event",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
                event_content: content,
                event_date: date,
                event_picture: photo,
                event_title: title
            }),
        }
    );

    return response;
}