document.addEventListener("DOMContentLoaded", () => {

    fetch("../component/navbar3.html")
        .then(res => res.text())
        .then(data => {

            document.getElementById("navbar").innerHTML = data;

            const currentPage =
                window.location.pathname.split("/").pop();

            // if(currentPage === "admin.html"){
            //     document.querySelector(".trang_chu").classList.add("active");
            // }

            if(
                currentPage === "toan-kc.html"
            ){
                document.querySelector(".toan-kc").classList.add("active");
            }
            if(
                currentPage === "van-kc.html"
            ){
                document.querySelector(".van-kc").classList.add("active");
            }
            if(
                currentPage === "anh-kc.html"
            ){
                document.querySelector(".anh-kc").classList.add("active");
            }

            // ✅ CHỖ QUAN TRỌNG: đảm bảo DOM đã tồn tại
            auth.onAuthStateChanged((user) => {
                const button = document.querySelector(".btn");
                if(!button) return;

                button.classList.remove("login-btn","logout-btn");

                if(user){
                    button.classList.add("logout-btn");
                    button.textContent = "Đăng xuất";
                }else{
                    button.classList.add("login-btn");
                    button.textContent = "Đăng nhập";
                }
            });

        });
document.addEventListener("click", (e) => {
    const button = e.target.closest(".btn");
    if (!button) return;
    // Nếu đang đăng nhập → logout
    if (currentUser) {
        const ok = confirm("Bạn có chắc muốn đăng xuất không?");
        if (!ok) return;
        logoutUser();
    } 
    // Nếu chưa đăng nhập → chuyển login
    else {
        window.location.href = "https://nguyendoanthanhbinh.github.io/JSI_SPCK/html/general/login.html";
    }
});
});