const { join } = require("node:path");
const { apikey } = require("./api");

// set apikey in ./api.js
const PREMIUMIZE_APIKEY = apikey;

function post(formData) {
  console.log("formData", formData);
  return fetch(
    `https://www.premiumize.me/api/transfer/create?apikey=${PREMIUMIZE_APIKEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-nzb",
      },
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
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
