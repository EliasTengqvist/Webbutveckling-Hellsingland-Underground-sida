console.log("mislyckande");

async function testAPI() {
  const url =
    "https://spotify23.p.rapidapi.com/search/?q=wham&type=multi&offset=0&limit=10&numberOfTopResults=5";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a754c42894msh9bc4254f095f509p13369cjsn2bc890864ae8",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

testAPI();
