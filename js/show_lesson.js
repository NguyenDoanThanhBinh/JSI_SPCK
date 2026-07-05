const params = new URLSearchParams(window.location.search);

const mon = params.get("mon");
const id = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
    loadLesson();
})

async function loadLesson(){

    try{

        const doc =
            await db.collection(mon)
                    .doc(id)
                    .get();

        if(!doc.exists){

            document.getElementById(
                "lesson-title"
            ).innerHTML = "Không tìm thấy bài học";

            return;
        }

        const data = doc.data();
        // console.log(data)
        document.getElementById(
            "lesson-title"
        ).innerHTML = data.name;

        document.getElementById(
            "lesson-content"
        ).innerHTML = data.content || "(Không có nội dung)";

        if (data.linkVideo) {
            document.getElementById("lesson-video").src = getEmbedUrl(data.linkVideo);
        }
        else document.querySelector(".video-wrapper").textContent = "(Không có video)"

    }
    catch(error){
        console.error(error);
    }
}

function getEmbedUrl(url){

    if(url.includes("embed/"))
        return url;

    if(url.includes("watch?v=")){
        const id =
            new URL(url)
            .searchParams
            .get("v");

        return `https://www.youtube.com/embed/${id}`;
    }

    if(url.includes("youtu.be/")){
        const id =
            url.split("youtu.be/")[1];

        return `https://www.youtube.com/embed/${id}`;
    }

    return "";
}

//https://www.youtube.com/watch?v=eY_HWXD-gQ8