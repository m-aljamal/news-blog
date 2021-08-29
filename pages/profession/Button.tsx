const Button = ({ icon, text, ...props }) => {
  return (
    <button
      className="border-2 px-4 py-1 text-gray-500 border-gray-500 rounded-md"
      onClick={props.handleClick}
    >
      <span className="text-base">{text}</span>
      <i className={icon}></i>
    </button>
  );
};

export default Button;
