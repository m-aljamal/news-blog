const ShowDate = ({ date }) => {
  if (!date) {
    return <div></div>;
  }
  return (
    <p className="text-gray-500">
      {new Date(date).toLocaleDateString("en-GB")}
    </p>
  );
};
export default ShowDate;
