const urlParams = new URLSearchParams(window.location.search);
const currentPage = window.location.pathname.split("/").pop();
const mon = currentPage.replace(".html", "").replace("_admin", "");

document.addEventListener("DOMContentLoaded", () => {
    loadLessons();
})

async function loadLessons(){
    const list = document.getElementById("lesson-area");
    list.innerHTML = "";

    const snapshot = await db.collection(mon).get();

    snapshot.forEach(doc => {
        const data = doc.data();

        list.innerHTML += `
            <div class="lesson-card completed">
    <div>
        <h3>${data.name}</h3>
    </div>

    <div class="lesson-actions">
        <button class="btn-edit" onclick="editLesson('${doc.id}')">Chỉnh sửa</button>
        <button class="btn-delete" onclick="deleteLesson('${doc.id}')">Xóa</button>
        <button class="btn-edit" onclick="openLesson('${doc.id}')">Xem</button>
    </div>
</div>
        `;
    });
}

document.getElementById("add-btn").onclick = () => {
    const name = prompt("Tên bài học:");
    const content = prompt("Tóm tắt nội dung bài học (có thể bỏ trống):");
    const link = prompt("Đường dẫn video (có thể bỏ trống):");
    if(!name) return;

    db.collection(mon).add({
        name: name,
        content: content || null,
        linkVideo: link || null,
        process: 0,
        createdAt: new Date()
    });

    loadLessons();
};

window.deleteLesson = async function(id) {
    if (confirm("Xóa sản phẩm này?")) {
        await db.collection(mon).doc(id).delete();
        loadLessons();
    }
};

window.editLesson = async function(id){
    window.location.href =
        `edit-lesson.html?mon=${mon}&id=${id}`;
}

window.openLesson = async function(id){
    window.location.href =
        `show.html?mon=${mon}&id=${id}`;
}