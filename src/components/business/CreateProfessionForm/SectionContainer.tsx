export default function SectionContainer({ children, title }) {
  return (
    <>
      <div className="flex">
        <h2 className="title ml-12">{title}</h2>
        <div className="flex-grow ">{children}</div>
      </div>
      <hr className="my-10" />
    </>
  );
}
