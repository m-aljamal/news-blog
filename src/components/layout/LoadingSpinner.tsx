export default function LoadingSpinner() {
  return (
    <div className="w-full h-full grid">
      <div className=" flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue"></div>
      </div>
    </div>
  );
}
