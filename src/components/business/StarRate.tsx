import Rate from "rc-rate";
import "rc-rate/assets/index.css";
export default function StarRate({ value, type, ...props }) {
  let rate;

  if (type === "preview") {
    rate = <Rate value={value} disabled={true} />;
  } else {
    rate = <Rate value={value} onChange={(value) => props.setStar(value)} />;
  }
  return rate;
}
