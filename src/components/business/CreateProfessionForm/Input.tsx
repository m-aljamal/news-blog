export default function Input(props) {
  return (
    <div className={` ${props.style}`}>
      <p className="text-gray-600">{props.text}</p>
      {props.type === "textaria" ? (
        <textarea
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
          {...props.reg}
          placeholder={props.holder}
          className={`p-2 w-full text-gray-600 text-sm border ${
            props.errors
              ? "outline focus:ring-red-500 border border-red-500"
              : "outline"
          }  mt-1 bg-gray-100 ${props.textAriaStyle}`}
        />
      ) : (
        <input
          id={props.id}
          {...props.reg}
          type={props.type}
          placeholder={props.holder}
          className={`p-2 w-full text-gray-500 text-sm border ${
            props.errors
              ? "outline focus:ring-red-500 border border-red-500"
              : "outline"
          }  mt-1 bg-gray-100 ${props.inputStyle}`}
        />
      )}
      {props.errors && (
        <p className="text-red-500 text-xs mt-2">{props.errors}</p>
      )}
    </div>
  );
}
