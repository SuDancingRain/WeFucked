import Calls from "../src/calls.js";

const appAssetsBaseUri = (
  document.baseURI ||
  (document.querySelector("base") || {}).href ||
  location.protocol + "//" + location.host + location.pathname
).replace(/^(.*)\/.*$/, "$1/"); // strip what's after last slash

Calls.call = (method, url, dtoIn) => {
  let mockUrl = (process.env.MOCK_DATA_BASE_URI || appAssetsBaseUri) + "mock/data/" + url + ".json";
  let responsePromise = (async () => {
    let response = await fetch(mockUrl);
    return await response.json();
  })();
  return dtoIn != null ? responsePromise.then(dtoIn.done, dtoIn.fail) : responsePromise;
};

Calls.getCommandUri = (useCase) => {
  return useCase;
};

export default Calls;
