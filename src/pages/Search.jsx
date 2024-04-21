import React, { useState } from 'react';
import '../App.css';
function Search({onSearchRepo}) {
    const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchRepo(query);
  };
  return(
    <form className="input-box" onSubmit={handleSubmit}>
            <input type="search" name="search" id=""  value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search repositories."/>
            <button type='submit'><img src="/search-icon-png-5.png" alt="" width={'50px'} /></button>
        </form>
  )
}
export default Search