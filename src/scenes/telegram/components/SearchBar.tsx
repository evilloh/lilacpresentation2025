import MenuOutlinedIcon from "../../../shared/icons/menu-icon";
import SearchIcon from "../../../shared/icons/search-icon";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <MenuOutlinedIcon />
      <div className="search-box">
        <SearchIcon />
        <p>Search</p>
      </div>
    </div>
  );
};

export default SearchBar;
