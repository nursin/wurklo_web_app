import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Input, Row } from 'reactstrap';
import Message from '../../../components/Message';
import SendIcon from '@mui/icons-material/Send';
import { db } from '../../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [matchedUserInfo, setMatchedUserInfo] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(location?.state.chatDetails?.users, user?.uid))
    }, [])

    useEffect(() => {
        db
            .collection('chats')
            .doc(`${location?.state.chatDetails?.id}`)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
            })
    }, [location?.state.chatDetails, db])

    const handleSendMessage = (e) => {
        console.log('user', user)
        console.log('senderDetailsa', location?.state.chatDetails?.users[user?.uid])
        const display_name = user.displayName;
        e.preventDefault();
        db
            .collection('chats')
            .doc(`${location?.state.chatDetails?.id}`)
            .collection('messages')
            .add({
                sender_uid: user?.uid,
                message: message,
                sender_name: display_name,
                photo_url: location?.state.chatDetails?.users[user?.uid]?.photo_url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setMessage('')
    }

    // const isContact = () => {
    //     if (loggedInProfile?.contacts?.find(id => wurkerProfile?.authUid)) {
    //         dispatch(removeContact({user, id}))
    //     } else {
    //         dispatch(saveContact({user, id}))
    //     }
    // }

    return (
        <Container >
            <Row>
                <Col className='d-flex justify-content-between'>
                    <ArrowBackIcon className='profile__backButton fs-1 mt-2' onClick={() => navigate(-1)} />
                    <div className='d-flex'>
                        <h3 className='wurklo__textColor mt-2'>{matchedUserInfo?.display_name?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h3>
                        <img className='message__senderImage ms-3' src={matchedUserInfo?.photo_url} />
                    </div>
                </Col>
                <div className='chatBox mt-2'>
                    <Form>
                        <Input
                            className='profile__messageInput mt-3 p-3 shadow-none'
                            placeholder='Send a message ...'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button type='submit' divor='primary' outline className='chatBox__button border-0 bg-white' onClick={handleSendMessage} disabled={!message && "disabled"}><SendIcon className='fs-2' /></Button>
                    </Form>

                    <div className='profile__messageBox mb-5 rounded-bottom bg-white'>
                        <FlipMove>
                            {messages?.map(({ id, message }) => (
                                <Message key={id} message={message} />
                            ))}
                        </FlipMove>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Chat