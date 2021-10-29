import { useState , useContext , useEffect } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { API } from '../app.setting.json';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useAuth from '../hooks/useAuth';
import ReactLoading from 'react-loading';

export default function AddTogolist() {

    // const [cookies, setCookie] = useCookies(['HeyDude']);
    const Token = window.localStorage.getItem('token')
    
    const [add, setAdd] = useState(false)
    // console.log(add)

    const [subject, setSubject] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [showError, setShowError] = useState(false)
    // console.log('show: '+showError)

    const [load, setload] = useState(false)

    // console.log(cookies.HeyDude)

    const AddSubmit = async () => {
        if (subject !== "" && add === true) {
            setload(true)
            setShowError(false);
            await axios.post(`${API}/todo/createNewTodo`, {todo: subject, description: description}, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                },     
            }).then((res) => {
                setAdd(false);
                setSubject("")
                setDescription("")
                setload(false)
                window.location.reload();
            })
            
        }
        else {
            // alert('ไม่เพิ่มอะไรก็กดยกเลิกสิจ้ะ')
            setShowError(true);
        }
    }

    const Cancel = () => {
        setSubject("");
        setDescription("");
        setAdd(false);
        setShowError(false);
    }

    return add === false ? (
        <>
            <div className="my-2 ms-3 d-flex align-items-center text-info" onClick={() => {setAdd(true);}} style={{cursor: "pointer"}}>
                <AddCircleOutlineIcon /><span>Add New </span>
            </div>  
        </>
    ) : (
        <> 
            <Alert severity="error" className="m-2" style={{display: showError ? "flex" : "none"}}>Please Enter Subject</Alert>  
            <div className="container-fluid my-1 border border-2 rounded-1 border-info d-flex flex-column align-items-center bg-white input-group" style={{height: "auto"}}>
                <div className="my-2" style={{width: "100%"}}>
                    <Input placeholder="Subject" type="text" value={subject} onChange={(e) => {setSubject(e.target.value)}} color="info" style={{width: "100%"}} className="fw-bold" multiline={true}/>
                    <Input  placeholder="Description" type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} color="info" style={{width: "100%"}} className="" multiline={true} minRows={2}/>
                </div>
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" size="small" disableElevation color="info" onClick={() => {AddSubmit()}}>Add</Button>
                <Button variant="outlined" size="small" color="error" onClick={() => {Cancel();}}>Cancle</Button>
                {load && (<ReactLoading type="spin" color="#00bcf5" height="25px" width="25px" />)}
            </Stack>
        </>
    )
}