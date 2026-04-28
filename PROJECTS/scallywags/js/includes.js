document.addEventListener("DOMContentLoaded", function () {
    loadInclude("header", "../includes/header.html");
    loadInclude("footer", "../includes/footer.html");
});

function loadInclude(id, file) {
    fetch(file)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load " + file);
            }
            return response.text();
        })
        .then(function (data) {
            document.getElementById(id).innerHTML = data;
        })
        .catch(function (error) {
            console.error(error);
        });
}