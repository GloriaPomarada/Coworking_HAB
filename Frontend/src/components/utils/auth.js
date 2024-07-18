import { jwtDecode } from "jwt-decode";

class Auth {
  login(token) {
    localStorage.setItem("token", token);
    window.location.assign("/home");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  getProfile() {
    return jwtDecode(this.getToken());
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  isAdmin() {
    const profile = this.getProfile();
    return profile && typeof profile.isAdmin === "boolean"
      ? profile.isAdmin
      : false;
  }
}

export default new Auth();
