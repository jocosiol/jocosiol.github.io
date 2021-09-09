let symbol = "";
let url = "";
let stackInput = "";
let all = 0;
let link = "";
let companyUrl = "";
let newSymbol = "";
let marqueeArray = [];

document.getElementById("loading").style.display = "none";

// MARQUEE

const marqueeUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/etf/list";

fetch(marqueeUrl) //asynchronous function, return a promeses, promes is a placeholder for a value that does not jet exist.
    .then((responseMarquee) => responseMarquee.json()) //json is the format of the internet. (is just a string).
    .then((dataMarquee) => {

      for(let m = 0 ; m<100 ; m++){
      //console.log("  "+dataMarquee[m]["symbol"]+ " $"+dataMarquee[m]["price"]+"  ");
      marqueeArray.push("  "+dataMarquee[m]["symbol"]+ " $"+dataMarquee[m]["price"]+"  ");
    }

    //console.log(marqueeArray);
    document.getElementById("marqueeP").innerHTML = marqueeArray;
    }
    );

// END MARQUEE

//documnet.getElementById("input tag").addEventLisener("input", function());

document.getElementById("searchButton").onclick = function () {
  //https://stackoverflow.com/questions/2788191/how-to-check-whether-a-button-is-clicked-by-using-javascript

  stackInput = document.getElementById("inputText").value;
  symbol = stackInput;
  url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`;
  link = ` ./company.html?symbol=${symbol}`;
  // console.log(url);
  // console.log(link);

  document.getElementById("loading").style.display = "flex";

  fetch(url) //asynchronous function, return a promeses, promes is a placeholder for a value that does not jet exist.
    .then((response) => response.json()) //json is the format of the internet. (is just a string).
    .then((data) => {
      for (let n = 0; n < data.length; n++) {

        const linkCompany = document.createElement("a");
        linkCompany.id = `link${n}`;
        linkCompany.classList.add("link-company");


        const divStock = document.createElement("div");
        divStock.id = `stocks${n}`;
        divStock.classList.add("acciones");

        const divStockLeft = document.createElement("img");
        divStockLeft.id = `stocksImg${n}`;
        divStockLeft.classList.add("stocks_img");
        divStockLeft.style= "height: 50px;width: 50px;display: flex;align-content: center;align-items: center;justify-content: center;";

        const divStockCenter = document.createElement("div");
        divStockCenter.id = `stocksName${n}`;

        const divStockRight = document.createElement("div");
        divStockRight.id = `stocksChanges${n}`;

        document.getElementById("bodyWrapper").append(linkCompany);
        document.getElementById(`link${n}`).append(divStockLeft);
        document.getElementById(`link${n}`).append(divStock);

        // document.getElementById(`stocks${n}`).append(divStockCenter);
        // document.getElementById(`stocks${n}`).append(divStockRight);

        for (let b = 0; b <= all; b++) {
          //!cleaning last searchs.
          document.getElementById(`stocks${b}`).innerHTML = "";
          document.getElementById(`link${b}`).href = "";
          document.getElementById(`stocks${b}`).className = "";
          document.getElementById(`stocksImg${b}`).src="";
        }

        for (let i = 0; i <= data.length - 1; i++) {
          newSymbol = data[i]["symbol"];
          //console.log(newSymbol);
          companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${newSymbol}`;
          
          fetch(companyUrl)
            .then((response2) => response2.json())
            .then((dataB) => {
              //console.log(dataB);
              //console.log(`$ ${dataB["profile"]["price"]}`);

              //for (a = 0; a <= data.length - 1; a++) {
              //console.log(data[a]["name"] + " (" + data[a]["symbol"] + ")");

              let fixedChanges = "";

              if (dataB["profile"]["changes"] >= 0) {
                fixedChanges = "+" + dataB["profile"]["changes"].toFixed(2);
              } else {
                fixedChanges = dataB["profile"]["changes"].toFixed(2);
              }

              
              let newDataName = data[i]["name"].replaceAll(new RegExp(stackInput, "ig"), `<span class="hightlight">${stackInput}</span>`);
              let newDataSymbol = data[i]["symbol"].replaceAll(new RegExp(stackInput, "ig"), `<span class="hightlight">${stackInput.toUpperCase()}</span>`);
              
              document.getElementById(`stocks${i}`).innerHTML =
              newDataName +
                " (" +
                newDataSymbol +
                ") (" +
                fixedChanges +
                "%)";

              document.getElementById(`stocksImg${i}`).src = dataB["profile"]["image"];

              document.getElementById(
                `link${i}`
              ).href = `./company.html?symbol=${data[i]["symbol"]}`;

              document.getElementById(`stocks${i}`).className = "acciones";

              linkCompany.href = `./company.html?symbol=${data[i]["symbol"]}`;

              //* DO YOUR DOM WORK HERE. (pin or prepin to add it to HTML)

              document.getElementById("loading").style.display = "none";
              all = data.length - 1;
              // }
            });
        }
      }
    });
};
