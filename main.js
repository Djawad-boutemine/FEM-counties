// set the dark mode on and off
let modeBtn = document.querySelector(".mode");
let body = document.querySelector("body");
let modeSpan = document.querySelector(".mode span");
let moonIcon = document.querySelector(".mode .moon");
let sunIcon = document.querySelector(".mode .sun");
modeBtn.onclick = function () {
    if (body.className === "dark-theme") {
        body.className = "";
        modeSpan.innerHTML = "Dark Mode";
        moonIcon.classList.remove("d-none");
        sunIcon.classList.add("d-none");
    } else {
        body.className = "dark-theme"
        modeSpan.innerHTML = "Light Mode";
        moonIcon.classList.add("d-none");
        sunIcon.classList.remove("d-none");
    }
}
// getting needed element
let cardBox = document.querySelector(".cards");
let mainPage = document.querySelector(".main-info");
let morePage = document.querySelector(".more-info");
// toggling pages function
function pageToggle(str) {
    if (str == "main") {
        mainPage.classList.remove("d-none");
        morePage.classList.add("d-none");
    } else {
        mainPage.classList.add("d-none");
        morePage.classList.remove("d-none");
    }
}
// getting the data onf the main data array
let allData;
let allCards;
let backBtn = document.querySelector(".back");
let filterBtns = Array.from(document.querySelectorAll(".dropdown-item"));
let searchInput = document.querySelector(".search input");
let clickedFilter = "ALL";
async function asyncs() {
    let response = await fetch("data.json");
    let allData = await response.json();
    // creating all the cards
    for (let i = 0; i < allData.length; i++) {
        // creating each element alone and giving classes
        let card = document.createElement("div");
        card.setAttribute("ids", i);
        card.classList.add("flag-card", "col-sm-10", "col-lg-6", "col-xl-4", "col-xxl-3", "p-3");
        let container = document.createElement("div");
        container.classList.add("container", "rounded-2");
        let img = document.createElement("img");
        img.setAttribute("src", allData[i].flag);
        let text = document.createElement("div");
        text.classList.add("text", "p-4");
        let h2 = document.createElement("h2");
        h2.innerHTML = allData[i].name;
        let population = document.createElement("div");
        population.innerHTML = `Population: ${allData[i].population}`;
        let region = document.createElement("div");
        region.innerHTML = `Region: ${allData[i].region}`;
        let capital = document.createElement("div");
        capital.innerHTML = `Capital: ${allData[i].capital}`;
        // now stacking stull and putting every thing in its place
        text.appendChild(h2);
        text.appendChild(population);
        text.appendChild(region);
        text.appendChild(capital);
        container.appendChild(img);
        container.appendChild(text);
        card.appendChild(container);
        cardBox.appendChild(card);
    }
    allCards = Array.from(document.querySelectorAll(".flag-card"));
    allCards.forEach(element => {
        element.onclick = function () {
            pageToggle("more");
            // changing the content
            let img = document.querySelector(".more-info img");
            img.setAttribute("src", allData[element.getAttribute("ids")].flag);
            let h2 = document.querySelector(".more-info h2");
            h2.innerHTML = allData[element.getAttribute("ids")].name;
            let name = document.querySelector(".more-info .main-content .name span");
            name.innerHTML = allData[element.getAttribute("ids")].nativeName;
            let population = document.querySelector(".more-info .main-content .population span");
            population.innerHTML = allData[element.getAttribute("ids")].population;
            let region = document.querySelector(".more-info .main-content .region span");
            region.innerHTML = allData[element.getAttribute("ids")].region;
            let subRegion = document.querySelector(".more-info .main-content .sub-region span");
            subRegion.innerHTML = allData[element.getAttribute("ids")].subregion;
            let capital = document.querySelector(".more-info .main-content .capital span");
            capital.innerHTML = allData[element.getAttribute("ids")].capital;
            let domain = document.querySelector(".more-info .main-content .top-level-domain span");
            domain.innerHTML = allData[element.getAttribute("ids")].topLevelDomain;
            let currencies = document.querySelector(".more-info .main-content .currencies span");
            currencies.innerHTML = "";
            for (let i = 0; i < allData[element.getAttribute("ids")].currencies.length; i++) {
                currencies.innerHTML += allData[element.getAttribute("ids")].currencies[i].name;
                if (i + 1 != allData[element.getAttribute("ids")].currencies.length) {
                    currencies.innerHTML += ",";
                }
            }
            let languages = document.querySelector(".more-info .main-content .languages span");
            languages.innerHTML = "";
            for (let i = 0; i < allData[element.getAttribute("ids")].languages.length; i++) {
                languages.innerHTML += allData[element.getAttribute("ids")].languages[i].name + " ";
            }
            let borderCountries = document.querySelector(".border-countries");
            borderCountries.innerHTML = "Border Countries: ";
            if (allData[element.getAttribute("ids")].borders) {
                for (let i = 0; i < allData[element.getAttribute("ids")].borders.length; i++) {
                    let span = document.createElement("span");
                    span.innerHTML = allData[element.getAttribute("ids")].borders[i];
                    borderCountries.appendChild(span);
                }
            } else {
                borderCountries.innerHTML = "Border Countries: <span>none</span> ";
            }

        }
    });
    backBtn.onclick = function () {
        pageToggle("main");
    }
    // woking on filters
    filterBtns.forEach((ele) => {
        ele.onclick = function () {
            clickedFilter = ele.innerHTML;
            allCards.forEach((ele2) => {
                if (allData[ele2.getAttribute("ids")].region === ele.innerHTML || ele.innerHTML === "ALL") {
                    ele2.classList.remove("d-none");
                } else {
                    ele2.classList.add("d-none");
                }
            })
        }
    })
    // the searching
    // get the input 
    searchInput.parentElement.onclick = function () {
        searchInput.focus();
    }
    searchInput.addEventListener("input", function () {
        allCards.forEach((ele) => {
            if ((allData[ele.getAttribute("ids")].name.toLowerCase().includes(searchInput.value.toLowerCase()))
            &&(allData[ele.getAttribute("ids")].region === clickedFilter || clickedFilter === "ALL")) {
                ele.classList.remove("d-none");
            } else {
                ele.classList.add("d-none");
            }
        })
    });
}
asyncs();