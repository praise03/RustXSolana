import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor"
import { Err } from "../target/types/err";
import { assert } from "chai";

describe("err", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Err as Program<Err>;

  let myKeypair = anchor.web3.Keypair.generate();

  it("Is called by the owner", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        signerAccount: program.provider.publicKey,
      })
      .rpc();

    console.log("Transaction hash:", tx);
  });

  it("Is NOT called by the owner", async () => {
    
    const tx = await program.methods
      .initialize()
      .accounts({
        signerAccount: myKeypair.publicKey,
      })
      .signers([myKeypair])
      .rpc();

    console.log("Transaction hash:", tx);
  });

});

