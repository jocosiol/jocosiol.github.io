const titleSymbol = window.location.search.replace("?symbol=", "");
const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${titleSymbol}`;

fetch(companyUrl)
  .then((response) => response.json())
  .then((data) => {
    const companyData = data["profile"];
    console.log(companyData);

    const titulo = document.createElement("div");
    titulo.classList.add("acciones");
    titulo.id = "title";
    document.getElementById("bodyWrapper").append(titulo);

    const logo = document.createElement("div");
    logo.classList.add("acciones");
    logo.id = "logo";

    const aLogo = document.createElement("a");
    aLogo.classList.add("acciones");
    aLogo.id = "aLogo";
    aLogo.href = companyData["website"];

    const imgLogo = document.createElement("img");
    imgLogo.classList.add("acciones");
    imgLogo.id = "imgLogo";
    imgLogo.src = companyData["image"];
    imgLogo.alt = "company-logo";

    document.getElementById("bodyWrapper").append(logo);
    document.getElementById("logo").append(aLogo);
    document.getElementById("aLogo").append(imgLogo);

    const title = document.getElementById("title");
    title.textContent = `${companyData["companyName"]} (${titleSymbol})`;
  });
