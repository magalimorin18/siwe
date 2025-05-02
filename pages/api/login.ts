import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "@/lib/session";
import { createPublicClient, http } from "viem";
import { lukso } from "viem/chains";

const loginHandler: NextApiHandler =
  // we wrap the handler with the withIronSessionApiRoute, which will augment the request object with a session object
  withIronSessionApiRoute(async (request, result) => {
    const { message, signature } = request.body;

    try {
      const publicClient = createPublicClient({
        chain: lukso,
        transport: http(),
      });

      console.log("👌publicClient", publicClient);
      const isValidSignature = await publicClient.verifySiweMessage({
        message,
        signature,
      });
      result.status(200).json({ isValidSignature });

      //   if (!isValidSignature) {
      //     throw new Error("Invalid signature");
      //   }

      //   const signerAddress = await recoverMessageAddress({ message, signature });

      //   request.session.user = {
      //     address: signerAddress,
      //     signature,
      //   };
      //   // encrypt to HTTP only cookie
      //   await request.session.save();

      //   return result.status(200).send(true);
    } catch (error: any) {
      console.log("❌ Error", error);
      result.status(500).json({ error: error.message });
    }
  }, sessionConfig);

export default loginHandler;
