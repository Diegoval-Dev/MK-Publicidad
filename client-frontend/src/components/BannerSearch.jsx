
function BannerSearch() {
    return (
        <div>
      <form>
        <input type="text" placeholder="Buscar..." className="pl-4 border border-black-500 pe-20 py-2 rounded-lg focus:outline-none focus:border-green-500 mx-1" />
        <input type="submit" value="Buscar" className="border border-gray-300 px-4 py-2 rounded-lg ml-2 bg-800 text-white hover:bg-green-600 cursor-pointer" />
      </form>
    </div>
    );
}

export default BannerSearch;