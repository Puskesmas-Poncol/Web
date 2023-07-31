export function getUserToken() {
  return localStorage.getItem("token");
}

export function setUserToken(token) {
  localStorage.setItem("token", token);
}

export function deleteUserToken() {
  localStorage.clear();
}
