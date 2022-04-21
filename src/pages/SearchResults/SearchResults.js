import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Search from '../../components/Search'
import WurkerCard from '../../components/WurkerCard'
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import FilterSearchResults from '../../components/FilterSearchResults';
import Typesense from 'typesense';
import { InstantSearch, SearchBox, Hits, Stats } from "react-instantsearch-dom"
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { useLocation, useNavigate } from "react-router-dom";
import { RefinementList } from 'react-instantsearch-dom';
import { SortBy } from 'react-instantsearch-dom';
import { Configure } from 'react-instantsearch-dom';
import { Pagination } from 'react-instantsearch-dom';
import { RangeSlider } from 'react-instantsearch-dom';
import { RangeInput } from 'react-instantsearch-dom';
import FilterListIcon from '@mui/icons-material/FilterList';

function openNav() {
    document.getElementById("searchSidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("searchSidebar").style.width = "0";
}

function SearchResults() {
    const [wurkers, setWurkers] = useState([]);
    const [pages, setPages] = useState(0);
    const [numFound, setNumFound] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    // the below need to be moved after setting searchParams/filters in redux
    const { searchParams } = useParams();

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
            photoURL={hit.photoURL}
        />
    )

    useEffect(() => {
        console.log(searchParams)
    }, [searchParams])

    return (
        <Container fluid>
            <Row>
                <Col className='text-center'>
                    {Array(pages + 1).fill(pages, 1).map((_, i) => {
                        if ((i > 9) && (i < pages - 1)) {
                            return
                        }
                        return <Button key={i} outline className='wurklo__textColor mt-0 p-1 m-1 shadow-none' onClick={() => setCurrPage(i)}>{i}</Button>
                    })}
                </Col>
            </Row>
            <Row className=''>
                <Col md={12}>
                    <InstantSearch searchClient={searchClient} indexName="wurkers">
                        <Configure
                            hitsPerPage={20}
                        />
                        <div className='d-flex searchResults__sortBox'>
                            <FilterListIcon
                                className='filterSearchResults__searchFilterIcon'
                                onClick={openNav}
                            />
                            <SearchBox
                                translations={{ placeholder: 'Search wurkers ... ex. full stack developer, react', submitTitle: `${searchParams}` }}
                                className='search-box'
                                searchAsYouType={searchParams ? true : false}
                                onSubmit={event => {
                                    event.preventDefault();
                                    setSearch(event.target[0].value);
                                    navigate(`/search-results/${event.target[0].value ? event.target[0].value : "*"}`)
                                }}
                            />
                        </div>
                        <div className='searchResults__container'>
                            <Pagination />
                            <Stats />
                            <Hits hitComponent={Hit} />
                        </div>
                        <div id="searchSidebar" className="sidebarFilter shadow">
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
                                <h5>Highest Education</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="highest_edu"
                                    limit={10}
                                />
                                <hr />
                                <h5>Certs/Licenses</h5>
                                <RefinementList
                                    className="ms-2"
                                    attribute="certs_licenses"
                                    limit={10}
                                />
                                <hr />
                                <h5>Availability</h5>
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