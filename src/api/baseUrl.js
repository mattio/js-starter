export default function getBaseUrl() {
  // Uses the host to decide if the dev mock API or real API will be used.
  // Could also use Node environment variables pass on command line.

  // This was the original development approach.
  // const inDevelopment = window.location.hostname === 'localhost';
  // return inDevelopment ? 'http://localhost:3001/' : '/';

  // http://localhost:3000/?useMockApi=true would return mock API.
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : '/';
}

// Can do this with other libraries.
function getQueryStringParameterByName(name, url) {
  if(!url) url = window.location.href;
  name = name.replace(/[\[\]]]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  var results = regex.exec(url);

  if(!results) return null;
  if(!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
