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
        <p className="postBody text-lg py-4 inline  leading-loose">
          {firstPart}
        </p>
        <a
          href={linkTo}
          target="_blank"
          className="mx-1 text-blue inline-block underline"
        >
          {linkText}
        </a>
        <p className="postBody text-lg py-4 inline leading-loose">{lastPart}</p>
      </div>
    );
  } else {
    return <p className="postBody text-lg py-4 leading-loose">{data.text}</p>;
  }
};

export default Paragraph;
