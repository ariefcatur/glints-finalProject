import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';

const Logout = () => {
    let history = useHistory();
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('status');
    history.push('/');
    return window.location.reload();
    return null;

}

export default Logout;