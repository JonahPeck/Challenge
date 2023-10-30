import React from 'react';
import {useRouter} from "next/router";

function handleTicketView(e){
    e.preventDefault();
    fetch("http://127.0.0.1:5555/tickets",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    router.push("http://127.0.0.1:5555/tickets")
}
