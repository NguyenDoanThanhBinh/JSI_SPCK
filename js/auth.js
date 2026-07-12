// js/auth.js - Xử lý Đăng ký & Đăng nhập

// Kiểm tra định dạng email và mật khẩu
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;



// Theo dõi trạng thái đăng nhập
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userDoc = await db.collection("users").doc(user.uid).get();
        const userData = userDoc.data() || {};

        window.currentUser = {
            uid: user.uid,
            email: user.email,
            role: userData.role || "user",
            fullName: userData.fullName || "Người dùng"
        };

        console.log(`👤 Đăng nhập với vai trò: ${window.currentUser.role}`);
        
        // Tự động redirect nếu vào sai trang
        const currentPage = window.location.pathname.split("/").pop();

        if ((currentPage === "admin.html" || window.location.pathname.includes("/admin/")) && window.currentUser.role !== "admin") {
            alert("Bạn không có quyền truy cập trang Admin!");
            window.location.href = "../general/home.html";
        }
    } else {
        window.currentUser = null;
        console.log("👤 Chưa đăng nhập (Guest)");
        if ((currentPage === "admin.html" || window.location.pathname.includes("/admin/"))) {
            alert("Bạn không có quyền truy cập trang Admin!");
            window.location.href = "../general/home.html";
        }
    }
    const button = document.querySelector(".btn");
    const userName = document.getElementById("user-name");
    if(user){

        const doc = await db.collection("users")
                            .doc(user.uid)
                            .get();

        const data = doc.data();

        userName.style.display = "block";
        userName.innerHTML = "👋 " + data.fullName;

        button.classList.remove("login-btn");
        button.classList.add("logout-btn");
        button.innerHTML = "Đăng xuất";
    }
    else{

        userName.style.display = "none";
        userName.innerHTML = "";

        button.classList.remove("logout-btn");
        button.classList.add("login-btn");
        button.innerHTML = "Đăng nhập";
    }
});

// Đăng ký tài khoản
window.registerUser = async function() {
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const fullName = document.getElementById('reg-name') ? document.getElementById('reg-name').value.trim() : "";

    if (!email || !password || !fullName) {
        alert("Vui lòng nhập đầy đủ email, mật khẩu và tên người dùng!");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("Mật khẩu phải có ít nhất 6 ký tự, chứa chữ hoa, chữ thường và số!");
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Lưu thông tin user vào Firestore
        await db.collection("users").doc(userCredential.user.uid).set({
            fullName: fullName || "Người dùng mới",
            email: email,
            role: "user",
            balance: 0,
            // process: {
            //     toan_kc: 0,
            //     van_kc: 0,
            //     anh_kc: 0,
            // },
            createdAt: new Date()
        });

        alert("🎉 Đăng ký thành công!");
        window.location.href = "login.html";
    } catch (error) {
        alert("❌ Lỗi đăng ký: " + error.message);
    }
};

// Đăng nhập
window.loginUser = async function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("✅ Đăng nhập thành công!");
        const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
        const role = userDoc.data()?.role || "user";

        if (role === "admin") {
            window.location.href = "../admin/toan-kc_admin.html";
        } else {
            window.location.href = "home.html";
        }
    } catch (error) {
        alert("❌ Đăng nhập thất bại: " + error.message);
    }
};

// Đăng xuất
window.logoutUser = function() {
    auth.signOut().then(() => {
        alert("Đã đăng xuất!");
        window.location.href = "../general/login.html";
    }).catch((error) => {
        alert("Lỗi đăng xuất: " + error.message);
    });
};