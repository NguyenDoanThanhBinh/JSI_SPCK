const urlParams = new URLSearchParams(window.location.search);
const currentPage = window.location.pathname.split("/").pop();
const mon = currentPage.replace(".html", "");

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

                    <button class="${data.process == 0? "btn-primary" : "btn-outline"}" onclick="openLesson('${doc.id}')">${data.process == 0? "Học ngay" : "Tiếp tục học"}</button>
                </div>
        `;
    });
}

window.openLesson = async function(id){
    window.location.href =
        `show.html?mon=${mon}&id=${id}`;
}

// document.getElementById("add-btn").onclick = () => {
//     const name = prompt("Tên bài học:");

//     if(!name) return;

//     db.collection(mon).add({
//         name: name,
//         process: 0,
//         createdAt: new Date()
//     });

//     loadLessons();
// };