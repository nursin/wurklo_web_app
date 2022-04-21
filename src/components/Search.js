import { Input } from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function Search() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/search-results/${search ? search : "*"}`)
    }

    return (
        <div className="px-3">
            <div className={location.pathname === "/" ? "search__inputContainerHome" : 'search__inputContainer'}>
                <form>
                    <Input
                        className='search__input shadow-none ps-5'
                        placeholder="Search wurkers ... ex. full stack developer, react"
                        value={search.slice(0,50)}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <SearchIcon className='search__searchIcon text-secondary' />
                    <button
                        type='submit'
                        onClick={handleSearch}
                        className='search__button p-1 pe-2'
                    >
                        <ArrowForwardRoundedIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Search;