import { createPublicClient, http } from "viem";
import { luksoTestnet } from "viem/chains";

export default async function handler(request, res) {
  const { siweMessage, signature } = request.body;

  const publicClient = createPublicClient({
    chain: luksoTestnet,
    transport: http(),
  });

  try {
    const isValidSignature = await publicClient.verifySiweMessage({
      message: siweMessage,
      signature,
    });
    res.status(200).json({ isValidSignature });
  } catch (error) {
    console.log("❌ Error", error);
    res.status(500).json({ error });
  }
}
