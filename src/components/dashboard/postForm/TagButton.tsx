const TagButton = ({ name, choose, setchoose }) => {
  return (
    <button
      type="button"
      className={`bg-gray-200 rounded-md p-2 cursor-pointer ${
        choose !== name ? "opacity-30" : "opacity-100"
      }`}
      onClick={() => {
        if (choose === name) {
          setchoose("");
        }
        if (!choose || (choose && choose !== name)) {
          setchoose(name);
        }
      }}
    >
      # {name}
    </button>
  );
};

export default TagButton;
