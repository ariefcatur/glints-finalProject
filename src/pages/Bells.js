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
        .get('http://52.148.70.171/subscription', {
            headers: { Authorization: `Bearer ${token}`} 
        })
        .then((res)=>{
            setNotif(res.data)
        })
        console.log("setNotif", setNotif)
    }, [])

    let tanggal = new Date();
    
    const maxDate = new Date(tanggal)
    maxDate.setDate(maxDate.getDate() + 3)
    //console.log("tanggal")
    let checkDueDate  = notif.filter((e)=>new Date(e.dueDate) <= maxDate)
    //console.log("cek due date", checkDueDate)
    // if(tanggal<checkDueDate){
    //     console.log("tampilkan notif")
    // }
    // else{
    //     console.log("notif ngak ada")
    // }
    return (
        <div>
            <div id="Popover1">
                <Bell />
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>Notification</PopoverHeader>
            {checkDueDate.map((notif)=>(
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
 
