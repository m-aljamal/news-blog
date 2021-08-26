const InputWithIcon = ({ children, icon }) => {
  return (
    <label htmlFor="faceBook" className="relative">
      <i
        className={` ${icon}  fa-lg absolute top-1/2 transform -translate-y-1/2 right-3`}
      ></i>
      {children}
    </label>
  );
};
