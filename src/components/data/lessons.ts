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
                title: 'Data Capsules (Variables & Mutability)',
                description: 'Master Rust\'s ownership system by storing cosmic data in variables',
                chapter: 1,
                order: 1,
                difficulty: 'beginner',
                estimatedTime: 25,
                storyText: `
                **Welcome to the Anchor Academy, Space Cadet!** 🚀

            You've just enlisted in Commander Rust's elite crew aboard the starship Solana.
            Your first mission: learn how Rust handles data storage — a vital skill for writing secure, reliable smart contracts in the blockchain galaxy.
            
            ## Why Rust for Blockchain?
            Rust was chosen for Solana because it offers **memory safety** without relying on garbage collection.
            In the high-stakes world of blockchain, even a single bug can result in lost funds. Rust's powerful compile-time checks help prevent catastrophic mistakes like:
            - 🛡️ **Buffer overflows** - writing beyond allocated memory
            - ⚡ **Use-after-free errors** - using memory after it's been freed
            - 🔒 **Data races** - unsafe simultaneous access in multi-threaded code
            - 🔧 **Memory leaks** - unused memory that's never released
            
            ## Rust's Golden Rules of Variables:
            🔒 **Immutable by default**: Variables cannot be changed unless explicitly marked as mutable
            🔑 **Explicit mutability**: Use \`mut\` keyword when you need to modify data
            🛡️ **Type safety**: Rust knows what kind of data you're storing and prevents type errors
            ⚡ **Zero-cost abstractions**: Safety doesn't sacrifice performance
            
            ## The Power of Immutability
            In smart contracts, immutability is your shield against accidental state changes that could drain user funds.
            For example:
            \`\`\`rust
let ship_name = "USS Solana";
            \`\`\`

            This means the ship's name will never change during the program's execution.

            In Rust, you define variables with:
            The \`let\` keyword
            The variable name \`ship_name\`
            The assignment operator \`=\`
            The value \`"USS Solana"\`
            A semicolon \`;\` to end the statement    
            
            But when you do need to modify data — say, adjusting fuel levels mid-flight — you explicitly opt in to mutability:
            \`let mut fuel = 100;\`

            ## Rust's data types:
            - String (\`String\`) and string slices (\`&str\`)
            - Boolean (\`true\`, \`false\`)
            - Unsigned integers (\`u8\`, \`u16\`, \`u32\`, \`u64\`, \`u128\`)
            - Signed integers (\`i8\`, \`i16\`, \`i32\`, \`i64\`, \`i128\`)
            - Floating-point numbers (\`f32\`, \`f64\`)
            (Note: Rust doesn't have \`f8\`, \`f16\`, or \`f128\` in standard usage — only \`f32\` and \`f64\`.)
            
            ## Commander's Tip:
            This isn't just about syntax — it's Rust's way of making your intentions crystal clear to both the compiler and your fellow space engineers.`,
                objectives: [
                    'Understand why immutability by default prevents bugs in smart contracts',
                    'Use let vs let mut appropriately based on data modification needs',
                    'Work with different primitive data types (integers, strings, booleans)',
                    'Apply Rust\'s type system to prevent runtime errors',
                    'See how the compiler catches mutability violations at compile-time'
                ],
                code: {
                    initial: `// Mission: Starship Inventory Management System
            // You're managing the USS Solana's critical systems during a deep space mission
            
            fn main() {
                println!("🚀 INITIALIZING STARSHIP SYSTEMS 🚀");
                
                // TODO 1: Ship Identity (Immutable Data)
                // Create an immutable variable for ship_name
                // Ships are built once and their names are permanent
                // Set it to "USS Solana"
                
                // TODO 2: Ship Specifications (Immutable Data)
                // Create immutable variables for ship design constants:
                // - max_crew_size: 50 (u8 type for small numbers)
                // - max_fuel_capacity: 10000 (u32 type for larger numbers)  
                // - warp_capable: true (bool type)
                
                // TODO 3: Dynamic Systems (Mutable Data)
                // Create mutable variables for changing conditions:
                // - current_fuel: 8500 (starts below max capacity)
                // - crew_count: 25 (starts with half crew)
                // - shields_active: false (starts deactivated)
                
                // TODO 4: Pre-flight Operations
                // Perform these operations to prepare for launch:
                // - Consume 500 fuel units for system startup
                // - Add 10 more crew members joining the mission
                // - Activate shields (set to true)
                
                // Status Report Generation
                println!("\\n=== STARSHIP STATUS REPORT ===");
                println!("Ship Name: {}", ship_name);
                println!("Specifications:");
                println!("  Max Crew: {} | Max Fuel: {} | Warp Drive: {}", 
                         max_crew_size, max_fuel_capacity, warp_capable);
                println!("Current Status:");
                println!("  Fuel: {}/{} units ({:.1}% capacity)", 
                         current_fuel, max_fuel_capacity, 
                         (current_fuel as f32 / max_fuel_capacity as f32) * 100.0);
                println!("  Crew: {}/{} members", crew_count, max_crew_size);
                println!("  Shields: {}", if shields_active { "ONLINE" } else { "OFFLINE" });
                
                // TODO 5: Test Immutability (Debugging Exercise)
                // Try uncommenting this line to see Rust's compiler protection:
                // ship_name = "Different Name"; // This should cause a compilation error!
                
                // TODO 6: Fuel Efficiency Calculation
                // Calculate fuel efficiency: remaining fuel per crew member
                // Use integer division to get whole units per person
                let fuel_per_crew = current_fuel / (crew_count as u32);
                println!("\\n📊 Mission Analytics:");
                println!("  Fuel efficiency: {} units per crew member", fuel_per_crew);
                
                // Mission readiness check
                let ready_for_mission = current_fuel > 1000 && crew_count >= 20 && shields_active;
                println!("  Mission Ready: {}", if ready_for_mission { "✅ GO" } else { "❌ NO-GO" });
                
                println!("\\n🎯 Mission Control: All systems check complete!");
            }`,
                    solution: `// Mission: Starship Inventory Management System
            fn main() {
                println!("🚀 INITIALIZING STARSHIP SYSTEMS 🚀");
                
                // Ship Identity (Immutable Data)
                let ship_name = "USS Solana";
                
                // Ship Specifications (Immutable Data) 
                let max_crew_size: u8 = 50;
                let max_fuel_capacity: u32 = 10000;
                let warp_capable: bool = true;
                
                // Dynamic Systems (Mutable Data)
                let mut current_fuel: u32 = 8500;
                let mut crew_count: u8 = 25;
                let mut shields_active: bool = false;
                
                // Pre-flight Operations
                current_fuel -= 500;  // Consume fuel for system startup
                crew_count += 10;     // Add crew members
                shields_active = true; // Activate shields
                
                // Status Report Generation
                println!("\\n=== STARSHIP STATUS REPORT ===");
                println!("Ship Name: {}", ship_name);
                println!("Specifications:");
                println!("  Max Crew: {} | Max Fuel: {} | Warp Drive: {}", 
                         max_crew_size, max_fuel_capacity, warp_capable);
                println!("Current Status:");
                println!("  Fuel: {}/{} units ({:.1}% capacity)", 
                         current_fuel, max_fuel_capacity, 
                         (current_fuel as f32 / max_fuel_capacity as f32) * 100.0);
                println!("  Crew: {}/{} members", crew_count, max_crew_size);
                println!("  Shields: {}", if shields_active { "ONLINE" } else { "OFFLINE" });
                
                // This would cause a compilation error:
                // ship_name = "Different Name"; // ❌ Cannot assign twice to immutable variable
                
                // Fuel Efficiency Calculation
                let fuel_per_crew = current_fuel / (crew_count as u32);
                println!("\\n📊 Mission Analytics:");
                println!("  Fuel efficiency: {} units per crew member", fuel_per_crew);
                
                // Mission readiness check
                let ready_for_mission = current_fuel > 1000 && crew_count >= 20 && shields_active;
                println!("  Mission Ready: {}", if ready_for_mission { "✅ GO" } else { "❌ NO-GO" });
                
                println!("\\n🎯 Mission Control: All systems check complete!");
            }`,
                    tests: [
                        {
                            name: 'Immutable variables correctly defined',
                            description: 'ship_name, max_crew_size, max_fuel_capacity, and warp_capable should be immutable',
                            check: 'Uses let (not let mut) for constants that never change',
                            points: 10
                        },
                        {
                            name: 'Mutable variables correctly defined', 
                            description: 'current_fuel, crew_count, and shields_active should be mutable',
                            check: 'Uses let mut for variables that need to be modified',
                            points: 10
                        },
                        {
                            name: 'Correct type annotations',
                            description: 'Uses appropriate integer types (u8 for small values, u32 for larger ones)',
                            check: 'max_crew_size and crew_count use u8, fuel variables use u32',
                            points: 15
                        },
                        {
                            name: 'Pre-flight operations executed',
                            description: 'Fuel consumption, crew addition, and shield activation work correctly',
                            check: 'current_fuel = 8000, crew_count = 35, shields_active = true',
                            points: 20
                        },
                        {
                            name: 'Type casting for calculations',
                            description: 'Properly casts between integer types for fuel efficiency calculation',
                            check: 'crew_count cast to u32 for division, fuel percentage uses f32 casting',
                            points: 15
                        },
                        {
                            name: 'Code compiles without errors',
                            description: 'All variable declarations and operations are syntactically correct',
                            check: 'Program compiles and runs successfully',
                            points: 20
                        },
                        {
                            name: 'Mission readiness logic',
                            description: 'Boolean logic correctly evaluates mission readiness',
                            check: 'Uses && operator to combine multiple conditions',
                            points: 10
                        }
                    ]
                },
                hints: [
                    '💡 Use `let` for data that never changes (ship specifications)',
                    '🔧 Use `let mut` for data that will be modified during execution',
                    '🔢 For type annotations, use u8 for small numbers (0-255), u32 for larger ones',
                    '⚡ Use compound assignment operators: -= for subtraction, += for addition',  
                    '🎯 Cast between types using `as`: `crew_count as u32` converts u8 to u32',
                    '🛡️ Try uncommenting the error line to see Rust\'s compile-time protection!',
                    '📊 Use f32 casting for percentage calculations to get decimal precision'
                ],
                completed: false,
                locked: false
            },
            {
                id: 'rust-functions',
                title: 'Command Protocols (Functions & Parameters)',
                description: 'Create reusable command sequences with functions, parameters, and return values',
                chapter: 1,
                order: 2,
                difficulty: 'beginner',
                estimatedTime: 30,
                storyText: `Outstanding work managing ship data, Cadet! 🚀
                You've proven yourself in handling ship variables. Now it's time to learn about functions — the command protocols that keep your code organized, reusable, and mission-ready.
            
            ## Why Functions Matter in Smart Contracts
            On a space mission, you rely on standardized procedures to handle recurring tasks — docking maneuvers, system checks, emergency responses.
            
            In Rust, functions work the same way:
            - 🔄 **Reusability**: Write code once, use it many times to reduce duplication
            - 📥 **Parameters**: Accept input so the function can adapt to different scenarios
            - 📤 **Return values**: Send results back to the part of the program that called the function
            - 🛡️ **Type safety**: Rust ensures you pass and return the correct data types
            
            ## Function Anatomy in Rust
            \`\`\`rust
fn function_name(param: Type) -> ReturnType {
    // function body
    result // implicit return (no semicolon)
}
            \`\`\`

            ## Control Flow in Rust
            Functions often work with control flow statements like \`if\`, \`else\`, and loops to make decisions:
            \`\`\`rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("Condition was true");
    } else {
        println!("Condition was false");
    }
}
            \`\`\`
            
            ## Key Concepts:
            - 🎯 **Function signature**: Defines name, parameters, and return type
            - 📦 **Parameters**: Input values with explicit types (\`x: i32\`)
            - 🔄 **Return values**: Declared with \`-> Type\` to specify what the function outputs
            - ⚡ **Implicit returns**: The last expression without a semicolon is automatically returned
            - 🔧 **Explicit returns**: Use \`return value;\` for early exits from a function
            
            ## Real-World (or Real-Space) Application
            Think of functions as mission protocols:
            - 🛰️ "Navigation Protocol Alpha" - Takes coordinates → returns optimal flight path
            - 📦 "Resource Check Protocol" - Takes current supplies → returns status report
            - 🛡️ "Emergency Protocol" -  Takes threat level → returns defensive strategy
            
            In **Anchor development**, your smart contract instructions are functions that the blockchain calls with **specific parameters** — just like following a precise mission protocol in space.`,
                objectives: [
                    'Define functions with descriptive names and proper type signatures',
                    'Use explicit type annotations for parameters and return values',
                    'Understand the difference between expressions and statements in Rust',
                    'Practice calling functions with different argument types',
                    'Learn how functions promote code organization and prevent bugs',
                    'See how function composition builds complex systems from simple parts'
                ],
                code: {
                    initial: `// Mission: Starship Navigation & Resource Management Command Center
            
            // TODO 1: Navigation Function - Calculate travel time between star systems
            // Function name: calculate_travel_time
            // Parameters: distance (f64 in light-years), speed (f64 in ly/hour)  
            // Returns: travel time as f64 (in hours)
            // Formula: time = distance / speed
            // Add validation: return 0.0 if speed <= 0.0 to prevent division by zero
            
            // TODO 2: Resource Management - Check fuel adequacy for mission
            // Function name: check_fuel_status
            // Parameters: current_fuel (u32), required_fuel (u32), emergency_reserve (u32)
            // Returns: String message about fuel status
            // Logic: 
            //   - If current >= required + emergency_reserve: "Fuel optimal"
            //   - If current >= required: "Fuel adequate"  
            //   - Otherwise: "Critical fuel shortage"
            
            // TODO 3: Communication Protocol - Generate mission status report
            // Function name: generate_mission_report
            // Parameters: ship_name (&str), crew_count (u32), fuel_remaining (u32), days_elapsed (u16)
            // Returns: String with formatted multi-line report
            // Include ship name, crew, fuel, mission duration, and operational status
            
            // TODO 4: Warp Drive Calculations - Apply warp speed multiplier
            // Function name: calculate_warp_speed  
            // Parameters: base_speed (f64), warp_factor (u8)
            // Returns: effective speed as f64
            // Formula: base_speed * (warp_factor as f64).powf(1.5)
            // Limit: if warp_factor > 9, cap it at 9 (maximum safe warp)
            
            // TODO 5: Risk Assessment - Evaluate mission danger level
            // Function name: assess_mission_risk
            // Parameters: distance (f64), unknown_systems (u8), crew_experience (f32 from 0.0-10.0)
            // Returns: String risk assessment
            // Formula: risk_score = (distance / 100.0) + (unknown_systems as f32 * 0.5) - crew_experience
            // Risk levels:
            //   - score <= 0.0: "Minimal risk"
            //   - score <= 3.0: "Moderate risk" 
            //   - score > 3.0: "High risk"
            
            fn main() {
                println!("🚀 MISSION CONTROL NAVIGATION COMPUTER ONLINE 🚀\\n");
                
                // Mission parameters
                let ship_name = "USS Solana Explorer";
                let distance_to_proxima = 4.24; // light-years to Proxima Centauri
                let base_warp_speed = 2.5; // ly/hour at warp 1
                let current_fuel = 15000_u32;
                let mission_fuel_requirement = 12000_u32;
                let emergency_reserve = 2000_u32;
                let crew_size = 42_u32;
                let mission_day = 127_u16;
                let crew_experience_rating = 7.8_f32;
                let unknown_systems_count = 3_u8;
                let selected_warp_factor = 6_u8;
                
                println!("📊 MISSION PARAMETERS:");
                println!("Ship: {}", ship_name);
                println!("Destination: Proxima Centauri ({} ly)", distance_to_proxima);
                println!("Current fuel: {} units", current_fuel);
                println!("Required fuel: {} units", mission_fuel_requirement);
                println!("Crew: {} members (experience: {}/10)", crew_size, crew_experience_rating);
                println!();
                
                // TODO 6: Call your functions and store results
                // let travel_time_standard = calculate_travel_time(distance_to_proxima, base_warp_speed);
                // let fuel_status = check_fuel_status(current_fuel, mission_fuel_requirement, emergency_reserve);
                // let warp_speed = calculate_warp_speed(base_warp_speed, selected_warp_factor);
                // let travel_time_warp = calculate_travel_time(distance_to_proxima, warp_speed);
                // let risk_assessment = assess_mission_risk(distance_to_proxima, unknown_systems_count, crew_experience_rating);
                // let status_report = generate_mission_report(ship_name, crew_size, current_fuel, mission_day);
                
                // Navigation Analysis
                println!("🧭 NAVIGATION ANALYSIS:");
                println!("Standard speed travel time: {:.1} hours ({:.1} days)", travel_time_standard, travel_time_standard / 24.0);
                println!("Warp {} effective speed: {:.2} ly/hour", selected_warp_factor, warp_speed);
                println!("Warp speed travel time: {:.1} hours ({:.1} days)", travel_time_warp, travel_time_warp / 24.0);
                println!("Time saved: {:.1} hours", travel_time_standard - travel_time_warp);
                println!();
                
                // Resource & Risk Assessment  
                println!("⛽ RESOURCE STATUS: {}", fuel_status);
                println!("⚠️  RISK ASSESSMENT: {}", risk_assessment);
                println!();
                
                // Mission Report
                println!("📋 COMPREHENSIVE MISSION REPORT:");
                println!("{}", status_report);
                
                // Mission recommendation
                let mission_approved = fuel_status.contains("optimal") || fuel_status.contains("adequate");
                let risk_acceptable = !risk_assessment.contains("High risk");
                
                println!("\\n🎯 MISSION CONTROL RECOMMENDATION:");
                if mission_approved && risk_acceptable {
                    println!("✅ MISSION APPROVED - All systems go for interstellar travel!");
                } else {
                    println!("⛔ MISSION HOLD - Address concerns before departure");
                    if !mission_approved {
                        println!("   - Resolve fuel situation");
                    }
                    if !risk_acceptable {
                        println!("   - Mitigate high risk factors");
                    }
                }
            }`,
                    solution: `// Mission: Starship Navigation & Resource Management Command Center
            
            // Navigation Function
            fn calculate_travel_time(distance: f64, speed: f64) -> f64 {
                if speed <= 0.0 {
                    return 0.0; // Prevent division by zero
                }
                distance / speed
            }
            
            // Resource Management Function
            fn check_fuel_status(current_fuel: u32, required_fuel: u32, emergency_reserve: u32) -> String {
                if current_fuel >= required_fuel + emergency_reserve {
                    "Fuel optimal".to_string()
                } else if current_fuel >= required_fuel {
                    "Fuel adequate".to_string()
                } else {
                    "Critical fuel shortage".to_string()
                }
            }
            
            // Communication Protocol Function
            fn generate_mission_report(ship_name: &str, crew_count: u32, fuel_remaining: u32, days_elapsed: u16) -> String {
                format!(
                    "=== DEEP SPACE MISSION REPORT ===\\n\\
                     Vessel: {}\\n\\
                     Crew Complement: {} officers and specialists\\n\\
                     Fuel Reserves: {} units\\n\\
                     Mission Duration: {} days\\n\\
                     Operational Status: All systems nominal\\n\\
                     Report Generated: Stardate {:.1}",
                    ship_name, 
                    crew_count, 
                    fuel_remaining, 
                    days_elapsed,
                    days_elapsed as f32 + 2387.5 // Fictional stardate
                )
            }
            
            // Warp Drive Calculations
            fn calculate_warp_speed(base_speed: f64, warp_factor: u8) -> f64 {
                let safe_warp = if warp_factor > 9 { 9 } else { warp_factor };
                base_speed * (safe_warp as f64).powf(1.5)
            }
            
            // Risk Assessment Function
            fn assess_mission_risk(distance: f64, unknown_systems: u8, crew_experience: f32) -> String {
                let risk_score = (distance / 100.0) + (unknown_systems as f32 * 0.5) - crew_experience;
                
                if risk_score <= 0.0 {
                    "Minimal risk".to_string()
                } else if risk_score <= 3.0 {
                    "Moderate risk".to_string()
                } else {
                    "High risk".to_string()
                }
            }
            
            fn main() {
                println!("🚀 MISSION CONTROL NAVIGATION COMPUTER ONLINE 🚀\\n");
                
                // Mission parameters
                let ship_name = "USS Solana Explorer";
                let distance_to_proxima = 4.24; // light-years to Proxima Centauri
                let base_warp_speed = 2.5; // ly/hour at warp 1
                let current_fuel = 15000_u32;
                let mission_fuel_requirement = 12000_u32;
                let emergency_reserve = 2000_u32;
                let crew_size = 42_u32;
                let mission_day = 127_u16;
                let crew_experience_rating = 7.8_f32;
                let unknown_systems_count = 3_u8;
                let selected_warp_factor = 6_u8;
                
                println!("📊 MISSION PARAMETERS:");
                println!("Ship: {}", ship_name);
                println!("Destination: Proxima Centauri ({} ly)", distance_to_proxima);
                println!("Current fuel: {} units", current_fuel);
                println!("Required fuel: {} units", mission_fuel_requirement);
                println!("Crew: {} members (experience: {}/10)", crew_size, crew_experience_rating);
                println!();
                
                // Call functions and store results
                let travel_time_standard = calculate_travel_time(distance_to_proxima, base_warp_speed);
                let fuel_status = check_fuel_status(current_fuel, mission_fuel_requirement, emergency_reserve);
                let warp_speed = calculate_warp_speed(base_warp_speed, selected_warp_factor);
                let travel_time_warp = calculate_travel_time(distance_to_proxima, warp_speed);
                let risk_assessment = assess_mission_risk(distance_to_proxima, unknown_systems_count, crew_experience_rating);
                let status_report = generate_mission_report(ship_name, crew_size, current_fuel, mission_day);
                
                // Navigation Analysis
                println!("🧭 NAVIGATION ANALYSIS:");
                println!("Standard speed travel time: {:.1} hours ({:.1} days)", travel_time_standard, travel_time_standard / 24.0);
                println!("Warp {} effective speed: {:.2} ly/hour", selected_warp_factor, warp_speed);
                println!("Warp speed travel time: {:.1} hours ({:.1} days)", travel_time_warp, travel_time_warp / 24.0);
                println!("Time saved: {:.1} hours", travel_time_standard - travel_time_warp);
                println!();
                
                // Resource & Risk Assessment  
                println!("⛽ RESOURCE STATUS: {}", fuel_status);
                println!("⚠️  RISK ASSESSMENT: {}", risk_assessment);
                println!();
                
                // Mission Report
                println!("📋 COMPREHENSIVE MISSION REPORT:");
                println!("{}", status_report);
                
                // Mission recommendation
                let mission_approved = fuel_status.contains("optimal") || fuel_status.contains("adequate");
                let risk_acceptable = !risk_assessment.contains("High risk");
                
                println!("\\n🎯 MISSION CONTROL RECOMMENDATION:");
                if mission_approved && risk_acceptable {
                    println!("✅ MISSION APPROVED - All systems go for interstellar travel!");
                } else {
                    println!("⛔ MISSION HOLD - Address concerns before departure");
                    if !mission_approved {
                        println!("   - Resolve fuel situation");
                    }
                    if !risk_acceptable {
                        println!("   - Mitigate high risk factors");
                    }
                }
            }`,
                    tests: [
                        {
                            name: 'Navigation function works correctly',
                            description: 'calculate_travel_time returns correct time and handles zero speed',
                            check: 'distance=4.24, speed=2.5 returns ~1.696 hours; speed=0 returns 0.0',
                            points: 15
                        },
                        {
                            name: 'Fuel status logic correct', 
                            description: 'check_fuel_status returns appropriate messages based on fuel levels',
                            check: 'Returns "optimal", "adequate", or "shortage" based on fuel + reserve calculations',
                            points: 15
                        },
                        {
                            name: 'Mission report formatting',
                            description: 'generate_mission_report creates properly formatted multi-line string',
                            check: 'Includes all parameters and proper formatting with newlines',
                            points: 15
                        },
                        {
                            name: 'Warp speed calculation',
                            description: 'calculate_warp_speed applies correct formula and caps warp factor',
                            check: 'Uses warp^1.5 multiplier and limits warp factor to 9 maximum',
                            points: 20
                        },
                        {
                            name: 'Risk assessment algorithm',
                            description: 'assess_mission_risk calculates risk score and returns correct category',
                            check: 'Uses distance/100 + systems*0.5 - experience formula with proper thresholds',
                            points: 15
                        },
                        {
                            name: 'All functions called in main',
                            description: 'Main function calls all created functions and displays results',
                            check: 'travel_time, fuel_status, warp_speed, risk_assessment, and status_report all used',
                            points: 10
                        },
                        {
                            name: 'Type safety maintained',
                            description: 'All function signatures use correct parameter and return types',
                            check: 'No type mismatches, proper use of f64, u32, u8, &str, and String types',
                            points: 10
                        }
                    ]
                },
                hints: [
                    '🎯 Function syntax: `fn name(param: type) -> return_type { }`',
                    '🔢 Use explicit type annotations for all parameters: `distance: f64`',
                    '📝 String literals need `.to_string()` or `format!()` for String return type',
                    '🔄 Use `(value as type)` to convert between numeric types safely',
                    '⚡ Last expression without semicolon is automatically returned',
                    '🛡️ Add validation checks to prevent errors (like division by zero)',
                    '📐 Use `.powf()` for floating-point exponentiation: `base.powf(exponent)`'
                ],
                completed: false,
                locked: true
            }
        ]
    },
    {
        id: 'solana-accounts',
        title: 'Orbital Mechanics (Solana Account Model)', 
        description: 'Master the Solana account model - understand the space stations of the blockchain!',
        icon: '🛸',
        color: 'bg-gradient-nebula',
        completed: false,
        lessons: [
            {
                id: 'account-model-deep-dive',
                title: 'Space Station Architecture (Account Model)',
                description: 'Understand how Solana accounts store data and executable code across the blockchain',
                chapter: 2,
                order: 1,
                difficulty: 'intermediate', 
                estimatedTime: 30,
                storyText: `**Congratulations, Chief Engineer!** 🛰️  
                
    You've been promoted to oversee the entire account system of the starship Solana.
    In the blockchain galaxy, accounts are the space stations — hubs where all mission-critical data is stored.
    
    ## The Solana Account Universe
    On Solana, **code** (programs) and **data** (accounts) live separately:
    - 🧑‍🚀 **Programs:** - Your smart contracts: immutable code, deployed once and forever
    - 🛰️ **Accounts:** - Flexible data containers that store the state your program uses
    - 🗺️ **Addresses:** - Every account and program has a unique **32-byte (256-bit)** address
    - 🔑 **Ownership:** - Each account is owned by exactly **one program**
    
    ### Core Account Concepts
    - **Everything is an account** — programs, wallets, tokens, storage — all follow the same account structure
    - **Programs store no state** — they only execute logic; all state lives in accounts they own
    - **Rent** — Accounts pay rent to remain on-chain (unless rent-exempt)
    - **Parallelism:** - Transactions that touch different accounts can be processed simultaneously, giving Solana its legendary speed

    Example: An Account in Anchor
\`\`\`rust
    use anchor_lang::prelude::*;
    
    declare_id!("11111111111111111111111111111111");

    #[program]
    mod hello_anchor {
        use super::*;
        
        pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
            ctx.accounts.new_account.data = data;
            msg!("Changed data to: {}!", data);
            Ok(())
        }
    }
    
    #[derive(Accounts)]
    pub struct Initialize<'info> {
        #[account(init, payer = signer, space = 8 + 8)]
        pub new_account: Account<'info, NewAccount>,
        #[account(mut)]
        pub signer: Signer<'info>,
        pub system_program: Program<'info, System>,
    }
    
    #[account]
    pub struct NewAccount {
        data: u64,
    }
\`\`\`

## Breaking It Down
- \`use\` - Imports functionality from the \`anchor_lang\` library
- \`declare_id!\` - Specifies the program ID (on-chain address of the program)
- \`#[program]\` - Marks the module containing all instruction handlers
- **Instruction Handlers** - Functions inside the program module that run when an instruction is called
- \`Context<T>\` - First parameter in every handler; specifies the accounts required for the instruction

## Accessing Context Fields
- \`ctx.accounts\` - The accounts required for the instruction
- \`ctx.program_id\` - The program's public key
- \`ctx.remaining_accounts\` - Any extra accounts passed in
- \`ctx.bumps\` - Bump seeds for any Program Derived Address (PDA) accounts

\`#[derive(Accounts)]\`
This macro defines which accounts must be passed into the instruction and validates them before execution.
Account constraints (e.g., \`#[account(mut)]\`, \`#[account(init)])\` are added above each field to enforce rules like mutability or initialization.

\`#[account]\`
Applied to structs that define custom account data stored on-chain:

\`\`\`rust
    #[account]
    pub struct Example {
        pub item_1: u32,
        pub item_2: Pubkey,
        pub item_3: String,
        pub item_4: f32,
        pub item_5: bool,
    }
\`\`\`

### Account Space Calculation
When creating an account, you must reserve enough space (in bytes) for its data:
\`\`\`table
Types	    Space in bytes	        Details/Example
bool	        1	                Uses 1 byte (even though it's just 1 bit)
u8/i8	        1	
u16/i16	        2	
u32/i32	        4	
u64/i64	        8	
u128/i128	    16	
[T;n]	    space(T) x n	        Example: \`[u16; 32]\` → 2 x 32 = 64
Pubkey	        32	
Vec<T>	    4 + (space(T) x n)	    4 bytes for length prefix
String	    4 + length in bytes	    4 bytes for length prefix
Option<T>	1 + space(T)	        1 byte for presence flag
Enum	    1 + largest variant size Example: \`Enum { A, B { u8 }, C { u16 } }\` → 1 + 2 = 3
f32	            4	                Cannot serialize\`NaN\`
f64	            8	                Cannot serialize \`NaN\`
\`\`\`
    
    ## Mission Tip:
    Understanding and managing accounts is mission-critical for every Anchor developer.
    They're not just data containers — they're the lifeblood of the Solana galaxy.`,
                objectives: [
                    'Understand Solana’s separation of code and data (accounts vs programs)',
                    'Define and allocate structured Anchor accounts for on-chain data',
                    'Calculate precise account space for rent exemption',
                    'Use Anchor constraints to enforce account creation and signer validation',
                    'Safely initialize and mutate on-chain data accounts',
                ],
                code: {
                    initial: `// Mission: Space Station Construction
    
    use anchor_lang::prelude::*;
    
    // TODO 1: Declare your program ID
    // Use declare_id! macro with a placeholder address
    
    // TODO 2: Define a SpaceStation account struct with:
    // - station_name: String (max 32 chars)  
    // - commander: Pubkey (account owner)
    // - crew_count: u16
    // - fuel_reserves: u64 (lamports)
    // - operational: bool
    // - coordinates: [u8; 3] (x, y, z)
    
    // TODO 3: Calculate the required space (bytes) for SpaceStation
    // 8 bytes: Anchor discriminator
    // 36 bytes: station_name (4 bytes vec header + 32 bytes string)
    // 32 bytes: commander (Pubkey)
    // 2 bytes: crew_count (u16)
    // 8 bytes: fuel_reserves (u64)
    // 1 byte: operational (bool)
    // 3 bytes: coordinates ([u8;3])
    // Total: ? bytes
    
    #[program]
    pub mod orbital_mechanics {
        use super::*;
        
        // TODO 4: Write instruction to establish a new space station
        pub fn establish_station(
            ctx: Context<EstablishStation>,
            station_name: String,
            coordinates: [u8; 3]
        ) -> Result<()> {
            // TODO: Validate station_name length ≤ 32
            // Initialize all SpaceStation fields as specified
            Ok(())
        }
        
        // TODO 5: Write instruction to activate a station (make it operational)
        pub fn activate_station(ctx: Context<ActivateStation>) -> Result<()> {
            // TODO: Set operational true, crew_count to 10, fuel_reserves to 1_000_000
            Ok(())
        }
    }
    
    // TODO 6: Define the EstablishStation context
    // - #[account(init, ...)] for space_station, payer commander, correct space
    // - commander must be a mutable signer
    // - system_program for CPI
    
    // TODO 7: Define the ActivateStation context
    // - #[account(mut, has_one = commander)] for space_station
    // - commander must sign
    
    // TODO 8: Add a custom error for station_name too long
    `,
                    solution: `// Mission: Space Station Construction
    use anchor_lang::prelude::*;
    
    declare_id!("11111111111111111111111111111111");
    
    #[account]
    pub struct SpaceStation {
        pub station_name: String,    // 4 + 32 = 36 bytes
        pub commander: Pubkey,       // 32 bytes
        pub crew_count: u16,         // 2 bytes
        pub fuel_reserves: u64,      // 8 bytes
        pub operational: bool,       // 1 byte
        pub coordinates: [u8; 3],    // 3 bytes
    }
    // Total space: 8 + 36 + 32 + 2 + 8 + 1 + 3 = 90 bytes
    
    #[program]
    pub mod orbital_mechanics {
        use super::*;
        
        pub fn establish_station(
            ctx: Context<EstablishStation>,
            station_name: String,
            coordinates: [u8; 3]
        ) -> Result<()> {
            let station = &mut ctx.accounts.space_station;
    
            require!(station_name.len() <= 32, ErrorCode::NameTooLong);
    
            station.station_name = station_name;
            station.commander = ctx.accounts.commander.key();
            station.crew_count = 0;
            station.fuel_reserves = 0;
            station.operational = false;
            station.coordinates = coordinates;
    
            msg!("New space station established: {} at {:?}", station.station_name, station.coordinates);
            Ok(())
        }
    
        pub fn activate_station(ctx: Context<ActivateStation>) -> Result<()> {
            let station = &mut ctx.accounts.space_station;
    
            station.operational = true;
            station.crew_count = 10;
            station.fuel_reserves = 1_000_000;
    
            msg!("Space station {} is now operational!", station.station_name);
            Ok(())
        }
    }
    
    #[derive(Accounts)]
    #[instruction(station_name: String)]
    pub struct EstablishStation<'info> {
        #[account(init, payer = commander, space = 90)]
        pub space_station: Account<'info, SpaceStation>,
    
        #[account(mut)]
        pub commander: Signer<'info>,
    
        pub system_program: Program<'info, System>,
    }
    
    #[derive(Accounts)]
    pub struct ActivateStation<'info> {
        #[account(
            mut,
            has_one = commander
        )]
        pub space_station: Account<'info, SpaceStation>,
    
        pub commander: Signer<'info>,
    }
    
    #[error_code]
    pub enum ErrorCode {
        #[msg("Station name cannot exceed 32 characters")]
        NameTooLong,
    }
    `,
                    tests: [
                        {
                            name: 'SpaceStation struct is defined with correct field types',
                            description: 'The SpaceStation struct fields and types match the spec (String, Pubkey, u16, u64, bool, [u8; 3])',
                            check: 'Fields should exist and match types exactly',
                            points: 15,
                        },
                        {
                            name: 'Space calculation is accurate (90 bytes total)',
                            description: 'Account space sums to 90 including discriminator',
                            check: 'space = 90 in EstablishStation context',
                            points: 10,
                        },
                        {
                            name: 'establish_station initializes all SpaceStation fields correctly and validates station_name',
                            description: 'Instruction initializes and validates station_name length properly',
                            check: 'station_name <= 32, all struct fields fill as specified',
                            points: 20,
                        },
                        {
                            name: 'activate_station correctly updates state',
                            description: 'Sets operational to true, crew_count to 10, fuel_reserves to 1_000_000',
                            check: 'station.operational == true, .crew_count == 10, .fuel_reserves == 1_000_000',
                            points: 15,
                        },
                        {
                            name: 'EstablishStation context uses #[account(init)] correctly',
                            description: 'New account is created, payer set, system_program included',
                            check: 'init, payer, space in context',
                            points: 10,
                        },
                        {
                            name: 'ActivateStation context uses #[account(has_one = commander)] for security',
                            description: 'Instruction only runs if commander matches account',
                            check: 'has_one = commander on space_station',
                            points: 10,
                        },
                        {
                            name: 'Custom error for station_name overflow',
                            description: 'NameTooLong error defined and used with require! macro',
                            check: 'Error code NameTooLong defined and invoked',
                            points: 10,
                        },
                        {
                            name: 'Program compiles and follows Anchor best practices',
                            description: 'No syntax errors, idiomatic Anchor usage',
                            check: 'Full program compiles',
                            points: 10,
                        }
                    ]
                },
                hints: [
                    'String fields need 4 bytes (length) plus storage (e.g., 32 for max 32 char name)',
                    'Discriminator adds 8 bytes at the start of each account type',
                    'Use #[account(init, payer = X, space = Y)] for new account creation',
                    'The has_one constraint enforces that a field of the account matches a provided pubkey (ownership/security)',
                    'Use require! to validate parameters like station_name length',
                    'Use system_program for account initialization CPIs',
                    'msg! macro is for program log/debug output'
                ],
                completed: false,
                locked: false
            }
        ]
    },
    {
        id: 'writing-anchor-programs',
        title: 'Mission Control (Writing Anchor Programs)',
        description: 'Learn to write instructions and define on-chain logic in Anchor programs.',
        icon: '🛠️', 
        color: 'bg-gradient-fire',
        completed: false,
        lessons: [
            {
                id: 'anchor-program-structure',
                title: 'Command Center Setup (Program Structure)',
                description: 'Master the anatomy of an Anchor program with proper instruction design',
                chapter: 3,
                order: 1,
                difficulty: 'intermediate',
                estimatedTime: 35,
                storyText: `
    **Welcome, Flight Director!** 🌌
    You're now in charge of **Space Mission Control** — building and operating a powerful on-chain Mission Manager using **Solana + Anchor**.
    This mission brings together everything you've learned about accounts — and now, you'll unlock the **full power of smart contract programming** itself.
    Your job?
    Coordinate astronauts, manage mission data, and enforce security in the vast blockchain galaxy.
    
    ## 👩‍🚀 What is an Anchor Program?
    An Anchor program is the brain of your Solana mission. It's made up of three key parts:
    - **Instructions:** - On-chain functions that act like API endpoints
    - **Context structs:** - Define which accounts each instruction needs (and who can access them)
    - **Account data:** - Custom structs that store your program's persistent state
    
    In our **Mission Management System**, astronauts and ground control will send commands, store mission logs, and update states — all securely, all on-chain.
    
    ### 🚀 Anchor Program Anatomy
    \`\`\`rust
    #[program]
    mod mission_control {
        pub fn instruction_name(ctx: Context<SomeContext>, ...) -> Result<()> {
            // Mission logic goes here!
        }
    }
    \`\`\`
    
    - **Each function** inside \`#[program]\` is an **instruction** (an on-chain entrypoint)
    - **Each** \`Context<T>\` **struct** specifies the required accounts for that instruction
    - **Each** \`#[account]\` **struct** defines custom on-chain data structures for your program

    ### 🛰️ Common Account Types
    \`\`\`table
    Type	                Description
    Account<'info, T>	    An account container that automatically checks ownership during deserialization
    Signer<'info>	        Ensures that the account signed the transaction
    Program<'info, T>	    Confirms that the account is a specific program
    Box<Account<'info, T>>	Stores account data on the heap instead of the stack (saves stack space)
    \`\`\`

    ### 🔒 Common Account Constraints
    \`\`\`table
    Attribute	                    Purpose
    #[account(mut)]	                Ensures the account is mutable and saves state changes
    #[account(init)]	            reates a new account via CPI to the System Program and sets its discriminator
    #[account(seeds, bump)]	        Verifies the account is a PDA derived from the program's seeds and bump
    #[account(has_one = target)]	Ensures the account's target field matches the specified target account key
    \`\`\`
    
    Let's build a real Space Mission Manager!
    `,
                objectives: [
                    'Describe the structure of an Anchor program: instructions, context, accounts',
                    'Use context structs to validate account relationships and signatures',
                    'Implement strong input validation and on-chain error handling',
                    'Safely manage mission state transitions via explicit status codes',
                    'Enforce security with authority/commander signatures and precise constraints'
                ],
                code: {
                    initial: `// Mission: Build a Space Mission Management System
    use anchor_lang::prelude::*;
    
    // TODO 1: declare your program ID (use a placeholder)
    declare_id!("11111111111111111111111111111111");
    
    // TODO 2: Create MissionControl and Mission account structures
    
    // MissionControl keeps track of global mission state
    // Fields:
    // - authority: Pubkey
    // - total_missions: u32
    // - active_missions: u32
    // - emergency_contact: Pubkey
    // - initialized: bool
    
    // Mission represents an individual space mission
    // Fields:
    // - mission_id: u32
    // - commander: Pubkey
    // - mission_name: String (max 50 chars)
    // - destination: String (max 30 chars)
    // - crew_size: u8
    // - status: u8 (0=Planning, 1=Active, 2=Completed, 3=Aborted)
    // - fuel_allocated: u64
    // - created_at: i64 (Unix timestamp)
    
    // TODO 3: Calculate and comment the required account space for both structs
    // (Remember: 8 bytes discriminator for each account)
    // String: 4 byte len prefix + N bytes for chars
    
    #[program]
    pub mod mission_control {
        use super::*;
    
        // TODO 4: Instruction to initialize mission control
        pub fn initialize_control(ctx: Context<InitializeControl>) -> Result<()> {
            // Set all fields as specified; log with msg!
            Ok(())
        }
    
        // TODO 5: Instruction to create a new mission
        pub fn create_mission(
            ctx: Context<CreateMission>,
            mission_name: String,
            destination: String,
            crew_size: u8,
            fuel_allocated: u64
        ) -> Result<()> {
            // Validation: lengths and value ranges using require!
            // Initialize Mission fields and update MissionControl counters
            Ok(())
        }
    
        // TODO 6: Instruction to launch a mission (status: Planning ➔ Active)
        pub fn launch_mission(ctx: Context<LaunchMission>) -> Result<()> {
            // Only commander can launch; validate current status
            Ok(())
        }
    
        // TODO 7: Instruction to complete a mission (status: Active ➔ Completed)
        pub fn complete_mission(ctx: Context<CompleteMission>) -> Result<()> {
            // Only commander can complete; validate status, update counters
            Ok(())
        }
    
        // TODO 8: Instruction to abort a mission (Active ➔ Aborted, only authority!)
        pub fn abort_mission(ctx: Context<AbortMission>) -> Result<()> {
            // Only authority can abort active missions
            Ok(())
        }
    }
    
    // TODO 9: Define all context structs (InitializeControl, CreateMission, LaunchMission, CompleteMission, AbortMission)
    // - Fill out constraints: #[account(init)], payer, mut, has_one
    // - Make sure space calculations match your structs
    
    // TODO 10: Add error handling enum (MissionError), with #[error_code]
    // - Variants for all cases: MissionNameTooLong, DestinationTooLong, InvalidCrewSize, InsufficientFuel, InvalidMissionStatus, MissionNotActive
    `,
                    solution: `// Mission: Mission Management Control System with Anchor
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

// MissionControl struct (persistent program state)
// Space: 8 (discriminator) + 32 (authority) + 4 (total_missions) + 4 (active_missions) + 32 (emergency_contact) + 1 (initialized) = 81 bytes
#[account]
pub struct MissionControl {
    pub authority: Pubkey,         // 32 bytes
    pub total_missions: u32,       // 4 bytes  
    pub active_missions: u32,      // 4 bytes
    pub emergency_contact: Pubkey, // 32 bytes
    pub initialized: bool,         // 1 byte
}

// Mission struct (per-mission state)  
// Space: 8 (disc) + 4 (mission_id) + 32 (commander) + 54 (mission_name: 4 + 50) + 34 (destination: 4 + 30)
//        + 1 (crew_size) + 1 (status) + 8 (fuel) + 8 (created_at) = 150 bytes
#[account]
pub struct Mission {
    pub mission_id: u32,           // 4 bytes
    pub commander: Pubkey,         // 32 bytes
    pub mission_name: String,      // 4 + 50 = 54 bytes
    pub destination: String,       // 4 + 30 = 34 bytes
    pub crew_size: u8,             // 1 byte
    pub status: u8,                // 1 byte (0=Planning, 1=Active, 2=Completed, 3=Aborted)
    pub fuel_allocated: u64,       // 8 bytes
    pub created_at: i64,           // 8 bytes
}

#[program]
pub mod mission_control {
    use super::*;

    pub fn initialize_control(ctx: Context<InitializeControl>) -> Result<()> {
        let mission_control = &mut ctx.accounts.mission_control;
        mission_control.authority = ctx.accounts.authority.key();
        mission_control.total_missions = 0;
        mission_control.active_missions = 0;
        mission_control.emergency_contact = ctx.accounts.authority.key();
        mission_control.initialized = true;
        msg!("Mission Control initialized by {}", ctx.accounts.authority.key());
        Ok(())
    }

    pub fn create_mission(
        ctx: Context<CreateMission>,
        mission_name: String,
        destination: String,
        crew_size: u8,
        fuel_allocated: u64
    ) -> Result<()> {
        require!(mission_name.len() <= 50, MissionError::MissionNameTooLong);
        require!(destination.len() <= 30, MissionError::DestinationTooLong);
        require!(crew_size >= 1 && crew_size <= 100, MissionError::InvalidCrewSize);
        require!(fuel_allocated > 0, MissionError::InsufficientFuel);

        let mission_control = &mut ctx.accounts.mission_control;
        let mission = &mut ctx.accounts.mission;

        mission.mission_id = mission_control.total_missions + 1;
        mission.commander = ctx.accounts.commander.key();
        mission.mission_name = mission_name;
        mission.destination = destination;
        mission.crew_size = crew_size;
        mission.status = 0; // Planning
        mission.fuel_allocated = fuel_allocated;
        mission.created_at = Clock::get()?.unix_timestamp;

        mission_control.total_missions += 1;
        mission_control.active_missions += 1;

        msg!(
            "New mission '{}' created by {} (to: {})",
            mission.mission_name,
            mission.commander,
            mission.destination
        );
        Ok(())
    }

    pub fn launch_mission(ctx: Context<LaunchMission>) -> Result<()> {
        let mission = &mut ctx.accounts.mission;
        require!(mission.status == 0, MissionError::InvalidMissionStatus);
        mission.status = 1;
        msg!("Mission '{}' launched by Commander {}", mission.mission_name, mission.commander);
        Ok(())
    }

    pub fn complete_mission(ctx: Context<CompleteMission>) -> Result<()> {
        let mission_control = &mut ctx.accounts.mission_control;
        let mission = &mut ctx.accounts.mission;
        require!(mission.status == 1, MissionError::MissionNotActive);

        mission.status = 2;
        mission_control.active_missions -= 1;

        msg!("Mission '{}' completed! Welcome home!", mission.mission_name);
        Ok(())
    }

    pub fn abort_mission(ctx: Context<AbortMission>) -> Result<()> {
        let mission_control = &mut ctx.accounts.mission_control;
        let mission = &mut ctx.accounts.mission;
        require!(mission.status == 1, MissionError::MissionNotActive);

        mission.status = 3;
        mission_control.active_missions -= 1;

        msg!("EMERGENCY ABORT: Mission '{}' aborted by authority", mission.mission_name);
        Ok(())
    }
}

// Context structs
#[derive(Accounts)]
pub struct InitializeControl<'info> {
    #[account(init, payer = authority, space = 81)]
    pub mission_control: Account<'info, MissionControl>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(mission_name: String)]
pub struct CreateMission<'info> {
    #[account(mut, has_one = authority)]
    pub mission_control: Account<'info, MissionControl>,
    #[account(init, payer = commander, space = 150)]
    pub mission: Account<'info, Mission>,
    #[account(mut)]
    pub commander: Signer<'info>,
    /// CHECK: For has_one constraint on mission_control
    pub authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct LaunchMission<'info> {
    #[account(mut, has_one = commander)]
    pub mission: Account<'info, Mission>,
    pub commander: Signer<'info>,
}

#[derive(Accounts)]
pub struct CompleteMission<'info> {
    #[account(mut)]
    pub mission_control: Account<'info, MissionControl>,
    #[account(mut, has_one = commander)]
    pub mission: Account<'info, Mission>,
    pub commander: Signer<'info>,
}

#[derive(Accounts)]
pub struct AbortMission<'info> {
    #[account(mut, has_one = authority)]
    pub mission_control: Account<'info, MissionControl>,
    #[account(mut)]
    pub mission: Account<'info, Mission>,
    pub authority: Signer<'info>,
}

#[error_code]
pub enum MissionError {
    #[msg("Mission name cannot exceed 50 characters")]
    MissionNameTooLong,
    #[msg("Destination name cannot exceed 30 characters")]  
    DestinationTooLong,
    #[msg("Crew size must be between 1 and 100")]
    InvalidCrewSize,
    #[msg("Fuel allocation must be greater than 0")]
    InsufficientFuel,
    #[msg("Mission is not in the correct status for this operation")]
    InvalidMissionStatus,
    #[msg("Mission must be active to perform this action")]
    MissionNotActive,
}`,
                    tests: [
                        {
                            name: 'MissionControl and Mission structs defined with correct field types',
                            description: 'All required struct fields are present with their types and sizes commented.',
                            check: 'Fields and comments as in solution above',
                            points: 15,
                        },
                        {
                            name: 'Space calculations are accurate (81 and 150 bytes)',
                            description: 'Space values for MissionControl and Mission are correctly annotated and used in account constraints.',
                            check: 'space = 81 and space = 150',
                            points: 10,
                        },
                        {
                            name: 'All five instructions implemented',
                            description: 'initialize_control, create_mission, launch_mission, complete_mission, and abort_mission are all implemented',
                            check: 'All function stubs filled out and logic matches requirements.',
                            points: 20,
                        },
                        {
                            name: 'Validation with require! macro and custom errors',
                            description: 'All input validation uses require!() macro and defined MissionError variants',
                            check: 'require!() calls present; MissionError used',
                            points: 10,
                        },
                        {
                            name: 'Account constraints (has_one, init, mut) correct in Context structs',
                            description: 'All context structs use proper constraints and signer signatures',
                            check: 'Context struct attributes match solution',
                            points: 15,
                        },
                        {
                            name: 'Mission status transitions work as expected',
                            description: 'Missions can only move through correct state transitions, enforced by status code checks.',
                            check: 'Status codes handled and checked at each step',
                            points: 10,
                        },
                        {
                            name: 'Counters (total_missions, active_missions) correctly updated',
                            description: 'Counters in MissionControl are incremented/decremented at the right steps.',
                            check: 'total_missions, active_missions logic matches solution',
                            points: 5,
                        },
                        {
                            name: 'Authority-based access control for abort',
                            description: 'Only authority signer can abort any mission',
                            check: 'abort_mission context and logic enforce authority only',
                            points: 5,
                        },
                        {
                            name: 'Timestamp recorded on mission creation',
                            description: 'created_at uses Clock::get()?.unix_timestamp',
                            check: 'created_at logic as in solution',
                            points: 5,
                        },
                        {
                            name: 'Program compiles and follows Anchor best practices',
                            description: 'No syntax errors, idiomatic Anchor usage',
                            check: 'Whole solution passes a cargo build',
                            points: 5,
                        }
                    ]
                },
                hints: [
                    'Use #[account(init, payer = X, space = Y)] to create a new account with rent exemption.',
                    'Always specify space for account data; add up each field’s size and the 8-byte discriminator.',
                    'Validation is done with require!(condition, ErrorType::Variant) for instant error handling.',
                    'Use has_one = pubkey_field to enforce cross-account links.',
                    'Use Clock::get()?.unix_timestamp for timestamps on-chain.',
                    'Status codes: 0=Planning, 1=Active, 2=Completed, 3=Aborted.',
                    'Only the program "authority" can abort any mission, commanders can complete their own.'
                ],
                completed: false,
                locked: false
            }
        ]
    },
//     {
//         id: 'testing-anchor-cli',
//         title: 'Test Simulators (Testing with Anchor CLI)',
//         description: 'Simulate and verify your smart contracts using Anchor tests.',
//         icon: '🧪',
//         color: 'bg-gradient-lab',
//         completed: false,
//         lessons: [
//             {
//                 id: 'writing-anchor-tests',
//                 title: 'Running Simulations (Anchor Tests)',
//                 description: 'Write and run your first Anchor test in TypeScript.',
//                 chapter: 4,
//                 order: 1,
//                 difficulty: 'intermediate',
//                 estimatedTime: 20,
//                 storyText: `
//     You've powered up your interstellar engine—now it's time for the ultimate prelaunch ritual: **simulation testing**!
    
//     Anchor tests use TypeScript to mimic real Solana transactions, giving you zero-risk confidence before going on-chain.
    
//     ---
    
//     ## How Anchor Testing Works
    
//     - **Workspace:** Anchor exposes your deployed smart contract as a JS object (\`anchor.workspace.YourProgram\`)
//     - **TypeScript:** Write readable, async tests instead of boilerplate Rust/CLI scripts
//     - **chai:** Assertions on blockchain state—verify your smart contract logic automatically
    
//     When your test passes, you've successfully simulated a full on-chain mission, end-to-end!
    
//     ---
    
//     Let's simulate and verify a "Warp Core" smart contract:
//     `,
//                 objectives: [
//                     'Write an Anchor test that initializes a program account',
//                     'Use Anchor’s workspace object to invoke program instructions',
//                     'Assert expected outcomes with chai’s powerful matchers',
//                 ],
//                 code: {
//                     initial: `import * as anchor from '@coral-xyz/anchor';
//     import { Program } from '@coral-xyz/anchor';
//     import { WarpCore } from '../target/types/warp_core';
    
//     // Mission: Write (and pass) an initialization test!
//     //
//     // 1. Setup Anchor workspace and your program object
//     // 2. Find your program-derived address (PDA) for the ship account
//     // 3. Call the initialize instruction to create the ship account
//     // 4. Fetch the ship account and assert its fields
    
//     describe('warp-core', () => {
//       // TODO 1: Set up Anchor provider (anchor.AnchorProvider.env()) and workspace program object
    
//       it('initializes a ship state', async () => {
//         // TODO 2: Find the ship PDA (use PublicKey.findProgramAddress)
//         // TODO 3: Call initialize via program.methods and .rpc()
//         // TODO 4: Fetch ship account and assert fields match expected values
//       });
//     });
//     `,
//                     solution: `import * as anchor from '@coral-xyz/anchor';
// import { Program } from '@coral-xyz/anchor';
// import { WarpCore } from '../target/types/warp_core';
// import { assert } from 'chai';

// describe('warp-core', () => {
//   // Setup provider and program workspace object
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);
//   const program = anchor.workspace.WarpCore as Program<WarpCore>;

//   it('initializes a ship state', async () => {
//     // Derive the PDA for the ship (for example: ["ship", user pubkey] as seeds)
//     const [shipPDA] = await anchor.web3.PublicKey.findProgramAddress(
//       [Buffer.from('ship'), provider.wallet.publicKey.toBuffer()],
//       program.programId
//     );

//     // Send the initialize instruction to the program
//     await program.methods.initialize('Voyager', new anchor.BN(9000))
//       .accounts({
//         ship: shipPDA,
//         user: provider.wallet.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();

//     // Fetch the ship state account and assert expected values
//     const shipAccount = await program.account.shipState.fetch(shipPDA);
//     assert.equal(shipAccount.shipName, 'Voyager');
//     assert.equal(shipAccount.warpFuel.toNumber(), 9000);
//   });
// });`,
//                     tests: [
//                         {
//                             name: 'Test calls initialize successfully',
//                             description: 'Test calls the initialize instruction with expected parameters and succeeds.',
//                             check: 'Test does not throw and transaction confirms.',
//                             points: 20,
//                         },
//                         {
//                             name: 'Ship account values match expected',
//                             description: 'Test fetches the ship account and fields match (shipName, warpFuel).',
//                             check: 'assert.equal correct for both fields.',
//                             points: 20,
//                         },
//                         {
//                             name: 'Test code compiles and passes',
//                             description: 'Test is TypeScript-valid and passes anchor test.',
//                             check: 'anchor test succeeds with this suite.',
//                             points: 10,
//                         }
//                     ]
//                 },
//                 hints: [
//                     'Use anchor.workspace.YourProgramName (case-sensitive) for your deployed program object.',
//                     'Look up program-derived addresses (PDAs) with PublicKey.findProgramAddress and an array of seed buffers.',
//                     'Use program.methods.instructionName(params).accounts({ ... }).rpc() to invoke instructions.',
//                     'Use program.account.accountName.fetch(pda) to fetch account state after transactions.',
//                     'For numeric assertions, cast BN fields to JS numbers with .toNumber().',
//                     'chai’s assert.equal(a, b) checks if actual and expected values match.',
//                 ],
//                 completed: false,
//                 locked: false
//             }
//         ]
//     },
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
                storyText: `
    **🚀 Final Countdown, Cadet — Prepare for Launch!**
     
    Your ship is mission-ready, and the engines are humming.
    It's time to launch your **Anchor smart contract** into the **Solana Devnet** — a public test galaxy where you can explore, experiment, and even make mistakes without losing real treasure.
    
    **🌌 Why Devnet?**
    - 🪙 **Free test tokens** (no real SOL required)
    - 🛰 **Mainnet-like environment** — perfect for training missions
    - 🔍 **Program visibility** — explore your deployment on explorer.solana.com
    
    ## 🪐 Step 1 — Get Devnet Tokens
    Head to the **Solana Faucet** and request free test SOL.
    These tokens are your fuel for deploying and interacting with programs on Devnet.

    ## 🛠 Step 2 — Build Your Program
    Run this in your terminal:
    \`\`\`bash
anchor build
    \`\`\`
    This will create a target/ folder containing:
    - \`something.ts\` → TypeScript definitions for your program
    - \`something.json\` → IDL (Interface Definition Language) file describing your program's API

    ## 🚀 Step 3 — Deploy to Devnet
    Deploy with:
    \`\`\`bash
anchor deploy --provider.cluster devnet
    \`\`\`
    Anchor will:
    1. Upload your program to the Devnet cluster
    2. Assign it a **program ID**
    3. Make it ready for mission commands from your clients

    ## 🛰 Step 4 — Verify Your Deployment
    Once deployed, head to **explorer.solana.com**, switch to the Devnet network, and search for your program ID.
    If you see it there — congratulations, Cadet! You've successfully launched into the Devnet galaxy.

    **Launch Sequence: The Steps**
    You'll build and deploy your deployed program on Devnet. Let's blast off!
    `,
                objectives: [
                    'Build your smart contract using Anchor CLI',
                    'Deploy your program to Solana Devnet',
                    'Verify your deployment and explore it in the Solana Explorer',
                ],
                code: {
                    initial: `// 🚀 Mission: Deploy your Anchor program to Solana Devnet
    
    // Step 1: Build your program in the terminal using the Anchor CLI
    // TODO: Command to compile your code
    
    // Step 2: Deploy to Devnet (use the correct flag for cluster)
    // TODO: Command to deploy to Devnet, not localhost
    
    // Step 3: Find and verify your deployed Program ID
    // TODO: Command to discover your deployed program's address (hint: target/idl or Anchor.toml)
    
    // Step 4: (Bonus) Search your Program ID on explorer.solana.com for Devnet
    // TODO: No code—just explore!
    `,
                    solution: `// Terminal Commands:
    
    // Build your Anchor program
    anchor build
    
    // Deploy to Devnet (not localhost)
    anchor deploy --provider.cluster devnet
    
    // (Optional) Find your deployed Program ID
    cat target/idl/your_program.json
    
    // (Bonus) Visit https://explorer.solana.com/?cluster=devnet, search for your Program ID!
    `,
                    tests: [
                        {
                            name: 'Program compiles successfully',
                            description: 'anchor build completes with no errors and artifacts are created in /target',
                            check: 'anchor build completes and /target/ folder is populated',
                            points: 20,
                        },
                        {
                            name: 'Program deploys to Devnet',
                            description: 'anchor deploy --provider.cluster devnet completes, emitting a new Devnet program address',
                            check: 'Deployment log displays a program ID',
                            points: 30,
                        },
                        {
                            name: 'User can find deployed program ID',
                            description: 'cat target/idl/your_program.json shows the new programId',
                            check: 'Program ID is present in JSON and/or logs',
                            points: 20,
                        },
                        {
                            name: 'Explore program in Solana Explorer',
                            description: 'User can locate program ID on https://explorer.solana.com/?cluster=devnet and see live account/activity',
                            check: 'Explorer page loads and shows correct details',
                            points: 10,
                        }
                    ]
                },
                hints: [
                    'Use anchor build to compile your code before deploying.',
                    'Use anchor deploy --provider.cluster devnet to deploy specifically to Devnet (instead of localnet).',
                    'Your deployed program ID will be displayed in your terminal output and also in target/idl/your_program.json.',
                    'Open https://explorer.solana.com/?cluster=devnet and paste in your program ID to view it!',
                    'Check Anchor.toml for any custom cluster settings.',
                    'If you run out of “SOL” on Devnet, get more from a Solana faucet!',
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
                storyText: `
        **🪐 Navigating Restricted Star Systems — PDAs**
    Your next voyage takes you into restricted star systems, where only travelers with the right coordinates can dock.
    On Solana, these coordinates are called **Program Derived Addresses (PDAs)** —
    cryptographically secure, program-owned addresses you can **deterministically derive** using **seeds**.
    Unlike wallet addresses, PDAs have **no private keys**. They're generated and authorized by your program logic.
    
    ## ✨ Why PDAs Exist
    - **Security:** - Only your program can “sign” for PDAs. No private key exists to steal.
    - **Predictability:** - PDAs are derived from seeds. The same seeds will always generate the same PDA.
    - **Authorization:** - Only your program can create, update, or interact with PDA-owned accounts.

    ## 🧮 PDA Seeds Example
    In Anchor, you define a PDA like this:
\`\`\`rust
#[account(
    // Define the seeds used to derive the PDA
    seeds = [b"data", user.key().as_ref()],
    // Use the canonical bump (avoids collisions)
    bump,
)]
\`\`\`

    How it works:
    - \`b"data"\` → A constant "namespace" for this PDA
    - \`user.key().as_ref()\` → The public key of the user as part of the derivation
    - \`bump\` → An extra byte that ensures the PDA lands on a valid curve point
    
    Let's learn to generate these cosmic coordinates!
    `,
                objectives: [
                    'Understand Solana PDA (Program Derived Address) concepts',
                    'Use seeds (arrays of bytes) to deterministically derive account addresses in Anchor',
                    'Work with “bumps” for address validation and collision-resistance',
                ],
                code: {
                    initial: `// Mission: Create a Ship PDA for each explorer
    
    use anchor_lang::prelude::*;
    
    // TODO 1: Define the ShipState account (persistent data for each user's ship)
    // - ship name (String, max 32 chars)
    // - fuel (u64)
    
    // TODO 2: In the Initialize context, use #[account(init, ...)]
    // - seeds = [b"ship", user.key().as_ref()]
    // - bump to store bump seed
    // - payer = user, space = (discriminator + name + fuel)
    
    // TODO 3: Add user signer and system_program
    
    #[derive(Accounts)]
    pub struct Initialize<'info> {
      // Fill this out with Anchor PDA constraints!
    }
    `,
                    solution: `use anchor_lang::prelude::*;

#[account]
pub struct ShipState {
    pub name: String,    // 4 + 32 = 36 bytes (max 32 chars)
    pub fuel: u64,       // 8 bytes
}
// Space: 8 (discriminator) + 36 + 8 = 52 bytes

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 52, // 8 + 36 + 8 = 52 bytes
        seeds = [b"ship", user.key().as_ref()],
        bump,
    )]
    pub ship: Account<'info, ShipState>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}`,
                    tests: [
                        {
                            name: 'ShipState struct is defined properly',
                            description: 'ShipState uses a max-32 char String and u64 for fuel',
                            check: 'Correct field types and size calculation',
                            points: 10,
                        },
                        {
                            name: 'PDA initialization uses seeds and bump',
                            description: 'The account is initialized with seeds and bump in the context struct',
                            check: 'seeds = [b"ship", user.key().as_ref()], bump included',
                            points: 15,
                        },
                        {
                            name: 'Account space calculation is correct',
                            description: 'Total space matches size of fields plus 8 bytes discriminator',
                            check: 'space = 52 in #[account(init...)]',
                            points: 10,
                        },
                        {
                            name: 'User and system_program accounts included',
                            description: 'user is Signer<>, system_program is Program<> as required',
                            check: 'Both required accounts present in context',
                            points: 5,
                        },
                        {
                            name: 'Program compiles and PDA is deterministic',
                            description: 'Given same user and seeds, account address is always the same',
                            check: 'Determinism by seed and bump enforcement',
                            points: 10,
                        }
                    ]
                },
                hints: [
                    'Use seeds=[...] and bump to create a PDA (account address = deterministic function of seeds/program id).',
                    'Always sum up space: 8 bytes for the Anchor discriminator, 4 bytes for String length, plus max string length bytes.',
                    'bump is a special “nonce” for PDA creation; Anchor will enforce it.',
                    'user.key().as_ref() converts the pubkey into bytes for seeds.',
                    'system_program must always be passed for account creation.',
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
                storyText: `
                **🚀 Fueling Your Starship — SPL Tokens**

    Your starship can't travel far without fuel.
    On Solana, **SPL tokens** are your energy cells — fungible tokens that represent the resources and rewards powering the decentralized galaxy.
    With the **SPL Token Program** (and the mighty **Anchor SPL library**), you can mint, send, and track tokens exactly like any real Solana project.
    
    ## ⚡ SPL Token Components
    - 🔵 **Token Mint** - The origin of a new fungible token. (Think: your energy cell generator)
    - 💳 **Token Account (ATA)** - Holds the balance for a single user or address.
    - 🛡 **Authority** - The entity (or PDA) with permission to create new tokens.

    ## 🛰 Example: Anchor SPL Accounts
    \`\`\`rust
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct SplTokenExample<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,           // Token mint (must be mutable)
    
    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>, // Receiving token account (must be mutable)
    
    pub authority: Signer<'info>,             // Mint authority (must sign)
    
    pub token_program: Program<'info, Token>, // SPL Token program
}
    \`\`\`

    ## 🛠 Field Breakdown
    - \`mint\` → The mint address of the token you want to transfer or mint.
    - \`to_ata\` → The Associated Token Account (ATA) of the recipient.
    - \`authority\` → The wallet or PDA authorized to send or mint tokens (must sign the transaction).
    - \`token_program\` → The on-chain SPL Token program that executes the transfer or mint.
    
    You'll mint tokens, transfer them, and check balances, all using secure, ergonomic Anchor SPL patterns!
    `,
                objectives: [
                    'Understand how SPL token mints and token accounts work on Solana',
                    'Use Anchor SPL’s CPI instructions to mint and transfer tokens',
                    'Query and verify token account balances'
                ],
                code: {
                    initial: `// Mission: Mint cosmic fuel to a pilot's token account!
    
    use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo};
    
    // TODO 1: Define MintFuel context
    //  - mint: SPL Mint (mut), represents the fuel generator
    //  - to: TokenAccount (mut), account to receive tokens
    //  - authority: Signer, only mint authority can mint new tokens
    //  - token_program: Program<Token>, required for CPI
    
    // TODO 2: Write the mint_fuel instruction to mint tokens
    //  - Use Anchor SPL's token::mint_to
    //  - Create a CpiContext with all required accounts
    //  - Mint 1,000,000 tokens to the receiver
    
    #[derive(Accounts)]
    pub struct MintFuel<'info> {
        // Fill out account attributes!
    }
    
    // TODO 3: Implement mint_fuel handler
    //  - call token::mint_to() with a CpiContext and amount
    
    // (For extra exploration: try transferring tokens between accounts!)
    `,
                    solution: `use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo};
    
    #[derive(Accounts)]
    pub struct MintFuel<'info> {
        #[account(mut)]
        pub mint: Account<'info, Mint>,              // Token mint (must be mutable)
        #[account(mut)]
        pub to: Account<'info, TokenAccount>,        // Receiving token account (must be mutable)
        pub authority: Signer<'info>,                // The mint authority (must sign)
        pub token_program: Program<'info, Token>,    // Anchor SPL Token program
    }
    
    pub fn mint_fuel(ctx: Context<MintFuel>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.to.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            }
        );
        // Mint exactly 1,000,000 fuel tokens
        token::mint_to(cpi_ctx, 1_000_000)?;
        Ok(())
    }
    `,
                    tests: [
                        {
                            name: 'Calls MintTo CPI',
                            description: 'token::mint_to is called with correct accounts and amount.',
                            check: 'CpiContext includes mint, to, authority; amount is 1,000,000.',
                            points: 15,
                        },
                        {
                            name: 'User receives tokens after mint',
                            description: 'After instruction, the receiver token account’s balance increases by 1,000,000.',
                            check: 'Query token account and see balance updated.',
                            points: 20,
                        },
                        {
                            name: 'Only mint authority can mint',
                            description: 'If not signed by authority, transaction fails.',
                            check: 'Verify access restriction with test or simulation.',
                            points: 10,
                        },
                        {
                            name: 'Program compiles and runs',
                            description: 'All types and attributes correct; Anchor build/test passes.',
                            check: 'cargo build-bpf and anchor test pass.',
                            points: 10,
                        }
                    ]
                },
                hints: [
                    'For minting with Anchor SPL, always use token::mint_to with a proper CpiContext.',
                    'Your MintFuel context must pass in the Mint account, TokenAccount (recipient), authority (must be the mint’s authority!), and the Token program.',
                    '#[account(mut)] is needed on accounts that change (mint, to).',
                    'Check the SPL Mint’s authority before calling—must be the correct signer!',
                    'Try printing balances to check that minting worked!'
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
                storyText: `
                📡 **Interstellar Communication — Cross-Program Invocations (CPI)**

    Your ship is now equipped for interstellar communication!
    With **Cross-Program Invocations (CPI)**, your program can call another on-chain program—unlocking next-generation composability on Solana.
    Think of CPI as using your ship's comms system to request help from another station—securely and instantly, without ever leaving orbit.

    ## 🚀 Why CPI Matters
    - 🔗 Composability: Call into system programs or other Anchor contracts.
    - 🛡 Security: Execute calls atomically—either everything succeeds, or nothing does.
    - 🌌 Real-world use case: Transferring SPL tokens using the SPL Token Program.

    ## CPI in Anchor
    Anchor provides the CpiContext helper to set up the CPI call, including:
    - The **destination program**
    - All **required accounts**
    - Optional **signers** (for PDA authority)

    **CPI Without Signer**
    When your program doesn't need to prove authority over the source account, simply pass the required accounts:
    \`\`\`rust
pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
    let from_pubkey = ctx.accounts.sender.to_account_info();
    let to_pubkey = ctx.accounts.recipient.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();

    let cpi_context = CpiContext::new(
        program_id,
        Transfer {
            from: from_pubkey,
            to: to_pubkey,
        },
    );

    transfer(cpi_context, amount)?;
    Ok(())
}
    \`\`\`

    **CPI With Signer (PDA Authority)**
    When your program must sign using a Program Derived Address (PDA), use .with_signer:
    \`\`\`rust
pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
    let from_pubkey = ctx.accounts.pda_account.to_account_info();
    let to_pubkey = ctx.accounts.recipient.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();

    let seed = to_pubkey.key();
    let bump_seed = ctx.bumps.pda_account;
    let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];

    let cpi_context = CpiContext::new(
        program_id,
        Transfer {
            from: from_pubkey,
            to: to_pubkey,
        },
    )
    .with_signer(signer_seeds);

    transfer(cpi_context, amount)?;
    Ok(())
}
    \`\`\`
    
    ## 🛰 How CPI Works in Anchor
    - \`CpiContext\` → Bundles the destination program, accounts, and optional signers.
    - **Anchor SPL** → Includes pre-built CPI wrappers (e.g., \`transfer\`, \`mint_to\`) for common programs like SPL Token.
    - **Accounts** → You must provide all accounts required by the target program.
    
    Let's use CPI to relay a "fuel transfer" between two token accounts using the SPL Token program!
    `,
                objectives: [
                    'Understand how CPIs allow interaction with other Solana programs',
                    'Set up Anchor contexts for cross-program CPI calls',
                    'Correctly pass required accounts and data for an SPL token transfer',
                ],
                code: {
                    initial: `// Mission: Relay a fuel (token) transfer using CPI!
    
    use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Token, TokenAccount, Transfer};
    
    // TODO 1: Define the context for relay_transfer
    //   - from: TokenAccount (mut)
    //   - to: TokenAccount (mut)
    //   - authority: Signer (must match 'from' account's authority)
    //   - token_program: Program<Token>
    
    // TODO 2: Write the relay_transfer instruction to move tokens via CPI
    //   - Use token::transfer from Anchor SPL
    //   - Pass in CpiContext with all required accounts
    //   - Param: amount (u64)
    
    #[derive(Accounts)]
    pub struct RelayTransfer<'info> {
        // Fill out attributes for all accounts!
    }
    
    // TODO: Implement relay_transfer(ctx, amount)
    
    `,
                    solution: `use anchor_lang::prelude::*;
    use anchor_spl::token::{self, Token, TokenAccount, Transfer};
    
    #[derive(Accounts)]
    pub struct RelayTransfer<'info> {
        #[account(mut)]
        pub from: Account<'info, TokenAccount>,   // Source (must be mutable)
        #[account(mut)]
        pub to: Account<'info, TokenAccount>,     // Destination (must be mutable)
        pub authority: Signer<'info>,             // Signer for 'from' account
        pub token_program: Program<'info, Token>, // Token program for CPI
    }
    
    pub fn relay_transfer(ctx: Context<RelayTransfer>, amount: u64) -> Result<()> {
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
                        {
                            name: 'Transfer CPI is called',
                            description: 'Uses token::transfer with proper CpiContext.',
                            check: 'transfer instruction includes from, to, authority, and token_program.',
                            points: 15,
                        },
                        {
                            name: 'Tokens move from sender to receiver',
                            description: 'Sender’s balance decreases and receiver’s increases by the correct amount.',
                            check: 'Token balance checks after transfer.',
                            points: 20,
                        },
                        {
                            name: 'Only authority can approve transfer',
                            description: 'Authority must match and sign; otherwise, tx fails.',
                            check: 'Test with wrong signer fails.',
                            points: 10,
                        },
                        {
                            name: 'Program compiles and runs',
                            description: 'Build and anchor test succeed.',
                            check: 'cargo build-bpf and anchor test pass.',
                            points: 10,
                        }
                    ]
                },
                hints: [
                    'The relay_transfer context must include #[account(mut)] on both from and to accounts.',
                    'authority must be a Signer and must match the from TokenAccount’s authority.',
                    'token_program is always required for SPL Token CPIs.',
                    'CpiContext::new takes the program, account structs, and wraps everything for a secure invocation.',
                    'Always test balances before and after to confirm the transfer worked!',
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
            storyText: `
            🛡 **Access Control — Only the Captain at the Helm**

        Welcome aboard, Commander!
        Your starship's critical systems—like navigation, shields, and warp drive—must only be accessible to **authorized crew members**.
        On Solana, **Anchor** provides powerful **access control via account constraints** so you can precisely enforce **who** can call **which** instructions.

        🔑 **Example: has_one Constraint**
        \`\`\`rust
#[account(has_one = target)]
        \`\`\`
        **Description:** Checks that the \`target\` field on an account matches the public key of the \`target\` account provided in your \`Accounts\` struct.

        📦 Basic Access Control with Signer
        \`\`\`rust
#[derive(Accounts)]
pub struct SomeThing<'info> {
    pub authority: Signer<'info>, // Must sign the transaction
}
        \`\`\`
      
      ## Key Access Control Patterns
      - \`has_one\` **constraint** → Ensures a field in one account equals the key of another account.
      - \`Signer\` **constraint** → Requires the account to sign the transaction, proving authority.
      - **Combination** → Together, they guarantee only the authorized captain can modify ship state.
      
      Let's write an instruction that **only the captain can call** to boost the ship's shields to maximum strength!
      `,
            objectives: [
              'Use Anchor #[account()] constraints to enforce ownership and authority',
              'Implement checks that only the designated captain can call sensitive instructions',
              'Learn how constraints protect on-chain security by verifying relationships and signatures',
            ],
            code: {
              initial: `// Mission: Protect the ship by allowing only the captain to boost shields
      
      #[derive(Accounts)]
      pub struct CaptainAccess<'info> {
          // TODO 1: The ship account (mutable) must have 'captain' field matching the 'captain' signer
          pub ship: Account<'info, ShipState>,
          // TODO 2: The captain must be a signer of the transaction
          pub captain: Signer<'info>,
      }
      
      #[account]
      pub struct ShipState {
          // TODO 3: Store the captain's Pubkey
          pub captain: Pubkey,
          // TODO 4: Store shield strength as u16
          pub shield: u16,
      }
      
      // TODO 5: Write the boost_shields instruction
      // - Takes Context<CaptainAccess>
      // - Sets shield to 1000
      // - Returns Ok(())
      `,
              solution: `pub fn boost_shields(ctx: Context<CaptainAccess>) -> Result<()> {
          let ship = &mut ctx.accounts.ship;
          ship.shield = 1000;
          Ok(())
      }
      
      #[derive(Accounts)]
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
      `,
              tests: [
                {
                  name: 'Captain can call boost_shields',
                  description: 'The designated captain successfully invokes boost_shields and updates shield',
                  check: 'ship.shield == 1000 after call by captain',
                  points: 15,
                },
                {
                  name: 'Non-captain cannot call boost_shields',
                  description: 'Calls from other signers fail due to has_one or signer constraint violation',
                  check: 'Transaction fails if signer differs from ship.captain',
                  points: 15,
                },
                {
                  name: 'Shield value updates correctly',
                  description: 'The ship’s shield value changes exactly to 1000 on successful call',
                  check: 'ship.shield == 1000 in account state',
                  points: 10,
                },
              ],
            },
            hints: [
              'Use #[account(mut, has_one = captain)] to enforce ship.captain == captain.key()',
              'Ensure captain account is annotated with Signer for signature verification',
              'The instruction requires mutable access to modify ship.shield',
            ],
            completed: false,
            locked: false,
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
            storyText: `
            🚨 **Gravitational Anomaly Detected!**

        Your starship has been pulled into a strange gravitational field! At first glance, the fuel system code looks perfectly fine — yet, mysteriously, your ship's fuel gauge refuses to rise.
        Time to suit up and enter **debugging mode** to locate and fix the issue before the anomaly swallows us whole!
        \`\`\`rust
let mut x = 10;
x += 10;
println!("{}", x); // outputs 20
        \`\`\`

        ## 🛠 Common Debugging Tips
        - Use **mutable references**: Make sure you have a mutable reference to the account before modifying its fields. Without \`mut\`, your changes won't stick.
        - Assign values back: Writing something like \`ship.fuel + amount;\` won't change the value — you must assign it:
        - Read the signs: Anchor error messages and Solana program logs are your navigational beacons — use them to pinpoint the problem fast.

        Remember, in space (and in code), **changes don't** happen unless you commit them to state.
      `,
            objectives: [
              'Spot and fix logic errors related to state mutation',
              'Use mutable references properly in Anchor instructions',
              'Test changes to confirm fuel value updates correctly on-chain'
            ],
            code: {
              initial: `// Mission: Fix the fuel update bug in this Anchor program
      
      #[derive(Accounts)]
      pub struct IncreaseFuel<'info> {
          // TODO 1: Mark the ship account as mutable to allow changes
          pub ship: Account<'info, ShipState>,
      
          // TODO 2: Pilot must sign the transaction
          pub pilot: Signer<'info>,
      }
      
      #[account]
      pub struct ShipState {
          // TODO 3: Store ship's fuel as a u64 integer
          pub fuel: u64,
      }
      
      pub fn refuel(ctx: Context<IncreaseFuel>, amount: u64) -> Result<()> {
          // TODO 4: Get a mutable reference to the ship account
          let ship = &ctx.accounts.ship;
      
          // TODO 5: Properly increment the ship's fuel by amount
          ship.fuel + amount;
      
          Ok(())
      }
      
      // Question: Why doesn't the fuel increase? What needs to be fixed to update the fuel on-chain?
      `,
              solution: `// Fixed version of the refuel instruction
      
      pub fn refuel(ctx: Context<IncreaseFuel>, amount: u64) -> Result<()> {
          // Correctly get a mutable reference to the ship account
          let ship = &mut ctx.accounts.ship;
      
          // Properly update the fuel value with assignment
          ship.fuel += amount;
      
          Ok(())
      }
      `,
              tests: [
                {
                  name: 'Fuel increases and persists on-chain',
                  description: 'After calling refuel, the ship.fuel field must increase by the given amount and stay updated.',
                  check: 'Validate that the updated fuel value matches expected result',
                  points: 15
                },
                {
                  name: 'No runtime errors during execution',
                  description: 'The program runs successfully with no panics or data violation errors.',
                  check: 'Program passes without errors on transaction',
                  points: 10
                },
                {
                  name: 'Mutable reference required for state changes',
                  description: 'The ship account must be mutable and accessed mutably to allow updates.',
                  check: 'Compiler or runtime errors happen if ship is not mutable',
                  points: 10
                }
              ]
            },
            hints: [
              'Use `&mut` to get a mutable reference to the ship account inside the instruction.',
              'Remember to assign the incremented value back: `ship.fuel += amount;` not just `ship.fuel + amount;`',
              'Mark accounts that you intend to modify with `#[account(mut)]`.',
              'Confirm your transaction logs to see state changes going through.'
            ],
            completed: false,
            locked: false
          }
        ]
    },
//     {
//         id: 'final-mission',
//         title: 'Final Mission (Build-a-DApp)',
//         description: 'Your ultimate challenge: build and launch your own Solana app!',
//         icon: '🏁',
//         color: 'bg-gradient-mission',
//         completed: false,
//         lessons: [
//           {
//             id: 'build-final-dapp',
//             title: 'Command the Cosmos (Your DApp Mission)',
//             description: 'Plan and build your own Anchor-powered DApp!',
//             chapter: 11,
//             order: 1,
//             difficulty: 'advanced',
//             estimatedTime: 180,
//             storyText: `
//       Captain, your training is complete and the galaxy awaits your innovation! 🚀
      
//       Your final mission is a test of all your skills: design and build a real **Anchor-powered DApp** that solves a problem or serves a need for explorers across Solana’s universe.
      
//       It could be anything: a token vending machine, NFT mint pass, decentralized voting system, or something uniquely yours!
      
//       ---
      
//       ## How to Approach This Mission
      
//       1. **Design your program:** Plan your accounts, instructions, and how users will interact.
      
//       2. **Build your Rust program:** Use Anchor framework patterns you've mastered — with accounts, constraints, error handling, and instructions.
      
//       3. **Write client-side tests:** Use TypeScript to automate key tests with Anchor’s testing utilities.
      
//       4. **Deploy & demo:** Launch your program on Devnet, verify it works, and prepare to present your creation!
      
//       ---
      
//       Don’t worry — simplicity is strength. A single well-built instruction or account can be a powerful solution.
      
//       Most importantly, this mission is about **applying what you’ve learned** — so be creative and ambitious!
//       `,
//             objectives: [
//               'Design a Solana DApp with clear accounts and instruction flows',
//               'Implement a functional Anchor Rust program with proper constraints and logic',
//               'Write at least one automated TypeScript test exercising core functionality',
//               'Deploy your program to Devnet and prove it works in a live environment',
//               'Prepare a short presentation of your DApp’s purpose and capabilities'
//             ],
//             code: {
//               initial: `// Mission Commander: Time to lead this mission yourself!
//       // Start here by planning your Anchor program architecture:
//       //
//       // 1. Define your account data structures with #[account] and necessary fields
//       // 2. Write instructions with proper context structs and validation
//       // 3. Use Anchor macros for security: #[account(mut)], has_one, signers, etc.
//       // 4. Write TypeScript tests to call your instructions and verify behavior
//       //
//       // Example ideas to spark your creativity:
//       // - Token vending machine with payments & minting
//       // - On-chain voting with tally and status tracking
//       // - NFT mint pass with access controls
//       //
//       // Your code and tests will show your mastery!`,
//               solution: `// Terminal Commands for Devnet Deployment:

// // 1. Build your Anchor program
// anchor build

// // 2. Deploy to Devnet (not localhost)
// anchor deploy --provider.cluster devnet

// // 3. Find your deployed Program ID
// cat target/idl/your_program.json | grep "programId"
// // OR check your program's keypair file:
// cat target/deploy/your_program-keypair.json

// // 4. Verify on Solana Explorer
// // Visit: https://explorer.solana.com/?cluster=devnet
// // Search for your Program ID

// // Example successful deployment output:
// // Program Id: 7X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X

// // NOTE: Make sure you have Devnet SOL in your wallet:
// // solana airdrop 2 --url devnet

// // Your DApp code example:
// use anchor_lang::prelude::*;

// declare_id!("11111111111111111111111111111111");

// #[program]
// pub mod my_dapp {
//     use super::*;
    
//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         let account = &mut ctx.accounts.my_account;
//         account.data = 42;
//         msg!("DApp initialized successfully!");
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(init, payer = user, space = 8 + 8)]
//     pub my_account: Account<'info, MyAccount>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[account]
// pub struct MyAccount {
//     pub data: u64,
// }`,
//               tests: [
//                 {
//                   name: 'Have at least one passing test suite',
//                   description: 'Your project includes automated tests that run and pass on Anchor test framework.',
//                   check: 'Tests successfully call at least one program instruction and verify results.',
//                   points: 40
//                 },
//                 {
//                   name: 'Deployed program on Devnet',
//                   description: 'Successfully deploy your Anchor program to Solana Devnet and show the live Program ID.',
//                   check: 'Deployment completes, and you can interact with your deployed program on Devnet.',
//                   points: 30
//                 },
//                 {
//                   name: 'Present your concept and code',
//                   description: 'Prepare a summary of your program’s purpose, key features, and architecture.',
//                   check: 'Clear documentation or presentation including code snippets or screenshots.',
//                   points: 30
//                 }
//               ]
//             },
//             hints: [
//               'Start small — it’s okay to build one instruction or account that shows your idea.',
//               'Use Anchor’s #[account] constraints to keep your program secure and organized.',
//               'TypeScript tests are your safety net — write at least one to automate verification.',
//               'Use the Anchor CLI extensively: build, test, and deploy your program confidently.',
//               'Ask mentors or community members for feedback as you build.',
//               'Keep your DApp focused — well-designed small solutions are better than overly large incomplete projects.'
//             ],
//             completed: false,
//             locked: false
//           }
//         ]
//       }
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
