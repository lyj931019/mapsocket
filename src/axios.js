import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://119.29.3.168/map_socket/api/';
// axios.defaults.baseURL = 'http://192.168.1.12/git/bsmq/map_socket/api/';


export default axios;

