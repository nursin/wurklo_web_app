import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import '../../App.css';
import CreateWurker from '../../components/CreateWurker';
import Search from '../../components/Search';
import { db } from '../../firebase';
import logo from '../../images/wurklo-logo-e0e1dd.svg';
import axios from '../../axios';

function LandingPage() {
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
        <div className='search'>
            <div className='text-center'>
                <img src={logo} className="landingPage__logo" alt="Wurklo logo" />
                <p className='landingPage__logoText pt-3'>Wurklo</p>
                <p className='landingPage__sloganText'>Search Wurkers, Chat, Hire, Pay</p>
            </div>
            <Search />
            <div className='mt-4'>
                {!userWurkerProfile?.[0]?.wurker &&
                    <CreateWurker />
                }
            </div>
        </div>
    );
};

export default LandingPage;