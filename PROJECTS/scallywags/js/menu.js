document.addEventListener("DOMContentLoaded", function () {
    fetch("../data/menu.xml")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load menu.xml");
            }
            return response.text();
        })
        .then(function (xmlText) {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");
            displayMenu(xml);
        })
        .catch(function (error) {
            console.error("Error loading menu:", error);
            document.getElementById("menu-container").innerHTML =
                "<p class='text-center'>Sorry, the menu could not be loaded right now.</p>";
        });
});

function displayMenu(xml) {
    const menuContainer = document.getElementById("menu-container");
    const categories = xml.getElementsByTagName("category");

    let output = "";
    let alcoholStarted = false;

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const categoryType = category.getAttribute("type");
        const categoryName = category.getAttribute("name");
        const categoryId = category.getAttribute("id");

        if (categoryType === "alcohol" && !alcoholStarted) {
            output += `
                <div class="col-12">
                    <div class="menu-divider text-center my-5">
                        <h2 class="mb-2">Captain's Cocktails & Spirits</h2>
                        <p class="lead mb-0">Raise a glass with the crew.</p>
                    </div>
                </div>
            `;
            alcoholStarted = true;
        }

        const items = category.getElementsByTagName("item");

        let pirateImage = "";
        let pirateSide = "right";

        if (categoryId === "galley") {
            pirateImage = "../images/pirate2.png";
            pirateSide = "right";
        } else if (categoryId === "cocktails") {
            pirateImage = "../images/pirate3.png";
            pirateSide = "left";
        }

        output += `
            <div class="col-12">
                <div class="menu-category p-4">
                    <h2 class="mb-4">${categoryName}</h2>
                    <div class="row g-3 align-items-start">
        `;

        if (pirateImage && pirateSide === "left") {
            output += `
                <div class="col-md-4 text-center">
                    <img src="${pirateImage}" class="menu-pirate-img" alt="Pirate Illustration">
                </div>
                <div class="col-md-8">
                    <div class="row g-3">
            `;
        } else {
            output += `
                <div class="col-md-${pirateImage ? "8" : "12"}">
                    <div class="row g-3">
            `;
        }

        for (let j = 0; j < items.length; j++) {
            const name = items[j].getElementsByTagName("name")[0].textContent;
            const description = items[j].getElementsByTagName("description")[0].textContent;
            const price = items[j].getElementsByTagName("price")[0].textContent;

            output += `
                <div class="col-md-6">
                    <div class="menu-item p-3 h-100">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h3 class="mb-0">${name}</h3>
                            <span class="menu-price">$${price}</span>
                        </div>
                        <p class="mb-0">${description}</p>
                    </div>
                </div>
            `;
        }

        output += `
                    </div>
                </div>
        `;

        if (pirateImage && pirateSide === "right") {
            output += `
                <div class="col-md-4 text-center">
                    <img src="${pirateImage}" class="menu-pirate-img" alt="Pirate Illustration">
                </div>
            `;
        }

        output += `
                    </div>
                </div>
            </div>
        `;
    }

    menuContainer.innerHTML = output;
}