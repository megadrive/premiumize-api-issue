const { join } = require("node:path");
const { apikey } = require("./api");

// set apikey in ./api.js
const PREMIUMIZE_APIKEY = apikey;
if (PREMIUMIZE_APIKEY === undefined || PREMIUMIZE_APIKEY.length === 0) {
  throw new Error("Please set your Premiumize API key in ./api.js");
}

function post(formData) {
  console.log("formData", formData);
  return fetch(
    `https://www.premiumize.me/api/transfer/create?apikey=${PREMIUMIZE_APIKEY}`,
    {
      method: "POST",
      body: formData,
    }
  );
}

// submit a POST request to the Premiumize API with a blob
const nzbFilePath = join(__dirname, "./Big.Buck.Bunny.nzb");
const blob = new Blob([nzbFilePath], { type: "application/x-nzb" });
const formDataWithFileBlob = new FormData();
formDataWithFileBlob.append("file", blob);

post(formDataWithFileBlob)
  .then((response) => response.json())
  .then((data) => {
    console.log("fileblob");
    console.log(data);
  })
  .catch((error) => console.error(error));

const formDataWithSrc = new FormData();
formDataWithSrc.append(
  "src",
  "https://raw.githubusercontent.com/megadrive/premiumize-api-issue/main/Big.Buck.Bunny.nzb"
);

post(formDataWithSrc)
  .then((response) => response.json())
  .then((data) => {
    console.log("src");
    console.log(data);
  })
  .catch((error) => console.error(error));
