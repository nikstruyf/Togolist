import * as React from 'react';
import { useState , useContext , useEffect } from "react"
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { Cancel } from '@mui/icons-material';
import { API } from '../app.setting.json';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useAuth from '../hooks/useAuth';
import ReactLoading from 'react-loading';

export default function TogolistBox(props: any) {
    
    // const [cookies, setCookie] = useCookies(['HeyDude']);
    const Token = window.localStorage.getItem('token')

    const [state, setState] = useState('basic')
    const [show, setShow] = useState(false)
    // console.log(show)

    const [load, setLoad] = useState(false)

    const [subject, setSubject] = useState(props.subj)
    const [description, setDescription] = useState(props.desc)
    const sub: any = props.subj;
    const des: any = props.desc;
    const id: any = props.id;

    const [showError, setShowError] = useState<boolean>(false)

    const SaveSubmit = async () => {
        if (subject !== "") {
            setShowError(false);
            await axios.patch(`${API}/todo/updateTodo`, {todo: subject, id: id, description: description}, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                },     
            }).then((res) => {
                setState('detail');
            })
        }
        else {
            // alert('ไม่เพิ่มอะไรก็กดยกเลิกสิจ้ะ')
            setShowError(true);
        }
    }

    function Cancel() {
        setState('detail');
        setSubject(sub);
        setDescription(des);
        setShowError(false);
    }

    async function Delete() {
        setLoad(true);
        return await axios.delete(`${API}/todo/deleteTodo/${id}`,{
            headers: {
                'Authorization': `Bearer ${Token}`
            }
        }).then(res => {
            setShowError(false);
            setLoad(false);
            window.location.reload();
        }).catch(() => {
            ;
            return null;
        })
    }

    function DeleteFromArray() {

    }

    return state === 'basic' ? (
        <>
            <div className="container-fluid my-1 border border-2 rounded-pill border-info d-flex align-items-center bg-white overflow-hidden" style={{minHeight: "60px", display: "block"}} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <div className="d-flex flex-row align-items-center overflow-hidden" style={{width: "95%"}}>
                    <Checkbox color="info" onChange={() => {Delete();}} />
                    <h5 className="pt-1">{subject}</h5>
                </div>
                {load && (<ReactLoading type="spin" color="#00bcf5" height="30px" width="30px" />)}
                <div className="d-flex justify-content-end align-items-center">
                    {show && (
                        <div className="d-flex flex-row align-items-center">
                            <DeleteIcon className="me-3" color="info" onClick={() => {Delete();}} style={{cursor: "pointer"}}/>
                            <EditIcon className="me-2" color="info" onClick={() => {setState('edit');}} style={{cursor: "pointer"}}/>
                            <ExpandMoreIcon fontSize="large" color="info" onClick={() => {setState('detail');}} style={{cursor: "pointer"}}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : state === 'detail' ? (
        <>
            <div className="container-fluid my-1 border border-2 rounded-1 border-info align-items-center bg-white overflow-hidden" style={{height: "auto", display: "table" }}>
                <div className="d-flex flex-column align-items-start overflow-hidden display-linebreak mt-1" style={{width: "100%", height: "100%"}}>
                    <div className="d-flex flex-row align-items-center " style={{width: "100%"}}>
                            <Checkbox color="info" onChange={() => {Delete();}} />
                            <h5 className="pt-1" style={{width: "100%"}}>{subject}</h5>
                        <div className="d-flex justify-content-end ">
                            {load && (<ReactLoading type="spin" color="#00bcf5" height="30px" width="30px" />)}
                            <div className="d-flex align-items-center">
                                <DeleteIcon className="me-3" color="info" onClick={() => {Delete();}} style={{cursor: "pointer"}}/>
                                <EditIcon className="me-2" color="info" onClick={() => {setState('edit');}} style={{cursor: "pointer"}}/>
                                <ExpandLessIcon fontSize="large" color="info" onClick={() => {setState('basic');}} style={{cursor: "pointer"}}/>
                            </div>
                        </div>
                    </div> 
                    <p className="mx-2 mb-4">{description}</p>
                </div>
            </div>
        </>
    ) : (
        <> 
            <Alert severity="error" className="m-2" style={{display: showError ? "flex" : "none"}}>Please Enter Subject</Alert>  
            <div className="container-fluid my-1 border border-2 rounded-1 border-info d-flex flex-column align-items-center bg-white input-group overflow-hidden" style={{minHeight: "110px", height: "auto"}}>
                <div className="my-1" style={{width: "100%"}}>
                    <Input placeholder="Subject" type="text" defaultValue={subject} value={subject} onChange={(e) => {setSubject(e.target.value)}} color="info" style={{width: "100%"}} className="fw-bold" multiline={true}/>
                    <Input  placeholder="Description" type="text" defaultValue={description} value={description} onChange={(e) => {setDescription(e.target.value)}} color="info" style={{width: "100%"}} className="" multiline={true} minRows={2}/>
                </div>
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" size="small" disableElevation color="info" onClick={() => {SaveSubmit()}}>Save</Button>
                <Button variant="outlined" size="small" color="error" onClick={() => {Cancel();}}>Cancle</Button>
            </Stack>
              
        </>
    )
}