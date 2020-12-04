import Cookies from "cookies";


export function checkLogin() {
    if (typeof Cookies.get('token') === 'undefined') {
        return false;
      } else {
        return true;
      }
}
