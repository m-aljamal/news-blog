import { ExclamationCircleIcon } from "@heroicons/react/solid";

export default function ErrorMessageForm({ text }) {
  return text ? (
    <p className="text-red-500 mr-5  text-sm  ">
      <ExclamationCircleIcon className="w-5 h-5 inline-block ml-2 text-red-400" />
      {text}
    </p>
  ) : (
    <p></p>
  );
}
