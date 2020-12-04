import Cookies from "js-cookie";


export function checkLogin() {
    if (typeof Cookies.get('token') === 'undefined') {
        return false;
      } else {
        return true;
      }
}
