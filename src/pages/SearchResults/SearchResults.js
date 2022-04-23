import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Input, Row } from 'reactstrap'
import WurkerCard from '../../components/WurkerCard'
import { useParams } from 'react-router-dom';
import { InstantSearch, SearchBox, Hits, Stats } from "react-instantsearch-dom"
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { useNavigate } from "react-router-dom";
import { SortBy, Pagination, Configure, RefinementList } from 'react-instantsearch-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';


function openNav() {
    document.getElementById("searchSidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("searchSidebar").style.width = "0";
}

function SearchResults() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { searchParams } = useSelector((state) => state.search);
    const [longitude, setLongitude] = useState(-85.6699075);
    const [latitude, setLatitude] = useState(30.220028);
    const [loading, setLoading] = useState(false);
    const [radius, setRadius] = useState(100);
    const [metric, setMetric] = useState('mi');

    // Create a Typesense Client using the search-only API key
    const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
        server: {
            apiKey: "N1QsozxFYgafvNigVIzjeLQ3ZNTVGzGZ", // Be sure to use a Search API Key
            nodes: [
                {
                    host: '8vhgabwrmky6pz7cp-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
                    port: '443',
                    protocol: 'https'
                },
            ],
        },
        // The following parameters are directly passed to Typesense's search API endpoint.
        //  So you can pass any parameters supported by the search endpoint below.
        //  queryBy is required.
        additionalSearchParameters: {
            queryBy: "tags,skill,display_name",
            filter_by: `location_typesense:(${latitude}, ${longitude}, ${radius} ${metric})`,
        },
    })

    const searchClient = typesenseInstantsearchAdapter.searchClient
    const Hit = ({ hit }) => (
        <WurkerCard
            key={hit.id}
            id={hit.id}
            displayName={hit.display_name}
            skill={hit.skill}
            photoURL={hit.photo_url}
        />
    )

    // geolocate, low accuracy, get new location
    const options = {
        timeout: 10000,
        maximumAge: 0
    }

    function success(pos) {
        const crd = pos.coords;
        setLatitude(crd.latitude)
        setLongitude(crd.longitude)
        setLoading(false)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setLoading(false)
        alert('Timed out before getting location, or an error occured')
    }

    const getPosition = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return (
        <Container fluid>
            <Row className='me-0'>
                <Col md={12}>
                    <InstantSearch searchClient={searchClient} indexName="wurkers">
                        <Configure
                            hitsPerPage={10}
                        />
                        <div className='d-flex searchResults__sortBox'>
                            <FilterListIcon
                                className='filterSearchResults__searchFilterIcon'
                                onClick={openNav}
                            />
                            <SearchBox
                                translations={{ placeholder: 'Search wurkers ... ex. full stack developer, react', submitTitle: `${searchParams}` }}
                                className='search-box'
                                onSubmit={event => {
                                    event.preventDefault();
                                    setSearch(event.target[0].value);
                                }}
                            />
                        </div>
                        <div className='searchResults__container'>
                            <Pagination />
                            <Stats />
                            <Hits hitComponent={Hit} />
                        </div>
                        <div id="searchSidebar" className="sidebarFilter shadow pb-5">
                            <button className="closebtn" onClick={() => closeNav()}>×</button>
                            <div>
                                <div className='d-flex justify-content-around'>
                                    <SortBy
                                        className='text-center'
                                        defaultRefinement='wurkers'
                                        items={[
                                            { label: 'Rate', value: 'rate' },
                                            { label: 'Low - High', value: 'wurkers/sort/rate:asc' },
                                            { label: ' High - Low', value: 'wurkers/sort/rate:desc' }
                                        ]}
                                    />
                                    <SortBy
                                        className='text-center'
                                        defaultRefinement='wurkers'
                                        items={[
                                            { label: 'Years Exp', value: 'yearsOfExp' },
                                            { label: 'Low - High', value: 'wurkers/sort/years_of_exp:asc' },
                                            { label: ' High - Low', value: 'wurkers/sort/years_of_exp:desc' }
                                        ]}
                                    />
                                </div>
                                <div className='d-flex m-2'>
                                    <Button className='w-100 p-0 px-1 me-1' onClick={getPosition}>{loading ? 'Loading ...' : 'Near me'}</Button>
                                    <Input
                                        className='w-50 me-1'
                                        placeholder='Radius'
                                        value={radius}
                                        onChange={e => setRadius(e.target.value)}
                                    />
                                    <Input
                                        className='w-50'
                                        type='select'
                                        placeholder='Metric'
                                        value={metric}
                                        onChange={e => setMetric(e.target.value)}
                                    >
                                        <option>
                                            mi
                                        </option>
                                        <option>
                                            km
                                        </option>
                                    </Input>
                                </div>
                                <h5 className='ms-2'>Skill</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="skill"
                                    limit={10}
                                />
                                <hr />
                                <h5 className='ms-2'>Highest Education</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="highest_edu"
                                    limit={10}
                                />
                                <hr />
                                <h5 className='ms-2'>Certs/Licenses</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="certs_licenses"
                                    limit={10}
                                />
                                <hr />
                                <h5 className='ms-2'>Availability</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="availability"
                                    limit={10}
                                />
                                <hr />
                                <h5 className='ms-2'>Zip Code</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="zip_code"
                                    limit={10}
                                />
                            </div>
                        </div>
                    </InstantSearch>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchResults