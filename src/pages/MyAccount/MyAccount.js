import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CreateWurker from '../../components/CreateWurker'
import UpdateWurker from '../../components/UpdateWurker'
import ProfileInfo from '../../components/ProfileInfo'
import { db } from '../../firebase';

//redux 
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/user';
import UpdateUser from '../../components/UpdateUser'

function MyAccount() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [userWurkerProfile, setUserWurkerProfile] = useState();

    useEffect(() => {
        if (!user) return;
        db
            .collection('wurkers')
            .where('authUid', '==', `${user?.uid}`)
            .onSnapshot(snapshot => {
                setUserWurkerProfile(snapshot.docs.map(doc => ({
                    id: doc.id,
                    wurker: doc.data()
                })));
            })
    }, [user]);

    return (
        <Container className='mt-3 text-center text-md-start'>
            <h1 className="myAccount__titleText text-center">My Account</h1>
            <hr className="text-white" />
            <Row className="mt-4">
                <h3 className="myAccount__titleText mb-4">User Profile</h3>
                <ProfileInfo
                    name={user?.displayName}
                    skill={user?.skill}
                    rate={user?.rate}
                    imageUrl={user?.photoURL.split('=')[0]}
                    availability={user?.availability}
                    phone={user?.phone}
                    email={user?.email}
                    portfolioLink={user?.portfolioLink}
                />
            </Row>
            <Row>
                <Col md={6} className='mt-4 ms-0 ms-lg-5 mb-4'>
                    <UpdateUser />
                </Col>
            </Row>
            {userWurkerProfile?.[0]?.wurker &&
                <>
                    <hr className="text-white" />
                    <Row className="mt-4">
                        <h3 className="myAccount__titleText mb-4">Wurker Profile</h3>
                        <ProfileInfo
                            name={userWurkerProfile?.[0]?.wurker?.displayName}
                            skill={userWurkerProfile?.[0]?.wurker?.skill}
                            rate={userWurkerProfile?.[0]?.wurker?.rate}
                            imageUrl={userWurkerProfile?.[0]?.wurker?.photoURL}
                            availability={userWurkerProfile?.[0]?.wurker?.availability}
                            phone={userWurkerProfile?.[0]?.wurker?.phone}
                            email={userWurkerProfile?.[0]?.wurker?.email}
                            portfolioLink={userWurkerProfile?.[0]?.wurker?.portfolioLink}
                        />
                    </Row>
                    <Row>
                        <Col md={6} className='mt-4 ms-0 ms-lg-5 mb-4'>
                            <UpdateWurker wurker={userWurkerProfile?.[0]}/>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default MyAccount