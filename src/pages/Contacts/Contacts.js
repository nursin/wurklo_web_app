import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import WurkerCard from '../../components/WurkerCard'
//redux 
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/slices/user';

const wurker = {
  displayName: "Bobby Keel",
  skill: "Full Stack Developer",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/wurklo.appspot.com/o/profilePic.webp?alt=media&token=f0f6e321-e5b7-4825-8c34-c90d39ad800d"
}

function Contacts() {
  // redux
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className='wurklo__textColor mb-0 text-center'>Contacts</h1>
        </Col>
      </Row>
      <Row className='m-5 mb-5'>
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          displayName={wurker.displayName}
          skill={wurker.skill}
          photoURL={wurker.photoURL}
        />
      </Row>
    </Container>
  )
}

export default Contacts