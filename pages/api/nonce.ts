import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "@/lib/session";
import { generateSiweNonce } from "viem/siwe";

const nonceHandler: NextApiHandler = withIronSessionApiRoute(
  async (request, result) => {
    request.session.nonce = generateSiweNonce();
    await request.session.save();

    result.status(200).json({ nonce: request.session.nonce });
  },
  sessionConfig
);

export default nonceHandler;
