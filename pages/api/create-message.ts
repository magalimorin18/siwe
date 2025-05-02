import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "@/lib/session";

import { createSiweMessage } from "viem/siwe";

const loginHandler: NextApiHandler =
  // we wrap the handler with the withIronSessionApiRoute, which will augment the request object with a session object
  withIronSessionApiRoute(async (request, result) => {
    const { address, domain, uri, chainId } = request.body;

    try {
      const siweMessage = createSiweMessage({
        domain,
        address,
        uri,
        version: "1",
        chainId,
        nonce: request.session.nonce,
        issuedAt: new Date(),
        //Other properties that could be set to verify the validity of the signature
        // expirationTime: new Date(),
        // notBefore: new Date(),
      });

      request.session.user = {
        address,
      };

      // encrypt to HTTP only cookie
      await request.session.save();

      result.status(200).json({ siweMessage });
    } catch (error: any) {
      console.log("❌ Error", error);
      result.status(500).json({ error: error.message });
    }
  }, sessionConfig);

export default loginHandler;
