import { sessionConfig } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";

import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    push("/");
  };

  return (
    <div>
      <p>✅WELCOME</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    // If the user is not logged in, redirect to the siwe login page
    if (!user?.address) {
      return {
        redirect: {
          permanent: false,
          destination: "/siwe",
        },
      };
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  sessionConfig
);
