export default function Iframe({ data }) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={data.embed}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}
