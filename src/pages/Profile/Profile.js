import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import ProfileInfo from '../../components/ProfileInfo';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import generateId from '../../lib/generateId';
import firebase from 'firebase'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ShareModal from '../../components/ShareModal';
import PerformEvalModal from '../../components/PerformEvalModal';

//redux 
import { useDispatch, useSelector } from 'react-redux';
import { saveContact, removeContact } from '../../redux/slices/user';


function Profile() {
    let { id } = useParams();
    const [wurkerProfile, setWurkerProfile] = useState({});
    const [loggedInProfile, setLoggedInUser] = useState();
    const [hire, setHire] = useState(false);
    const [contact, setContact] = useState(false);
    const [contacts, setContacts] = useState();

    const navigate = useNavigate();
    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('wurkers').doc(id).onSnapshot(doc => {
            setWurkerProfile(doc.data());
        })
        db.collection('users').doc(user?.uid).onSnapshot(doc => {
            setLoggedInUser(doc.data());
            // setContact(doc.data()?.contacts?.findIndex(obj => obj === id) >= 0);
        })
        window.scrollTo(0, 0)
        db.collection('contacts').doc(user?.uid).collection('contact').onSnapshot(collections => {
          setContacts(collections.docs.map(doc => (
            doc.id
          )));
          const contactArray = collections.docs.map(doc => (
            doc.id
          ))
          setContact(contactArray?.findIndex(obj => obj === id) >= 0);
        })
    }, [user]);

    const createChat = () => {
        db
            .collection('chats')
            .doc(generateId(loggedInProfile?.authUid, wurkerProfile?.authUid))
            .set({
                users: {
                    [loggedInProfile?.authUid]: loggedInProfile,
                    [wurkerProfile?.authUid]: wurkerProfile,
                },
                usersInChat: [loggedInProfile?.authUid, wurkerProfile?.authUid],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        navigate('/messages')
    }

    const isContact = () => {
        if (contacts.findIndex(obj => obj === id) >= 0) {
            dispatch(removeContact({ user, id }))
        } else {
            dispatch(saveContact({ wurkerProfile, user, id }))
        }
    }

    return (
        <Container className='profile mt-3 text-center text-md-start'>
            <div className='d-flex justify-content-between mb-2 mx-3 mx-sm-2 mx-md-0'>
                <ArrowBackIcon className='profile__backButton fs-1 mt-2 mt-md-0' onClick={() => navigate(-1)} />
                {/* {hire ?
                    <div>
                        <Button color='danger' outline className='profile__hireButton me-3 make-round bg-white' onClick={() => setHire(false)}>Fire</Button>
                        <Button color='primary' outline className='profile__completeButton make-round bg-white' onClick={() => setHire(false)}>Complete</Button>
                    </div>
                    :
                    <Button color='danger' outline className='profile__hireButton make-round bg-white' onClick={() => setHire(true)}>Hire</Button>
                } */}
                <PerformEvalModal id={id} />
                <ShareModal myProfile={false} uid={id}/>
                {contact ? <StarIcon className='profile__isContact mt-1 mt-md-2' onClick={isContact}/> :
                    <StarBorderIcon className='profile__notContact mt-1 mt-md-2' onClick={isContact}/>
                }
            </div>
            <Row className='mt-3'>
                <ProfileInfo
                    profile={true}
                    name={wurkerProfile.display_name}
                    skill={wurkerProfile.skill}
                    rate={wurkerProfile.rate}
                    imageUrl={wurkerProfile.photo_url}
                    availability={wurkerProfile.availability}
                    phone={wurkerProfile.phone}
                    email={wurkerProfile.email}
                    portfolioLink={wurkerProfile.portfolio_link}
                />
            </Row>
            <Row className='text-center'>
                <Col>
                    {user ? <Button outline className='loginModal__button shadow-none make-round my-4' onClick={createChat}>Send Message</Button> : <p className='profile__chatboxSigninMessage'>Sign in to send message</p>}
                </Col>
                {/* {user ? <ChatBox wurkerId={id} wurkerUid={wurkerProfile?.authUid} imageUrl={wurkerProfile?.imageUrl} wurkerName={wurkerProfile.name}/> : <p className='profile__chatboxSigninMessage'>Sign in to send message</p>} */}
            </Row>
        </Container>
    )
}

export default Profile