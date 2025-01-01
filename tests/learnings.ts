import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Learnings } from "../target/types/learnings";

describe("learnings", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Learnings as Program<Learnings>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize(
      new anchor.BN(777), new anchor.BN(888), "hello"
    ).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Array test", async () => {
    const tx = await program.methods.array([new anchor.BN(777), new anchor.BN(888)]).rpc();
    console.log("Signature: ", tx)
  })
});
