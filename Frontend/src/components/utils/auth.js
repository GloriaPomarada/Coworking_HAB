import { jwtDecode } from "jwt-decode";

class Auth {
  login(token) {
    localStorage.setItem("token", token);
    window.location.assign("/espacios");
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
    return token ? true : false;
  }
}

export default new Auth();
