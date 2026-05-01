// =========================
// Mason Brady Portfolio JS
// =========================

// ---------- FOOTER YEAR ----------
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ---------- IMAGE MODAL ----------
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    if (modal && modalImg) {
        modal.classList.add("active");
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Expanded project image";
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");

    if (modal) {
        modal.classList.remove("active");
    }
}

// ---------- CLOSE MODAL WITH ESC ----------
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// =========================
// SIMPLE HTML INCLUDES
// =========================

function loadIncludes() {
    const elements = document.querySelectorAll("[data-include]");

    elements.forEach(el => {
        const file = el.getAttribute("data-include");

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Include not found");
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(error => {
                el.innerHTML = "Include failed.";
                console.error(error);
            });
    });
}

document.addEventListener("DOMContentLoaded", loadIncludes);