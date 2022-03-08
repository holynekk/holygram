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
                <button onClick={searchUsers}>Search</button>
            </div>
            <div className='search-results'>
                {
                    searchResults.length > 0 ?
                    (
                        <div className='search-results-wrapper'>
                            {
                                searchResults.map((item, itemIndex)=>{
                                    console.log(searchResults);
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
