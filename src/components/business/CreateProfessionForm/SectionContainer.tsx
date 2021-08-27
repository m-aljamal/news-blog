export default function SectionContainer({ children, title }) {
  return (
    <>
      <div className="sm:flex">
        <h2 className="title md:ml-12 ml-4 mb-4 sm:mb-0">{title}</h2>
        <div className="flex-grow ">{children}</div>
      </div>
      <hr className="my-10" />
    </>
  );
}
