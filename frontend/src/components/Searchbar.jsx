const Searchbar = ({searchQuery,setsearchQuery}) => {

    return (
        <div>
            <input type="text" placeholder="Search links..." value={searchQuery} onChange={(e)=> setsearchQuery(e.target.value)} className="px-3 py-2 rounded-lg transition-all bg-surface border-bd border outline-0 focus:border-accent2 font-light font-sm" />
        </div>
    )
}

export default Searchbar
