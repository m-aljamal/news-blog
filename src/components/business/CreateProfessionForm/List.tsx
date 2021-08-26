export default function List({ title, fullAddress, onClick, coordinates }) {
  return (
    <li
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
      onClick={() => onClick({ fullAddress, coordinates })}
    >
      <h2 className="text-gray-800 font-bold text-sm">{title}</h2>
      <p className="text-gray-400 text-sm">{fullAddress}</p>
    </li>
  );
}
