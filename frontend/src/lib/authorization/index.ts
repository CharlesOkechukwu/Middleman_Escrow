export default class Authorization {
  isAuthenticated() {
    return !!this.token();
  }

  getCookie(name: string) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  setCookie(name: string, value: string | string[], expires_at: number) {
    let expires = "";
    if (expires_at) {
      const date = new Date();
      // date.setTime(date.getTime() + expires_at * 24 * 60 * 60 * 1000);
      date.setTime(date.getTime() + expires_at * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  deleteCookie(type: string) {
    document.cookie = `${type}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    return "";
  }

  token() {
    return this.getCookie("access_token");
  }

  setToken(token: string, expires_at: number) {
    this.setCookie("access_token", token, expires_at);
    this.token();
  }

  deleteToken() {
    this.deleteCookie("access_token");
  }

}