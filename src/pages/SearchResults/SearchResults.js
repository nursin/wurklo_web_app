import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
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
                            </div>
                        </div>
                    </InstantSearch>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchResults