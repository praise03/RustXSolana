import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor"
import { Err } from "../target/types/err";
import { assert } from "chai";

describe("err", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Err as Program<Err>;

  let myKeypair = anchor.web3.Keypair.generate();

  it ("Initialize mapping storage", async () => {

    const key = new anchor.BN(42);
    const seeds = [key.toArrayLike(Buffer, "le", 8)];

    let value = anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId
    )[0];

    const tx = await program.methods.initialize(key)
      .accounts({
        val: value,
      })
      .rpc();

    console.log("Transaction hash:", tx);
  });

});

