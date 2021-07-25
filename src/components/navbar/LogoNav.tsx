export default function LogoNav() {
  return (
    <div className="flex container justify-between items-center py-3 ">
      <div className="">
        <i className="far fa-newspaper fa-2x"></i>
      </div>
      <div>
        <div className="bg-gray-200 rounded-md ">
          <input
            type="search"
            placeholder="ابحث"
            className="outline-none bg-gray-200 px-2 py-1 rounded-md"
          />
          <i className="fas fa-search px-2 text-blue-400"></i>
        </div>
      </div>
    </div>
  );
}
