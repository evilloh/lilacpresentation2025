import MenuOutlinedIcon from "../../../shared/icons/menu-icon";
import SearchIcon from "../../../shared/icons/search-icon";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <MenuOutlinedIcon />
      <SearchIcon />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        disabled
      />
    </div>
  );
};

export default SearchBar;
