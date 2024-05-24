import PropTypes from 'prop-types';

function BannerSearch({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.search.value.trim();
    onSearch(keyword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Buscar..." className="pl-4 border border-black-500 pe-20 py-2 rounded-lg focus:outline-none focus:border-green-500 mx-1" />
        <input type="submit" value="Buscar" className="border border-gray-300 px-4 py-2 rounded-lg ml-2 bg-800 text-white hover:bg-green-600 cursor-pointer bg-lime-500" />
      </form>
    </div>
  );
}

BannerSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default BannerSearch;
