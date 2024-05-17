function addNewdiv(element) {
  // get current div to know how many elements and add children
  const currentDiv = document.getElementById("searchresults");
  //create new div with title and coverart
  let n_items = currentDiv.childNodes.length;
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", n_items.toString());
  newDiv.setAttribute("class", "album_div");
  //const newTitle = document.createElement("p", element.data.name);
  //newDiv.appendChild(newTitle);
  newDiv.innerHTML = "<p>" + element.data.name + "</p>";
  let newCoverart = document.createElement("img");
  newCoverart.src = element.data.coverArt.sources[0].url;
  //const newContent = document.createTextNode("");

  newDiv.appendChild(newCoverart);

  currentDiv.appendChild(newDiv);
  //document.body.insertBefore(newDiv, currentDiv);
}

async function fetchSpotifyData(querytext = "HellsinglandUnderground") {
  const url_prefix = "https://spotify23.p.rapidapi.com/search/?q=";
  const url_suffix = "&type=multi&offset=0&limit=50&numberOfTopResults=5";
  //var querytext = "HellsinglandUnderground";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a754c42894msh9bc4254f095f509p13369cjsn2bc890864ae8",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  let url = url_prefix + querytext + url_suffix;
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  /*try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
  */
  return result;
}
function querywebsafe(querytext) {
  //This function is to make sure to make space be replaced by "%20"
  let webquery = querytext.replace(/ /g, "%20");
}
async function listsearchresults(querytext) {
  //querytext = querywebsafe(querytext);   --- ignored because it doesn't work which is strange.
  let result = await fetchSpotifyData(querytext);
  // get the albums from result
  console.log(result.albums);
  // create div with album content
  //result.albums.forEach((element) => {});
  let albums = result.albums;
  for (let i = 0; i < albums.items.length; i++) {
    const element = albums.items[i];

    if (
      element.data.artists.items[0].profile.name == "Hellsingland Underground"
    ) {
      addNewdiv(element);
    }
  }
}

const $searchtext = document.getElementById("search-bar");
$searchtext.onkeydown = function (event) {
  if (event.key === "Enter") {
    listsearchresults($searchtext.value);
  }
};
