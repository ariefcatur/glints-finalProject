import React, { useEffect, useState } from 'react';
import {Bell} from 'react-feather';
import axios from "axios";
import Cookies from "js-cookie";
import {
    Button,
    Popover,
    PopoverHeader,
    PopoverBody
}from 'reactstrap';


const Bells = () => {
    const [notif, setNotif] = useState([]);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    
    const token = Cookies.get("token");

    const toggle = () => setPopoverOpen(!popoverOpen)

    useEffect(()=>{
        setLoading(true);
        axios
        .get('http://3.0.91.163/subscription', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((res)=>{
            setNotif(res.data)
        })
    }, [])

    let checkDueDate = notif.filter((e)=>e.date.substr(0, 10) ==date)
    console.log(checkDueDate)
    return (
        <div>
            <div id="Popover1">
                <Bell />
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>Notification</PopoverHeader>
            {notif.map((notif)=>(
                <PopoverBody>
                <h3>{notif.service.name}</h3>
                <h3>{notif.dueDate}</h3>
                </PopoverBody>
            ))}
            </Popover>
        </div>    
    );
    
}
export default Bells;
 
