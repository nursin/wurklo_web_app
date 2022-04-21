import { ChatSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import MessageCard from '../../components/MessageCard';
import { db } from '../../firebase';

function Messages() {
    const [chats, setChats] = useState()
    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // fetch chats from firestore
    useEffect(() => {
        db
            .collection('chats')
            .where('usersInChat', 'array-contains', `${user?.uid}`)
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setChats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
    }, [user])



    return (
        <Container >
            <Row className='mx-1'>
                {
                    chats?.map((chat) => (
                        <MessageCard
                            key={chat.id}
                            chatDetails={chat}
                        />
                    ))
                }
            </Row>
        </Container>
    )
}

export default Messages