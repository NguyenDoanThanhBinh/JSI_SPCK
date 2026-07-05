const params = new URLSearchParams(
    window.location.search
);

const mon = params.get("mon");
const id = params.get("id");

async function loadLesson(){

    const doc =
        await db.collection(mon)
                .doc(id)
                .get();

    if(!doc.exists){
        alert("Không tìm thấy bài học.");
        return;
    }

    const lesson = doc.data();
    console.log(lesson);
    document.getElementById("lesson-name").value =
        lesson.name;
    
    document.getElementById("lesson-content").value =
        lesson.content || null;

    document.getElementById("lesson-url").value =
        lesson.linkVideo;
}

document.addEventListener("DOMContentLoaded", () => {
    loadLesson();
})

document.addEventListener("click", (e) => {
    loadLesson();
})

async function updateLesson() {
    const ok = confirm("Xác nhận chỉnh sửa?");
    if (!ok) return;
    const name =
        document.getElementById("lesson-name")
                .value
                .trim();
    const content =
        document.getElementById("lesson-content")
                .value
                .trim();
    const url =
        document.getElementById("lesson-url")
                .value
                .trim();
    console.log(url);
    if(!name){
        alert("Tên bài học không được để trống.");
        return;
    }

    await db.collection(mon)
            .doc(id)
            .update({
                name: name,
                content: content || null,
                linkVideo: url || null,
            });

    alert("Cập nhật thành công!");

    window.location.href =
        `${mon}_admin.html`;
};