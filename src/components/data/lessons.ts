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
    }
];