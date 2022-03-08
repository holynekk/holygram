import React, { useState } from 'react';
import ProfileElement from './ProfileElement';

function Search() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState("");

    function handleSearchText(e) {
        setSearchText(e.target.value);
    }

    function searchUsers() {
        fetch('/api/search-user?userName=' + searchText)
            .then((res)=>res.json())
            .then((data)=>setSearchResults(data))
            .catch((err)=>console.log(err));
    }

    return (
        <div className='search-wrapper'>
            <div className='search-bar'>
                <input
                    type="text"
                    onChange={handleSearchText}
                    placeholder="Search"
                />
                <button onClick={searchUsers}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            <div className='search-results'>
                {
                    searchResults.length > 0 ?
                    (
                        <div className='search-results-wrapper'>
                            {
                                searchResults.map((item, itemIndex)=>{
                                    return <ProfileElement {...item} key={itemIndex} />
                                })
                            }
                        </div>
                    ) :
                    <p>There are no users like {"u/" + searchText}</p>
                }
            </div>
            
        </div>
    );
}

export default Search;
