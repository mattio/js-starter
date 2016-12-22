export default function getBaseUrl() {
  // Uses the host to decide if the dev mock API or real API will be used.
  // Could also use Node environment variables pass on command line.
  const inDevelopment = window.location.hostname === 'localhost';
  return inDevelopment ? 'http://localhost:3001/' : '/';
}
