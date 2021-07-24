const List = ({ data }) => {
  console.log("list is here", data);

  return (
    <ul className="ml-10 list-disc">
      {data?.items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
};

export default List;
