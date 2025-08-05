import { Chapter } from "../types/lessons";

export const chapters: Chapter[] = [
    {
        id: 'rust-basics',
        title: 'Rocket Fuel with Rust',
        description: 'Learn the fundamentals of Rust programming - your spaceship engine for the Solana galaxy!',
        icon: '🚀',
        color: 'bg-gradient-galaxy',
        completed: false,
        lessons: [
        {
            id: 'rust-variables',
            title: 'Data Capsules (Variables)',
            description: 'Learn to store your cosmic data in Rust variables like space capsules',
            chapter: 1,
            order: 1,
            difficulty: 'beginner',
            estimatedTime: 15,
            storyText: `Welcome to the Anchor Academy, Space Cadet! 🚀

    You've just joined Commander Rust's elite crew aboard the starship Solana. Your first mission is to master data storage systems. In the vast cosmos of programming, we use variables like secure data capsules to store our precious information.

    Let's begin by learning how to create and manage data capsules in Rust!`,
            objectives: [
            'Declare mutable and immutable variables',
            'Understand the difference between let and let mut',
            'Store different types of cosmic data (data types)'
            ],
            code: {
            initial: `// Welcome to your first Rust mission!
    // Let's learn about variables by storing cosmic data

    fn main() {
        // TODO: Create an immutable variable called 'element_name' 
        // and assign it the value "Hydrogen Crystal"
        
        // TODO: Create a mutable variable called 'energy_units'
        // and assign it the value 10
        
        // TODO: Increase the energy_units by 5
        
        println!("We discovered {} containing {} energy units", energy_units, element_name);
    }`,
            solution: `fn main() {
        // Immutable variable - once set, it cannot be changed
        let element_name = "Hydrogen Crystal";
        
        // Mutable variable - can be changed
        let mut energy_units = 10;
        
        // Increase the energy count
        energy_units += 5;
        
        println!("We discovered {} containing {} energy units", energy_units, element_name);
    }`,
            tests: [
                'Code should compile without errors',
                'Should use let for immutable variable',
                'Should use let mut for mutable variable',
                'Should modify the mutable variable'
            ]
            },
            hints: [
            'Use `let` for immutable variables',
            'Use `let mut` for variables you want to change',
            'Use += to add to a variable'
            ],
            completed: false,
            locked: false
        },
        {
            id: 'rust-functions',
            title: 'Command Protocols (Functions)',
            description: 'Organize your space crew with reusable function protocols',
            chapter: 1,
            order: 2,
            difficulty: 'beginner',
            estimatedTime: 20,
            storyText: `Outstanding work, Cadet! Now that you've mastered data storage, it's time to learn command protocols for your crew.

    Functions in Rust are like standardized mission protocols. You can execute them whenever you need that specific operation performed!`,
            objectives: [
            'Create functions with parameters',
            'Return values from functions',
            'Understand function syntax in Rust'
            ],
            code: {
            initial: `// Time to learn about functions!
    // Functions help us organize code and avoid repetition

    // TODO: Create a function called 'calculate_treasure_value'
    // that takes two parameters: count (i32) and value_per_item (i32)
    // and returns the total value (i32)

    // TODO: Create a function called 'greet_pirate'
    // that takes a name (String) and prints a pirate greeting

    fn main() {
        let gold_coins = 25;
        let value_per_coin = 10;
        
        // TODO: Call your calculate_treasure_value function
        let total_value = // your function call here
        
        println!("Your treasure is worth {} doubloons!", total_value);
        
        // TODO: Call your greet_pirate function with "Blackbeard"
    }`,
            solution: `fn calculate_treasure_value(count: i32, value_per_item: i32) -> i32 {
        count * value_per_item
    }

    fn greet_pirate(name: String) {
        println!("Ahoy, {}! Welcome aboard the ship!", name);
    }

    fn main() {
        let gold_coins = 25;
        let value_per_coin = 10;
        
        let total_value = calculate_treasure_value(gold_coins, value_per_coin);
        
        println!("Your treasure is worth {} doubloons!", total_value);
        
        greet_pirate("Blackbeard".to_string());
    }`,
            tests: [
                'calculate_treasure_value function should exist',
                'greet_pirate function should exist',
                'Functions should be called correctly',
                'Code should compile and run'
            ]
            },
            hints: [
                'Function syntax: fn function_name(param: type) -> return_type {}',
                'Use -> to specify return type',
                'Use .to_string() to convert &str to String'
            ],
            completed: false,
            locked: true
        }
        ]
    },
    {
        id: 'solana-accounts',
        title: 'Stellar Navigation (Solana Accounts)',
        description: 'Master the Solana account model - understand the space stations of the blockchain!',
        icon: '🛸',
        color: 'bg-gradient-nebula',
        completed: false,
        lessons: [
        {
            id: 'account-model',
            title: 'Mapping the Islands (Account Model)',
            description: 'Understand how Solana accounts work like islands in the blockchain ocean',
            chapter: 2,
            order: 1,
            difficulty: 'intermediate',
            estimatedTime: 25,
            storyText: `Now that you've mastered basic Rust, it's time to explore the mysterious Solana archipelago! 

    In Solana, everything is an account - like islands scattered across the blockchain ocean. Each island (account) has its own unique address and can store treasure (data) and lamports (SOL tokens).`,
            objectives: [
                'Understand the Solana account model',
                'Learn about account ownership',
                'Explore different account types'
            ],
            code: {
            initial: `// Let's explore Solana accounts!
        use anchor_lang::prelude::*;

        // TODO: Define an account structure for a Pirate Ship
        // It should have: name (String), crew_size (u8), gold (u64)

        #[account]
        pub struct PirateShip {
            // Your structure here
        }

        // TODO: Define the program ID
        declare_id!("11111111111111111111111111111111");

        #[program]
        pub mod pirate_program {
            use super::*;
            
            // TODO: Create an initialize function that creates a new pirate ship
            pub fn initialize(ctx: Context<Initialize>, name: String, crew_size: u8) -> Result<()> {
                // Your implementation here
                Ok(())
            }
        }

        #[derive(Accounts)]
        pub struct Initialize<'info> {
            // TODO: Define the accounts needed for initialization
        }`,
                solution: `use anchor_lang::prelude::*;

        #[account]
        pub struct PirateShip {
            pub name: String,
            pub crew_size: u8,
            pub gold: u64,
        }

        declare_id!("11111111111111111111111111111111");

        #[program]
        pub mod pirate_program {
            use super::*;
            
            pub fn initialize(ctx: Context<Initialize>, name: String, crew_size: u8) -> Result<()> {
                let pirate_ship = &mut ctx.accounts.pirate_ship;
                pirate_ship.name = name;
                pirate_ship.crew_size = crew_size;
                pirate_ship.gold = 0;
                Ok(())
            }
        }

        #[derive(Accounts)]
        pub struct Initialize<'info> {
            #[account(init, payer = user, space = 8 + 32 + 1 + 8)]
            pub pirate_ship: Account<'info, PirateShip>,
            #[account(mut)]
            pub user: Signer<'info>,
            pub system_program: Program<'info, System>,
        }`,
            tests: [
                'PirateShip struct should be defined with correct fields',
                'Initialize function should exist',
                'Accounts struct should be properly defined',
                'Code should compile'
            ]
            },
            hints: [
                'Use #[account] to mark account structures',
                'Don\'t forget the space calculation: 8 (discriminator) + field sizes',
                'Use Account<\'info, T> for custom account types'
            ],
            completed: false,
            locked: true
        }
        ]
    },
    {
        id: 'writing-anchor-programs',
        title: 'Warp Core Programs (Writing Anchor Programs)',
        description: 'Learn to write instructions and define on-chain logic in Anchor programs.',
        icon: '🛠️',
        color: 'bg-gradient-fire',
        completed: false,
        lessons: [
            {
                id: 'anchor-init-instruction',
                title: 'Engage Engines (Initialize Instruction)',
                description: 'Learn how to define and execute an initialize instruction in Anchor.',
                chapter: 3,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 20,
                storyText: `Time to fire up the warp core! In Anchor, instructions are like commands for your ship. Let's define one to initialize a new on-chain entity, such as a ShipState.`,
                objectives: [
                  'Define a simple instruction with a Context struct',
                  'Understand initialize logic inside the program module',
                  'Test state initialization in Anchor'
                ],
                code: {
                  initial: `use anchor_lang::prelude::*;
        
        #[program]
        pub mod warp_core {
            use super::*;
        
            // TODO: Define an initialize function that sets a ship_name and warp_fuel
            pub fn initialize(ctx: Context<Initialize>, ship_name: String, fuel: u64) -> Result<()> {
                // Implementation goes here
                Ok(())
            }
        }
        
        #[derive(Accounts)]
        pub struct Initialize<'info> {
            #[account(init, payer = user, space = 8 + 32 + 8)]
            pub ship: Account<'info, ShipState>,
            #[account(mut)]
            pub user: Signer<'info>,
            pub system_program: Program<'info, System>,
        }
        
        #[account]
        pub struct ShipState {
            pub ship_name: String,
            pub warp_fuel: u64,
        }`,
                  solution: `use anchor_lang::prelude::*;
        
        #[program]
        pub mod warp_core {
            use super::*;
        
            pub fn initialize(ctx: Context<Initialize>, ship_name: String, fuel: u64) -> Result<()> {
                let ship = &mut ctx.accounts.ship;
                ship.ship_name = ship_name;
                ship.warp_fuel = fuel;
                Ok(())
            }
        }
        
        #[derive(Accounts)]
        pub struct Initialize<'info> {
            #[account(init, payer = user, space = 8 + 32 + 8)]
            pub ship: Account<'info, ShipState>,
            #[account(mut)]
            pub user: Signer<'info>,
            pub system_program: Program<'info, System>,
        }
        
        #[account]
        pub struct ShipState {
            pub ship_name: String,
            pub warp_fuel: u64,
        }`,
                  tests: [
                    'ShipState struct should store ship_name and warp_fuel',
                    'Initialize function should set values',
                    'Accounts context should be correct',
                    'Code should compile and deploy'
                  ]
                },
                hints: [
                  'Use #[account(init, ...)] for new account creation',
                  'Make sure to specify enough space for your account fields',
                  'Use Result<()> as the return type for Anchor instructions'
                ],
                completed: false,
                locked: false
              }
        ]
    },
    {
        id: 'testing-anchor-cli',
        title: 'Test Simulators (Testing with Anchor CLI)',
        description: 'Simulate and verify your smart contracts using Anchor tests.',
        icon: '🧪',
        color: 'bg-gradient-lab',
        completed: false,
        lessons: [
            {
                id: 'writing-anchor-tests',
                title: 'Running Simulations (Anchor Tests)',
                description: 'Write and run your first Anchor test in TypeScript.',
                chapter: 4,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 20,
                storyText: `You've activated your warp core—now let’s test it in simulation mode!
        
        In Anchor, tests are written using TypeScript to simulate transactions and assert outcomes.`,
                objectives: [
                  'Write an Anchor test that initializes a program account',
                  'Use the Anchor workspace to call instructions',
                  'Assert expected outcomes with chai'
                ],
                code: {
                  initial: `import * as anchor from '@coral-xyz/anchor';
        import { Program } from '@coral-xyz/anchor';
        import { WarpCore } from '../target/types/warp_core';
        
        // TODO: Write a test that calls initialize and checks values
        
        describe('warp-core', () => {
          // Boilerplate setup
          const provider = anchor.AnchorProvider.env();
          anchor.setProvider(provider);
        
          const program = anchor.workspace.WarpCore as Program<WarpCore>;
        
          it('initializes a ship state', async () => {
            // Your test logic here
          });
        });`,
                  solution: `import * as anchor from '@coral-xyz/anchor';
        import { Program } from '@coral-xyz/anchor';
        import { WarpCore } from '../target/types/warp_core';
        import { assert } from 'chai';
        
        describe('warp-core', () => {
          const provider = anchor.AnchorProvider.env();
          anchor.setProvider(provider);
          const program = anchor.workspace.WarpCore as Program<WarpCore>;
        
          it('initializes a ship state', async () => {
            const [shipPDA] = await anchor.web3.PublicKey.findProgramAddress(
              [Buffer.from('ship'), provider.wallet.publicKey.toBuffer()],
              program.programId
            );
        
            await program.methods.initialize('Voyager', new anchor.BN(9000))
              .accounts({
                ship: shipPDA,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
              })
              .rpc();
        
            const shipAccount = await program.account.shipState.fetch(shipPDA);
            assert.equal(shipAccount.shipName, 'Voyager');
            assert.equal(shipAccount.warpFuel.toNumber(), 9000);
          });
        });`,
                  tests: [
                    'Test should call initialize successfully',
                    'Should fetch ship account and match values',
                    'Code should compile and test should pass'
                  ]
                },
                hints: [
                  'Use workspace.programName to access the program',
                  'You can use PublicKey.findProgramAddress for PDAs',
                  'Use .rpc() to send the instruction'
                ],
                completed: false,
                locked: false
              }
        ]
    },
    {
        id: 'deploying-devnet',
        title: 'Launch Bay (Deploying to Devnet)',
        description: 'Deploy your programs to the Devnet and interact with the galaxy!',
        icon: '🚀',
        color: 'bg-gradient-launchpad',
        completed: false,
        lessons: [
            {
                id: 'anchor-deploy-devnet',
                title: 'Launch Sequence (Deploy to Devnet)',
                description: 'Deploy your smart contract to Solana Devnet using Anchor CLI.',
                chapter: 5,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 15,
                storyText: `You've trained hard, Cadet. It's time to launch your first on-chain mission!
        
        In this lesson, you'll learn how to deploy your Anchor smart contract to the Solana Devnet — a public test galaxy to simulate real interstellar missions.`,
                objectives: [
                  'Build your program using Anchor CLI',
                  'Deploy to Devnet',
                  'Verify deployment and explore explorer.solana.com'
                ],
                code: {
                  initial: `// In your terminal, run these commands:
        
        // Step 1: Build your program
        anchor build
        
        // Step 2: Deploy to Devnet
        anchor deploy --provider.cluster devnet
        
        // Step 3: View deployed program ID
        cat target/idl/your_program.json`,
                  solution: `// Terminal:
        anchor build
        anchor deploy --provider.cluster devnet
        
        // Use explorer.solana.com to search your Program ID on Devnet` ,
                  tests: [
                    'Program should compile with anchor build',
                    'Program should deploy with anchor deploy',
                    'User should be able to find deployed program ID'
                  ]
                },
                hints: [
                  'Use `anchor build` to compile your code',
                  'Use `anchor deploy --provider.cluster devnet` to deploy to Devnet',
                  'Check your Anchor.toml for cluster settings'
                ],
                completed: false,
                locked: false
              }
        ]
    },
    {
        id: 'pda-and-seeds',
        title: 'Intergalactic PDA Crafting (PDAs & Seeds)',
        description: 'Learn how to derive secure program addresses and use seeds.',
        icon: '🔑',
        color: 'bg-gradient-seeds',
        completed: false,
        lessons: [
            {
                id: 'pda-derive',
                title: 'Star Map Coordinates (PDAs)',
                description: 'Use seeds and bumps to generate Program Derived Addresses.',
                chapter: 6,
                order: 1,
                difficulty: 'advanced',
                estimatedTime: 25,
                storyText: `To explore restricted star systems, we use Program Derived Addresses (PDAs) — secure addresses generated by your programs using seeds. These allow you to control access and deterministically derive account addresses.`,
                objectives: [
                  'Understand PDA concepts in Solana',
                  'Use seeds to derive addresses in Anchor',
                  'Use bumps to verify correctness'
                ],
                code: {
                  initial: `#[derive(Accounts)]
        pub struct Initialize<'info> {
          #[account(
            init,
            payer = user,
            space = 8 + 32 + 8,
            seeds = [b"ship", user.key().as_ref()],
            bump
          )]
          pub ship: Account<'info, ShipState>,
          #[account(mut)]
          pub user: Signer<'info>,
          pub system_program: Program<'info, System>,
        }
        
        #[account]
        pub struct ShipState {
          pub name: String,
          pub fuel: u64,
        }`,
                  solution: `// Use seeds to derive deterministic accounts with bumps
        #[derive(Accounts)]
        pub struct Initialize<'info> {
          #[account(
            init,
            payer = user,
            space = 8 + 32 + 8,
            seeds = [b"ship", user.key().as_ref()],
            bump
          )]
          pub ship: Account<'info, ShipState>,
          #[account(mut)]
          pub user: Signer<'info>,
          pub system_program: Program<'info, System>,
        }`,
                  tests: [
                    'Use seeds and bump in account init',
                    'Account should be created deterministically',
                    'Code should compile'
                  ]
                },
                hints: [
                  'Use seeds=[...] to define the PDA logic',
                  'Add bump to store the bump seed for validation',
                  'Always include a space calculation'
                ],
                completed: false,
                locked: false
              }
        ]
    },
    {
        id: 'token-accounts-spl',
        title: 'Resource Logistics (Token Accounts + Anchor SPL)',
        description: 'Manage token mints, accounts, and transfers with Anchor SPL.',
        icon: '💰',
        color: 'bg-gradient-gold',
        completed: false,
        lessons: [
            {
                id: 'spl-token-basics',
                title: 'Fuel Cells (SPL Tokens)',
                description: 'Mint, send, and receive cosmic fuel (SPL tokens) with Anchor SPL!',
                chapter: 7,
                order: 1,
                difficulty: 'advanced',
                estimatedTime: 30,
                storyText: `Every starship needs fuel! SPL tokens are the energy cells of Solana, letting you mint, transfer, and manage resources across the galaxy.
    
    On Solana, you use the official SPL Token program for all fungible resources. Anchor SPL makes these operations easy with its utilities.`,
                objectives: [
                    'Understand SPL token minting and account creation',
                    'Use Anchor SPL to mint and transfer tokens',
                    'Query token account balances'
                ],
                code: {
                    initial: `use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Token, TokenAccount, MintTo, Transfer, Mint};
    
    #[derive(Accounts)]
    pub struct MintFuel<'info> {
        #[account(mut)]
        pub mint: Account<'info, Mint>,
        #[account(mut)]
        pub to: Account<'info, TokenAccount>,
        pub authority: Signer<'info>,
        pub token_program: Program<'info, Token>,
    }
    
    // TODO: Mint 1,000,000 fuel units (tokens) to 'to' account.
    `,
                    solution: `pub fn mint_fuel(ctx: Context<MintFuel>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.to.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            }
        );
        token::mint_to(cpi_ctx, 1_000_000)?;
        Ok(())
    }
    `,
                    tests: [
                        'MintTo CPI should be called',
                        'User receives 1,000,000 new tokens',
                        'Code compiles and runs'
                    ]
                },
                hints: [
                    'Use MintTo from Anchor SPL for minting',
                    'Set up CpiContext with all required accounts',
                    'The authority must match the mint authority'
                ],
                completed: false,
                locked: false
            }
        ]
    },
    {
        id: 'cross-program-invocation',
        title: 'Time-Space Contracts (CPI)',
        description: 'Call other programs from your own using Cross-Program Invocations.',
        icon: '🌌',
        color: 'bg-gradient-cpi',
        completed: false,
        lessons: [
            {
                id: 'cpi-basics',
                title: 'Stellar Relays (CPI Basics)',
                description: 'Call another program from your own using Cross-Program Invocations.',
                chapter: 8,
                order: 1,
                difficulty: 'advanced',
                estimatedTime: 30,
                storyText: `Sometimes your starship needs to communicate with other outposts. Cross-Program Invocations (CPIs) allow your program to call on another program’s logic across the blockchain galaxy.
    
    Learn how to structure a CPI and pass the correct accounts to interact with other on-chain programs!`,
                objectives: [
                    'Understand the concept of CPIs',
                    'Set up and call an external Anchor program',
                    'Pass accounts and data between programs'
                ],
                code: {
                    initial: `use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Token, TokenAccount, Transfer};
    
    #[derive(Accounts)]
    pub struct RelayTransfer<'info> {
        #[account(mut)]
        pub from: Account<'info, TokenAccount>,
        #[account(mut)]
        pub to: Account<'info, TokenAccount>,
        pub authority: Signer<'info>,
        pub token_program: Program<'info, Token>,
    }
    
    // TODO: Use CPI to transfer fuel from 'from' to 'to'
    `,
                    solution: `pub fn relay_transfer(ctx: Context<RelayTransfer>, amount: u64) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.from.to_account_info(),
                to: ctx.accounts.to.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            }
        );
        token::transfer(cpi_ctx, amount)?;
        Ok(())
    }
    `,
                    tests: [
                        'Transfer CPI should be called',
                        'Tokens move from sender to receiver',
                        'Code compiles and runs'
                    ]
                },
                hints: [
                    'Use Transfer from Anchor SPL for token movement via CPI',
                    'All required TokenAccount and authority accounts must be passed'
                ],
                completed: false,
                locked: false
            }
        ]
    },
    {
        id: 'access-control-security',
        title: 'Galactic Governance (Access Control & Security)',
        description: 'Secure your smart contracts using constraints and access control.',
        icon: '🛡️',
        color: 'bg-gradient-secure',
        completed: false,
        lessons: [
            {
                id: 'anchor-access-control',
                title: 'Crew Access Codes (Access Control)',
                description: 'Learn to secure your program with Anchor constraints.',
                chapter: 9,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 20,
                storyText: `Only authorized crew should control the ship’s core! Anchor constraints enable you to secure instructions so only the right captain has access.
    
    You'll use the 'has_one' and 'signer' constraints to enforce authority on program instructions.`,
                objectives: [
                    'Use Anchor #[account()] constraints for access control',
                    'Implement checks for ownership and relationships',
                    'Understand implications for security on-chain'
                ],
                code: {
                    initial: `#[derive(Accounts)]
    pub struct CaptainAccess<'info> {
        #[account(mut, has_one = captain)]
        pub ship: Account<'info, ShipState>,
        pub captain: Signer<'info>,
    }
    
    #[account]
    pub struct ShipState {
        pub captain: Pubkey,
        pub shield: u16,
    }
    
    // TODO: Write an instruction only the captain can call to boost shields to 1000!
    `,
                    solution: `pub fn boost_shields(ctx: Context<CaptainAccess>) -> Result<()> {
        let ship = &mut ctx.accounts.ship;
        ship.shield = 1000;
        Ok(())
    }
    `,
                    tests: [
                        'Only the captain can call boost_shields',
                        'Shield value is updated as expected',
                        'Access denied for non-captain'
                    ]
                },
                hints: [
                    'has_one = captain verifies relationship',
                    'captain must be a Signer for security'
                ],
                completed: false,
                locked: false
            }
        ]
    },
    {
        id: 'debugging-lab',
        title: 'Bug Hunt (Debugging Challenges)',
        description: 'Fix broken Anchor programs in real-world bug scenarios.',
        icon: '🕷️',
        color: 'bg-gradient-bug',
        completed: false,
        lessons: [
            {
                id: 'debug-runtime-error',
                title: 'Lost in Space (Bug Hunt #1)',
                description: 'Find and fix a bug in a faulty Anchor program.',
                chapter: 10,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 25,
                storyText: `Your ship has hit a gravitational anomaly! The following code looks correct, but if you test it, fuel never increases. Suit up and debug your way out!`,
                objectives: [
                    'Spot and fix logic errors',
                    'Use Anchor error messages and logging',
                    'Properly test your fix'
                ],
                code: {
                    initial: `#[derive(Accounts)]
    pub struct IncreaseFuel<'info> {
        #[account(mut)]
        pub ship: Account<'info, ShipState>,
        pub pilot: Signer<'info>,
    }
    
    #[account]
    pub struct ShipState {
        pub fuel: u64,
    }
    
    pub fn refuel(ctx: Context<IncreaseFuel>, amount: u64) -> Result<()> {
        let ship = &ctx.accounts.ship;
        ship.fuel + amount;
        Ok(())
    }
    // What's wrong? Why doesn't fuel increase?
    `,
                    solution: `pub fn refuel(ctx: Context<IncreaseFuel>, amount: u64) -> Result<()> {
        let ship = &mut ctx.accounts.ship;
        ship.fuel += amount;
        Ok(())
    }
    `,
                    tests: [
                        'Fuel should increase and persist on-chain',
                        'No runtime errors',
                        'Only mutable reference works'
                    ]
                },
                hints: [
                    'Remember that mutability is required for state changes',
                    'Assignment, not just evaluation, is needed to update fields'
                ],
                completed: false,
                locked: false
            }
        ]
    },
    {
        id: 'final-mission',
        title: 'Final Mission (Build-a-DApp)',
        description: 'Your ultimate challenge: build and launch your own Solana app!',
        icon: '🏁',
        color: 'bg-gradient-mission',
        completed: false,
        lessons: [
            {
                id: 'build-final-dapp',
                title: 'Command the Cosmos (Your DApp Mission)',
                description: 'Plan and build your own Anchor-powered DApp!',
                chapter: 11,
                order: 1,
                difficulty: 'advanced',
                estimatedTime: 180,
                storyText: `Congratulations, Captain! Your training is complete. Your final mission: design and build your own DApp to solve a problem for explorers across the Solana galaxy. What will you create?`,
                objectives: [
                    'Design a Solana DApp using Anchor',
                    'Implement relevant Rust programs and TypeScript client',
                    'Deploy, test, and demo your project'
                ],
                code: {
                    initial: `// You’re the mission commander. 
    // Define your DApp's purpose, accounts, and begin coding!
    //
    // Example ideas: token vending machine, NFT mint pass, on-chain voting, etc.
    
    // 1. Plan your account structures and instructions
    // 2. Implement Rust Anchor code for your program
    // 3. Write at least one TypeScript test for a key feature
    `,
                    solution: `// This challenge is open-ended.
    // Present your working Anchor program and a brief description to complete!
    `,
                    tests: [
                        'Demonstrate at least one successful test suite',
                        'Deploy to devnet with a valid Program ID',
                        'Present project concept and code'
                    ]
                },
                hints: [
                    'Start simple: a single account or instruction is enough!',
                    'Use Anchor CLI and workspace for easy testing',
                    'Share progress and ask for feedback from mentors or the community'
                ],
                completed: false,
                locked: false
            }
        ]
    }
];
export const badges = [
    {
        id: 'first-steps',
        name: 'First Launch',
        description: 'Completed your first mission',
        icon: '🚀',
        color: 'bg-gradient-galaxy'
    },
    {
        id: 'rust-apprentice',
        name: 'Rust Cadet',
        description: 'Mastered basic cosmic Rust concepts',
        icon: '⚡',
        color: 'bg-gradient-nebula'
    },
    {
        id: 'account-navigator',
        name: 'Space Navigator',
        description: 'Understood the Solana space station model',
        icon: '🛸',
        color: 'bg-gradient-cosmos'
    },
    {
        id: 'warp-engineer',
        name: 'Warp Engineer',
        description: 'Successfully initialized a Solana on-chain account with Anchor',
        icon: '🛠️',
        color: 'bg-gradient-fire'
    },
    {
        id: 'sim-tester',
        name: 'Sim Lab Technician',
        description: 'Ran and passed simulations using Anchor CLI tests',
        icon: '🧪',
        color: 'bg-gradient-lab'
    },
    {
        id: 'launch-commander',
        name: 'Launch Commander',
        description: 'Deployed a program to Solana Devnet',
        icon: '🚀',
        color: 'bg-gradient-launchpad'
    },
    {
        id: 'pda-explorer',
        name: 'PDA Explorer',
        description: 'Derived and used your first Program Derived Address (PDA)',
        icon: '🔑',
        color: 'bg-gradient-seeds'
    },
    {
        id: 'token-mogul',
        name: 'Token Mogul',
        description: 'Minted, sent, or received SPL tokens via Anchor SPL',
        icon: '💰',
        color: 'bg-gradient-gold'
    },
    {
        id: 'cosmic-mediator',
        name: 'Cosmic Mediator',
        description: 'Successfully performed a Cross-Program Invocation (CPI)',
        icon: '🌌',
        color: 'bg-gradient-cpi'
    },
    {
        id: 'security-captain',
        name: 'Security Captain',
        description: 'Protected a program using access control constraints',
        icon: '🛡️',
        color: 'bg-gradient-secure'
    },
    {
        id: 'bug-hunter',
        name: 'Bug Hunter',
        description: 'Debugged and fixed a broken Anchor program',
        icon: '🕷️',
        color: 'bg-gradient-bug'
    },
    {
        id: 'dapp-architect',
        name: 'DApp Architect',
        description: 'Built and launched your own project on Solana',
        icon: '🏁',
        color: 'bg-gradient-mission'
    }
];
