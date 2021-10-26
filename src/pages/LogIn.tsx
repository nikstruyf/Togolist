import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState , useContext , useEffect } from "react"

export default function LogIn() {
    const history = useHistory();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [showError, setShowError] = useState(false)

    const LoginSubmit = () => {
        if (username !== "" && password !== "") {
            history.push(`/app/togolist`);
            setShowError(false);
        }
        else {
            // alert('กรอกให้ครบสิจ้ะ');
            setShowError(true);
        }
    }

    return(
        <>
            <div className="container-fluid d-flex justify-content-center bg-light" style={{height: "100vh"}}>
                <div className="container-sm d-flex flex-column justify-content-center align-items-center">
                    <Alert severity="error" className="m-2" style={{display: showError ? "flex" : "none"}}>Please Enter Username and Password — <strong>check it out!</strong></Alert>
                    <div className="container d-flex flex-column justify-content-center align-items-center border border-3 border-info rounded-3 px-2 pb-4 overflow-hidden bg-white" style={{maxWidth: "60vh"}}>
                        <Link className="d-flex flex-row justify-content-start my-2" href="/" underline="none" style={{width: "100%"}}>
                            <ArticleIcon color="info"/><h5>ToGoList</h5>
                        </Link>
                        <h2>Log In</h2>
                        <Box component="form" sx={{ display: 'flex', '& .MuiInput-root': { m: 2, width: '50vh' }, }} noValidate autoComplete="off" className="ps-2 pb-3">
                            <div>
                                <Input placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" color="info" />
                                <Input placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" color="info" />
                            </div> 
                        </Box>
                        <Button variant="contained" color="info" disableElevation onClick={() => {LoginSubmit()}}>Login</Button>
                        <div className="mt-2">Don't have an account? <a href="/signup">Sign Up</a></div> 
                    </div>
                    
                </div>
            </div>   
        </>
    )
}