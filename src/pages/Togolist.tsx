import * as React from 'react';
import { useState , useContext , useEffect } from "react"
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import TogolistBox from '../components/TogolistBox'
import AddTogolist from '../components/AddTogolist'

export default function Todolist() {

    const arrayOfTogolist = [{subject: "Wake Up", description: "now!"}, {subject: "Hey dude!", description: "Yo!"}];

    const [allTogolist, setAllTogolist] = useState<any>(arrayOfTogolist)

    const resTogolist = allTogolist === null ? [] : allTogolist.map((data: any)=> {
        return <TogolistBox subj={data.subject} desc={data.description} />;
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
                                <div>Nik</div>
                                <div><a className=" text-decoration-none btn btn-outline-light btn-sm" href="/login" role="button">Sign Out</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="container-sm d-flex flex-column align-items-start bg-light border rounded-2" style={{ height: "100%" }}>
                        {resTogolist}
                        <AddTogolist />
                    </div>
                </div>
            </div>
        </>
    )
}