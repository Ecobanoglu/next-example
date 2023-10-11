
type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function Card({ user, pagetype }: Props) {
  //console.log(user)

  const greeting = user?.name ? (
    <div className="flex flex-col items-center mb-6">
      <div className="bg-white p-6 text-center inline-block rounded-lg font-bold text-5xl text-black">
        Hello <span className="text-primary">{user?.name}!</span>
      </div>
    </div>
  ) : null;
  
  return <section className="flex flex-col gap-4">{greeting}</section>;
}
