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
import Delete from '@mui/icons-material/Delete';

export default function TogolistBox(props: any) {

    const [show, setShow] = useState<number>(0)
    console.log(show)

    const [subject, setSubject] = useState(props.subj)
    const [description, setDescription] = useState(props.desc)

    const SaveSubmut = () => {
        setShow(1)
    }

    function Delete() {
        alert('ลบน้าาา');
    }

    return show === 0 ? (
        <>
            <div className="container-fluid my-1 border border-2 rounded-pill border-info d-flex align-items-center bg-white" style={{height: "60px"}}>
                <div className="d-flex flex-row align-items-center overflow-hidden" style={{width: "95%"}}>
                    <Checkbox color="info" onChange={() => {alert('Hi');}} />
                    <h5 className="pt-1">{subject}</h5>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <DeleteIcon className="me-3" color="info" onClick={() => {Delete();}} style={{cursor: "pointer"}}/>
                    <EditIcon className="me-2" color="info" onClick={() => {setShow(2);}} style={{cursor: "pointer"}}/>
                    <ExpandMoreIcon fontSize="large" color="info" onClick={() => {setShow(1);}} style={{cursor: "pointer"}}/>
                </div>
            </div>
        </>
    ) : show === 1 ? (
        <>
            <div className="container-fluid my-1 border border-2 rounded-1 border-info d-flex align-items-center bg-white" style={{height: "auto"}}>
                <div className="d-flex flex-column align-items-start overflow-hidden display-linebreak" style={{width: "99%"}}>
                    <div className="d-flex flex-row align-items-center " style={{width: "100%"}}>
                            <Checkbox color="info"  />
                            <h5 className="pt-1" style={{width: "100%"}}>{subject}</h5>
                        <div className="d-flex justify-content-end ">
                            <div className="d-flex align-items-center">
                                <DeleteIcon className="me-3" color="info" onClick={() => {Delete();}} style={{cursor: "pointer"}}/>
                                <EditIcon className="me-2" color="info" onClick={() => {setShow(2);}} style={{cursor: "pointer"}}/>
                                <ExpandLessIcon fontSize="large" color="info" onClick={() => {setShow(0);}} style={{cursor: "pointer"}}/>
                            </div>
                        </div>
                    </div> 
                    <p className="mx-2">{description}</p>
                </div>
            </div>
        </>
    ) : (
        <> 
            <div className="container-fluid my-1 border border-2 rounded-1 border-info d-flex flex-column align-items-center bg-white input-group" style={{height: "auto"}}>
                <div className="my-1" style={{width: "100%"}}>
                    <Input placeholder="Subject" type="text" defaultValue={subject} onChange={(e) => {setSubject(e.target.value)}} color="info" style={{width: "100%"}} className="fw-bold"/>
                    <Input  placeholder="Description" type="text" defaultValue={description} onChange={(e) => {setDescription(e.target.value)}} color="info" style={{width: "100%"}} className="" multiline={true} minRows={2}/>
                </div>
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" size="small" disableElevation color="info" onClick={() => {SaveSubmut()}}>Save</Button>
                <Button variant="outlined" size="small" color="error" onClick={() => {setShow(0);}}>Cancle</Button>
            </Stack>
              
        </>
    )
}