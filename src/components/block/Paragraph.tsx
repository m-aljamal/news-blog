const Paragraph = ({ data }) => {
  function detectURLs(string) {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return string.match(urlRegex)[0];
  }

  if (data.text.includes("<a href=")) {
    const text = data.text.replace(/&nbsp;/g, "");
    const start = text.search("<a");
    const end = text.search("</a>") + 1;
    const firstPart = text.slice(0, start);
    const link = text.slice(start, end);
    const lastPart = text.slice(end + 3, -1);
    const linkTo = detectURLs(data.text);
    const linkTextStart = link.indexOf(">") + 1;
    const linkText = link.slice(linkTextStart, -1);

    return (
      <div>
        <span className=" my-4">{firstPart}</span>
        <a href={linkTo} target="_blank" className="mx-1 text-blue-800">
          {linkText}
        </a>
        <span>{lastPart}</span>
      </div>
    );
  } else {
    return <p className="text-red-800 my-4">{data.text}</p>;
  }
};

export default Paragraph;
