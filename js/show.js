// js/products.js - Quản lý sản phẩm + Upload Cloudinary

const CLOUD_NAME = "di7uvgr5y";        // Cloud name của bạn
const UPLOAD_PRESET = "mindx-coffee";  // Tạo preset sau (xem hướng dẫn dưới)

// Thêm sản phẩm có upload ảnh
window.addProduct = async function() {
    const name = document.getElementById('product-name').value.trim();
    const price = parseInt(document.getElementById('product-price').value);
    const imageFile = document.getElementById('product-image').files[0];

    if (!name || !price || !imageFile) {
        alert("Vui lòng nhập đầy đủ thông tin và chọn ảnh!");
        return;
    }

    try {
        // Upload ảnh lên Cloudinary
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.secure_url) {
            // Lưu thông tin sản phẩm vào Firestore
            await db.collection("products").add({
                name: name,
                price: price,
                imageUrl: result.secure_url,
                createdAt: new Date()
            });

            alert("✅ Thêm sản phẩm và ảnh thành công!");
            document.getElementById('product-form').reset();
            loadProducts();
        }
    } catch (error) {
        console.error(error);
        alert("Lỗi upload ảnh: " + error.message);
    }
};

// Tải danh sách sản phẩm
async function loadProducts() {
    const tbody = document.querySelector("#product-list tbody");
    tbody.innerHTML = "";

    const snapshot = await db.collection("products").get();
    
    snapshot.forEach(doc => {
        const p = doc.data();
        const row = `
            <tr>
                <td><img src="${p.imageUrl || ''}" width="60" height="60" style="object-fit: cover;"></td>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString('vi-VN')} đ</td>
                <td><button onclick="deleteProduct('${doc.id}')">Xóa</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Xóa sản phẩm
window.deleteProduct = async function(id) {
    if (confirm("Xóa sản phẩm này?")) {
        await db.collection("products").doc(id).delete();
        loadProducts();
    }
};

// Tự động load khi trang mở
document.addEventListener('DOMContentLoaded', loadProducts);