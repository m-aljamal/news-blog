import { useForm } from "react-hook-form";

interface IFormUserData {
  name: string;
  email: string;
  password: string;
}
export default function CreateUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormUserData>({});

  const handleCreateUser = async (data) => {
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Create new User</h2>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="mt-5">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="border-2 border-black"
          />
        </div>
        <button type="submit">Add user</button>
      </form>
    </div>
  );
}
