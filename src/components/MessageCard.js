import React, { useEffect, useState } from 'react'
import { Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { db } from "../firebase";

function MessageCard({ chatDetails }) {
    const navigate = useNavigate();
    const [matchedUserInfo, setMatchedUserInfo] = useState();
    const [lastMessage, setLastMessage] = useState();

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // remove logginUser data from chatDetails
    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(chatDetails?.users, user?.uid))
    }, [chatDetails, user])

    //last message
    useEffect(() => {
        db
            .collection("chats")
            .doc(chatDetails.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot((snapshot) => {
                setLastMessage(snapshot.docs[0]?.data()?.message);
            })

    }, [chatDetails, db])

    return (
        <Col xs={12} md={5} className='messageCard p-0 my-2 mx-md-auto bg-white' onClick={() => navigate('/chat', { state: { chatDetails } })}>
            <img src={matchedUserInfo?.photoURL} className="me-3" alt="Profile Pic" />
            <div className='messageCard__info me-2 pt-1'>
                <h3>{matchedUserInfo?.displayName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h3>
                <p>{lastMessage || "Say Hi!"}</p>
            </div>
        </Col>
    )
}

export default MessageCard