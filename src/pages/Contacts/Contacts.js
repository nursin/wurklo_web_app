import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import WurkerCard from '../../components/WurkerCard'
import Search from '../../components/Search'
const wurker = {
  displayName: "Bobby Keel",
  skill: "Full Stack Developer",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/wurklo.appspot.com/o/profilePic.webp?alt=media&token=f0f6e321-e5b7-4825-8c34-c90d39ad800d"
}
function Contacts() {
  return (
    <Container fluid>
      {/* <Row>
        <Col className='searchResults__searchInput'>
          <Search placeholderValue="Search contacts ..."/>
        </Col>
      </Row> */}
      <Row className='m-5 mb-5'>
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
        <WurkerCard
          id={'rEdrSQcQCVNTT9RQTpN2uODtj7Y2'}
          wurker={wurker}
        />
      </Row>
    </Container>
  )
}

export default Contacts