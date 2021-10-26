import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import Link from '@mui/material/Link';


export default function Home() {
    let history = useHistory();

    return (
        <>
            <div className="container-fluid d-flex justify-content-center bg-white" style={{height: "100vh"}}>
                <div className="container-sm d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justyfy-content-center align-items-center text-primary" style={{cursor: "pointer"}}>
                        <ArticleIcon color="primary" fontSize="large"/>
                        <h1>ToGoList</h1>
                    </div>
                    <h5>Organize yours</h5>
                    <h5>Let's Start!</h5><br />
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" color="info" onClick={() => {history.push("/signup");}}>Sign Up</Button>
                        <Button variant="contained" disableElevation color="info" onClick={() => {history.push("/login");}}>Log In</Button>
                    </Stack>
                </div>
            </div>
        </>
    )
}