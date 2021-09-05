const titleSymbol = window.location.search.replace("?symbol=", "");
const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${titleSymbol}`;

document.getElementById("loading").style.display = "none";

fetch(companyUrl)
  .then((response) => response.json())
  .then((data) => {

    document.getElementById("loading").style.display = "flex";
    console.log(data);
    const companyData = data["profile"];
    console.log(companyData);

    // document.getElementById("webTag").textContent(companyData["companyName"]);

    const titulo = document.createElement("div");
    titulo.classList.add("acciones", "title");
    titulo.id = "title";

    const logo = document.createElement("div");
    logo.classList.add("acciones");
    logo.id = "logo";

    const aLogo = document.createElement("a");
    aLogo.classList.add("acciones");
    aLogo.id = "aLogo";
    if (companyData["website"] != "") {
      aLogo.href = companyData["website"];
    }

    const imgLogo = document.createElement("img");
    imgLogo.classList.add("acciones");
    imgLogo.id = "imgLogo";
    imgLogo.src = companyData["image"];
    imgLogo.alt = "company-logo";

    const top = document.createElement("div");
    top.classList.add("acciones", "top");
    top.id = "top";

    const descr = document.createElement("div");
    descr.classList.add("acciones", "descr");
    descr.id = "descr";

    const topLeft = document.createElement("div");
    topLeft.classList.add("acciones", "top-left-body");
    topLeft.id = "topLeft";

    const priceChange = document.createElement("div");
    priceChange.classList.add("acciones", "price-change");
    priceChange.id = "priceChange";

    const price = document.createElement("div");
    price.classList.add("acciones", "price");
    price.id = "price";

    const container = document.createElement("div");
    container.classList.add("acciones", "container");
    container.id = "container";

    const canvas = document.createElement("canvas");
    canvas.id = "myChart";

    const change = document.createElement("div");
    if (companyData["changes"] >= 0) {
      change.classList.add("acciones", "change", "positive");
    } else {
      change.classList.add("acciones", "change", "negative");
    }
    change.id = "change";

    document.getElementById("bodyWrapper").append(top);
    document.getElementById("top").append(topLeft);
    document.getElementById("topLeft").append(titulo, priceChange);
    document.getElementById("priceChange").append(price, change);
    document.getElementById("top").append(logo);
    document.getElementById("logo").append(aLogo);
    document.getElementById("aLogo").append(imgLogo);

    document.getElementById("bodyWrapper").append(container);
    document.getElementById("container").append(canvas);

    document.getElementById("bodyWrapper").append(descr);

    // document.getElementById("bodyWrapper").append(container);
    // document.getElementById("container").append(canvas);

    document.getElementById(
      "change"
    ).textContent = `(${companyData["changes"]}%)`;

    const precio = document.getElementById("price");
    precio.textContent = `USD $ ${companyData["price"]}`;

    const description = document.getElementById("descr");
    description.textContent = companyData["description"];

    const title = document.getElementById("title");
    title.textContent = `${companyData["companyName"]} (${titleSymbol})`;
  });

let stockDate = [];
let stockValue = [];

const companyHistoryUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${titleSymbol}?serietype=line`;
fetch(companyHistoryUrl)
  .then((response) => response.json())
  .then((data) => {
    const historyRawData = data["historical"];
    console.log(historyRawData);
    for (let i = 0; i>299 ? i <= 299 : i <= historyRawData.length -1; i = i + 10) {
      stockDate.push(historyRawData[i]["date"]);
      stockValue.push(historyRawData[i]["close"]);
    }

    console.log(stockDate);
    console.log(stockValue);

    const myChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: stockDate.reverse(),
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "#F2AE72",
            borderColor: "#F9E3CF",
            data: stockValue.reverse(),
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });

    document.getElementById("loading").style.display = "none";
  });
