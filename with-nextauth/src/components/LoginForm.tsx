import { Button, Input } from "./ui";

const Loginform = ({ onSubmit, setState, authState, error }: any) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-5">
        <Input
          label="Email"
          type="email"
          onChange={(e) => setState({ ...authState, email: e.target.value })}
        />
      </div>

      <div className="mt-5">
        <Input
          type="password"
          label="Password"
          onChange={(e) => setState({ ...authState, password: e.target.value })}
        />
      </div>
      <div className="mt-5">
        <Button variant="primary" type="submit" size="lg" className="w-full">
          Login
        </Button>
      </div>
      {!!error && <p className="text-red-600 mt-5">ERROR: {error}</p>}
    </form>
  );
};

export default Loginform;
