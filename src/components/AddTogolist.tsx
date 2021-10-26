import { useState , useContext , useEffect } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export default function AddTogolist() {
    
    const [add, setAdd] = useState(false)
    console.log(add)

    const [subject, setSubject] = useState<string>("")
    const [description, setDescripttion] = useState<string>("")

    const [showError, setShowError] = useState<boolean>(false)

    const AddSubmit = () => {
        if (subject !== "") {
            setAdd(false);
            setShowError(false);
        }
        else {
            // alert('ไม่เพิ่มอะไรก็กดยกเลิกสิจ้ะ')
            setShowError(true);
        }
    }

    const Cancel = () => {
        setAdd(false);
        setShowError(false);
    }

    useEffect( () => {
        if (subject !== "") {
            setShowError(false)
        }
        else {
            setShowError(true)
        }
    },[subject])
    
    return add === false ? (
        <>
            <div className="mt-2 ms-3 d-flex align-items-center text-info" onClick={() => {setAdd(true);}} style={{cursor: "pointer"}}>
                <AddCircleOutlineIcon />Add New
            </div>  
        </>
    ) : (
        <> 
            <Alert severity="error" className="m-2" style={{display: showError ? "flex" : "none"}}>Please Enter Subject</Alert>  
            <div className="container-fluid my-1 border border-2 rounded-1 border-info d-flex flex-column align-items-center bg-white input-group" style={{height: "auto"}}>
                <div className="my-2" style={{width: "100%"}}>
                    <Input placeholder="Subject" type="text" value={subject} onChange={(e) => {setSubject(e.target.value)}} color="info" style={{width: "100%"}} className="fw-bold"/>
                    <Input  placeholder="Description" type="text" value={description} onChange={(e) => {setDescripttion(e.target.value)}} color="info" style={{width: "100%"}} className="" multiline={true} minRows={2}/>
                </div>
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" size="small" disableElevation color="info" onClick={() => {AddSubmit()}}>Add</Button>
                <Button variant="outlined" size="small" color="error" onClick={() => {Cancel();}}>Cancle</Button>
            </Stack>
        </>
    )
}