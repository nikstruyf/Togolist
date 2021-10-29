import * as React from 'react';
import { useState , useContext , useEffect } from "react"
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import TogolistBox from '../components/TogolistBox'
import AddTogolist from '../components/AddTogolist'
import { useCookies } from 'react-cookie';
import { API } from '../app.setting.json';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { AddTask } from '@mui/icons-material';

export default function Todolist() {
    // const [cookies, setCookie] = useCookies(['HeyDude']);
    const Name = window.localStorage.getItem('name');
    const Token = window.localStorage.getItem('token')
    const [allTogolist, setAllTogolist] = useState<any>(null)
    // const arrayOfTogolist = [{subject: "Wake Up", description: "now!"}, {subject: "Hey dude!", description: "At its most basic, testing is an automated tool that finds errors in your development as early as possible. That way, you’re able to fix those issues before they make it into production. Tests also serve as a reminder that you may have forgotten to check your own work in a certain area, say accessibility. At its most basic, testing is an automated tool that finds errors in your development as early as possible. That way, you’re able to fix those issues before they make it into production. Tests also serve as a reminder that you may have forgotten to check your own work in a certain area, say accessibility. At its most basic, testing is an automated tool that finds errors in your development as early as possible. That way, you’re able to fix those issues before they make it into production. Tests also serve as a reminder that you may have forgotten to check your own work in a certain area, say accessibility."}];
    
    async function getTodoList() {
        return await axios.get(`${API}/todo/getTodo`, {
            headers: {
                'Authorization': `Bearer ${Token}`
            }
        }).then(res => {
            // console.log("getTodoList: "+res.data.TodoList)
            return res.data.TodoList;
        }).catch(() => {
            return null;
        })
    }
    // console.log("cookies! : "+cookies.HeyDude)

    const SignOut = () => {
        console.log('sus')
        // setCookie('HeyDude','');
        window.localStorage.setItem('token','')
    }

    useEffect(() => {
        async function init() {
            var t = await getTodoList();
            setAllTogolist(t);
        }
        init();
    },[])

    // setAllTogolist(TodoList)
    
    const resTogolist = allTogolist === null ? [] : allTogolist.map((data: any, index: number)=> {
        return <TogolistBox subj={data.todo} desc={data.description} id={data.id} key={index}/>;
    });

    return (
        <>
            <div className="container-fluid d-flex justify-content-center bg-white py-4" style={{ height: "100vh" }}>
                <div className="container d-flex flex-column justify-content-center align-items-center border border-3 border-info rounded-3 px-2 pb-4 overflow-hidden bg-info">
                    <div className="d-flex flex-row justyfy-content-start align-items-center text-white" style={{ cursor: "pointer", width: "100%" }}>
                        <ArticleIcon fontSize="large" />
                        <h1>ToGoList</h1>
                        <div className="d-flex justify-content-end align-items-center text-uppercase fs-4 mb-1" style={{ width: "100%" }}>
                            <div className="d-flex flex-column">
                                <div>{Name}</div>
                                <div className="d-flex flex-row justify-content-end "><a className="text-decoration-none btn btn-outline-light btn-sm" href="/login" role="button" onClick={() => {SignOut()}}>Sign Out</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="container-sm d-flex flex-column align-items-start bg-light border rounded-2" style={{ height: "100%", overflowY: "scroll", scrollBehavior: "smooth" }}>
                        {/* {allTogolist === null ? [] : allTogolist.map((data: any, index: number)=> {
                            return <TogolistBox subj={data.todo} desc={data.description} id={data.id} key={index} array={allTogolist} setArray={setAllTogolist}/>;
                        })} */}
                        {resTogolist}
                        <AddTogolist />
                    </div>
                </div>
            </div>
        </>
    )
}