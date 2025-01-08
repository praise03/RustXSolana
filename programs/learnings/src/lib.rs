use anchor_lang::prelude::*;

declare_id!("GNKwvk7KSWMxUS8w4s6S3qSL6gpU4jTVwYhnuzSQpizz");

const OWNER: &str = "QTinRwNM7QNob5wnUMaxFsqxmLxKTdwhwVWKidoFmYv";


#[program]
pub mod err {
    use super::*;

    #[access_control(check(&ctx))]
    pub fn initialize(ctx: Context<OnlyOwner>) -> Result<()> {
        

        msg!("Holla, I'm the owner.");
        Ok(())
    }
}

fn check(ctx: &Context<OnlyOwner>) -> Result<()> {
    // Check if signer === owner
    require_keys_eq!(
        ctx.accounts.signer_account.key(),
        OWNER.parse::<Pubkey>().unwrap(),
        OnlyOwnerError::NotOwner
    );

    Ok(())
}

#[derive(Accounts)]
pub struct OnlyOwner<'info> {
    signer_account: Signer<'info>,
}

#[error_code]
pub enum OnlyOwnerError {
    #[msg("Only owner can call this function!")]
    NotOwner,
}