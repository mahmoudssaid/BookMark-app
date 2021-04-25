var siteName = document.getElementById("siteName"),
    siteUrl = document.getElementById("siteUrl"),
    allSites;
if (localStorage.getItem("sites") == null) {
    allSites = [];
} else {
    allSites = JSON.parse(localStorage.getItem("sites"));
    display();
}
var regEXName = /^[A-Z][a-z]+$/,
    regEXUrl = /^[(http)(https)]?.+\.+[a-z]{2,3}$/;

function addUrl() {
    var siteN = siteName.value,
        siteU = siteUrl.value;
    if (siteN !== "" || siteU !== "") {
        if (siteN !== "" && regEXName.test(siteN)) {
            if (siteU !== "" && regEXUrl.test(siteU)) {
                var userSite = {
                    siteName: siteN,
                    siteUrl: siteU
                };
                allSites.push(userSite);
                localStorage.setItem("sites", JSON.stringify(allSites));
                clear();
                display();
                siteUrl.className = "form-control";
                siteName.className = "form-control";
            } else {
                /* var alert = document.querySelector("#alertUR");
                 alert.setAttribute("style", "display: block")
                 alert.innerHTML = "place check your valid";*/
                siteUrl.className = "form-control is-invalid";
            }
        } else {
            /* var alert = document.querySelector("#alertUS");
             alert.setAttribute("style", "display: block")
             alert.innerHTML = "place check your valid";*/
            siteName.className = "form-control is-invalid";
        }
    } else {
        /*  var alert = document.querySelector("#alertUS");
          alert.setAttribute("style", "display: block");
          alert.innerHTML = "place check your valid";
          var alert2 = document.querySelector("#alertUR");
          alert2.setAttribute("style", "display: block")
          alert2.innerHTML = "place check your valid";*/
        siteName.className = "form-control is-invalid";
        siteUrl.className = "form-control is-invalid";
    }
}

function clear() {
    siteName.value = "";
    siteUrl.value = "";
}

function display() {
    var divSite = ``;
    for (i = 0; i < allSites.length; i++) {
        divSite += `<div class="itemSite">
        <span >${i+1}</span>
                        <p>${allSites[i].siteName} </p>
                        <a href="${allSites[i].siteUrl}" class="btn btn-primary" target="_blank">visit</a>
                        <button class="btn btn-warning" onclick="update(${i})">Update</button>
                        <button class="btn btn-danger" onclick="Delete(${i})">delete</button>
                    </div>`
    }
    document
        .querySelector("#items").innerHTML = divSite;
}

function hideAlertUN(val) {
    var alert = document.querySelector("#alertUS");
    alert.setAttribute("style", "display: none")
    if (regEXName.test(val)) {
        siteName.className = "form-control is-valid";
    } else {
        siteName.className = "form-control is-invalid";
    }
}

function hideAlertUR(val) {
    var alert = document.querySelector("#alertUR");
    alert.setAttribute("style", "display: none")
    if (regEXUrl.test(val)) {
        siteUrl.className = "form-control is-valid";
    } else {
        siteUrl.className = "form-control is-invalid";
    }
}

function update(indNum) {
    var SN = allSites[indNum].siteName,
        SU = allSites[indNum].siteUrl;
    siteName.value = SN;
    siteUrl.value = SU;
    document.querySelector("#submit").setAttribute("onclick", "mainUpdate(" + indNum + ")");
    document.querySelector("#submit").setAttribute("class", "btn btn-warning m-auto d-block");
    document.querySelector("#submit").innerHTML = "Update";
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function mainUpdate(indNum2) {
    var siteN = siteName.value,
        siteU = siteUrl.value;
    var userSite = {
        siteName: siteN,
        siteUrl: siteU
    };
    allSites.splice(indNum2, 1, userSite);
    localStorage.setItem("sites", JSON.stringify(allSites));
    display();
    clear();
    document.querySelector("#submit").setAttribute("onclick", "addUrl()")
    document.querySelector("#submit").setAttribute("class", "btn btn-primary m-auto d-block")
    document.querySelector("#submit").innerHTML = "Submit";
    siteUrl.className = "form-control";
    siteName.className = "form-control";
}

function radioChick(valThis) {
    var valSearch = document.querySelector("#search");
    if (valThis == "site") {
        valSearch.setAttribute("onkeyup", "search(this.value)")
    }
    if (valThis == "url") {
        valSearch.setAttribute("onkeyup", "searchUrl(this.value)")
    }
}

function searchUrl(inputFUser) {
    var allNewSites = [];
    for (i = 0; i < allSites.length; i++) {
        if (allSites[i].siteUrl.toLowerCase().includes(inputFUser.toLowerCase())) {
            allNewSites.push(allSites[i]);
            var indexNum = allSites[i];
            indexNum["numInd"] = i;
        }
    }
    displayNewArray()

    function displayNewArray() {
        var divSite = ``;
        for (x = 0; x < allNewSites.length; x++) {
            divSite += `<div class="itemSite">
                        <span>${allNewSites[x].numInd +1}</span>
                        <p>${allNewSites[x].siteName} </p>
                        <a href="${allNewSites[x].siteUrl}" class="btn btn-primary" target="_blank">visit</a>
                        <button class="btn btn-warning" onclick="update(${allNewSites[x].numInd})">Update</button>
                        <button class="btn btn-danger" onclick="Delete(${allNewSites[x].numInd})">delete</button>
                    </div>`
        }
        document.querySelector("#items").innerHTML = divSite;
    }
}

function search(inputFUser) {
    var noteFound = false;

    var allNewSites = [];
    for (i = 0; i < allSites.length; i++) {
        if (allSites[i].siteName.toLowerCase().includes(inputFUser.toLowerCase())) {
            allNewSites.push(allSites[i]);
            var indexNum = allSites[i];
            indexNum["numInd"] = i;
            noteFound = true
        }
    }

    if (noteFound) {
        displayNewArray()
    } else {
        document.querySelector("#items").innerHTML = `<h3 class="notFound">Sorry not site found </h3>`;
    }

    function displayNewArray() {
        var divSite = ``;
        for (x = 0; x < allNewSites.length; x++) {
            divSite += `<div class="itemSite">
            <span>${allNewSites[x].numInd + 1}</span>
                        <p>${allNewSites[x].siteName} </p>
                        <a href="${allNewSites[x].siteUrl}" class="btn btn-primary" target="_blank">visit</a>
                        <button class="btn btn-warning" onclick="update(${allNewSites[x].numInd})">Update</button>
                        <button class="btn btn-danger" onclick="Delete(${allNewSites[x].numInd})">delete</button>
                    </div>`
        }
        document.querySelector("#items").innerHTML = divSite;
    }
}

function Delete(indexNum) {
    allSites.splice(indexNum, 1);
    localStorage.setItem("sites", JSON.stringify(allSites));
    display()
}