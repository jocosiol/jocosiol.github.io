let symbol = "AA";
let url = "";
let stack = "";
let all = 0;
let link = "";

document.getElementById("loading").style.display = "none";

// ! COPY PASTE

document.getElementById("searchButton").onclick = function () {
  //https://stackoverflow.com/questions/2788191/how-to-check-whether-a-button-is-clicked-by-using-javascript

  stack = document.getElementById("inputText").value;
  symbol = stack;
  url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`;
  link = ` ./company.html?symbol=${symbol}`;
  console.log(url);
  console.log(link);

  document.getElementById("loading").style.display = "flex";

  fetch(url) //asynchronous function, return a promeses, promes is a placeholder for a value that does not jet exist.
    .then((response) => response.json()) //json is the format of the internet. (is just a string).
    .then((data) => {
      for (i = 0; i <= all; i++) {
        // const bodyWrapper = document.createElement("div");
        // bodyWrapper.classList.add("body-wrapper");

        // const list = document.createElement("div");
        // list.id = `stocks${i}`;

        // const atag = document.createElement("a");
        // atag.id = `link${i}`;
        //
        // atag.append(list);
        // bodyWrapper.append(atag);
        // document.body.append(bodyWrapper);

        //!cleaning last searchs.
        document.getElementById(`stocks${i}`).innerHTML = "";
        document.getElementById(`link${i}`).href = "";
        document.getElementById(`stocks${i}`).className = "";
      }

      for (i = 0; i <= data.length - 1; i++) {
        //     console.log(data[i]["name"]);
        //   console.log(data[i]["symbol"]);
        console.log(data[i]["name"] + " (" + data[i]["symbol"] + ")");
        document.getElementById(`stocks${i}`).innerHTML =
          data[i]["name"] + " (" + data[i]["symbol"] + ")";

        document.getElementById(
          `link${i}`
        ).href = `./company.html?symbol=${data[i]["symbol"]}`;

        document.getElementById(`stocks${i}`).className = "acciones";

        //* DO YOUR DOM WORK HERE. (pin or prepin to add it to HTML)

        document.getElementById("loading").style.display = "none";
        all = data.length - 1;
      }
    });
};
