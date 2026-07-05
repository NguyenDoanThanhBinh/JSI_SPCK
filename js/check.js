document.addEventListener("DOMContentLoaded", () => {

    fetch("../component/navbar.html")
        .then(res => res.text())
        .then(data => {

            document.getElementById("navbar").innerHTML = data;

            const currentPage =
                window.location.pathname.split("/").pop();

            if(currentPage === "home.html"){
                document
                    .getElementById("nav-home")
                    .classList.add("active");
            }

            if(
                currentPage === "monhoc.html" ||
                currentPage === "toan.html" ||
                currentPage === "van.html" ||
                currentPage === "anh.html"
            ){
                document
                    .getElementById("nav-subjects")
                    .classList.add("active");
            }

        });

});