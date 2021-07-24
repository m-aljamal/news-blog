export default function LinkBox({ data }) {
  return (
    <a href={data.link} className="" target="_blank">
      <div className="border-black border-2 p-5 flex">
        <div className="w-1/2">
          <img src={data.meta.image.url} className="w-full" />
        </div>
        <div>
          <p>{data.meta.title}</p>
          <p>{data.meta.description}</p>
        </div>
      </div>
    </a>
  );
}
