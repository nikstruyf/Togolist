import axios from 'axios';
import { API } from '../app.setting.json'
import { useCookies } from "react-cookie"


export default function useAuth() {
    const [cookies, setCookie] = useCookies(['HeyDude']);

    async function getUserData() {
        return await axios.get(`${API}/todo/getTodo`, {
            headers: {
                'Authorization': `Bearer ${cookies.HeyDude}`
            }
        }).then(res => {
            console.log("getTodoList: "+res.data)
            ;
            return res.data;
        }).catch(() => {
            setCookie('HeyDude', "");
            ;
            return null;
        })
    }
}