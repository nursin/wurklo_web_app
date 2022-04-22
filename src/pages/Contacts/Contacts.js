import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import WurkerCard from '../../components/WurkerCard'
//redux 
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/slices/user';
import { db } from '../../firebase';

const wurker = {
  displayName: "Bobby Keel",
  skill: "Full Stack Developer",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/wurklo.appspot.com/o/profilePic.webp?alt=media&token=f0f6e321-e5b7-4825-8c34-c90d39ad800d"
}

function Contacts() {
  const [contacts, setContacts] = useState();
  // redux
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    db
      .collection('contacts')
      .doc(user?.uid)
      .collection('contact')
      // .orderBy('display_name', "asc")
      // .limit(20)
      .get()
      .then((collections) => {
        setContacts(collections.docs.map(doc => ({
          id: doc.id,
          contact: doc.data()
        })));
        // setLastDoc(collections.docs[collections.docs.length - 1]);
      })
  }, [user]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className='wurklo__textColor mb-0 text-center'>Contacts</h1>
        </Col>
      </Row>
      <Row className='m-5 mb-5'>
        {
          contacts?.map(({id, contact}) => (
            <WurkerCard
              key={id}
              id={contact.wurker_id}
              displayName={contact.display_name}
              skill={contact.skill}
              photoURL={contact.photo_url}
            />
          ))

        }

      </Row>
    </Container>
  )
}

export default Contacts