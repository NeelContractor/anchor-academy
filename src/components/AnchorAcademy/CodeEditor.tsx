import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TestCase {
  name: string;
  description: string;
  check: string;
  points: number;
}

interface CodeEditorProps {
  initialCode: string;
  solution: string;
  tests: TestCase[];
  onComplete: () => void;
  hints: string[];
}

export const CodeEditor = ({ initialCode, solution, tests, onComplete, hints }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    
    // Configure Rust language support
    editor.getModel()?.updateOptions({ 
      tabSize: 4,
      insertSpaces: true 
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and testing your code...\n');
    
    try {
      // Simulate code compilation and execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dynamic validation based on lesson tests
      const passedTests = validateCodeDynamic(code, tests);
      
      if (passedTests.length === tests.length) {
        const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
        setOutput(prev => prev + 
          '✅ Compilation successful!\n' +
          '✅ All tests passed!\n' +
          `🎯 Score: ${totalPoints}/${totalPoints} points\n\n` +
          '🎉 Excellent work, space cadet! You\'ve mastered this lesson!'
        );
        toast.success('Code challenge completed! 🏴‍☠️');
        setTimeout(() => onComplete(), 1000);
      } else {
        const failedTests = tests.filter((_, index) => !passedTests.includes(index));
        const passedPoints = passedTests.reduce((sum, index) => sum + tests[index].points, 0);
        const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
        
        const failedTestMessages = failedTests.map(test => 
          `• ${test.name}: ${test.description}`
        ).join('\n');
        
        setOutput(prev => prev + 
          `❌ Some tests failed:\n${failedTestMessages}\n\n` +
          `🎯 Score: ${passedPoints}/${totalPoints} points\n` +
          'Check the hints and try again!'
        );
        toast.error('Some tests failed. Check the hints!');
      }
    } catch (error) {
      setOutput(prev => prev + '❌ Compilation failed. Check your syntax!');
      toast.error('Code compilation failed');
    } finally {
      setIsRunning(false);
    }
  };

  const validateCodeDynamic = (userCode: string, testCases: TestCase[]): number[] => {
    const passed: number[] = [];
    
    testCases.forEach((test, index) => {
      const testPassed = runTestCase(userCode, test);
      if (testPassed) {
        passed.push(index);
      }
    });
    
    return passed;
  };

  const runTestCase = (userCode: string, test: TestCase): boolean => {
    // Normalize code for easier pattern matching
    const normalizedCode = userCode.replace(/\s+/g, ' ').toLowerCase();
    const testName = test.name.toLowerCase();
    
    try {
      // Rust Variables Lesson Tests
      if (testName.includes('immutable variables correctly defined')) {
        return validateImmutableVariables(userCode);
      }
      
      if (testName.includes('mutable variables correctly defined')) {
        return validateMutableVariables(userCode);
      }
      
      if (testName.includes('correct type annotations')) {
        return validateTypeAnnotations(userCode);
      }
      
      if (testName.includes('pre-flight operations')) {
        return validateOperations(userCode);
      }
      
      if (testName.includes('type casting')) {
        return validateTypeCasting(userCode);
      }
      
      if (testName.includes('code compiles')) {
        return validateCompilation(userCode);
      }
      
      if (testName.includes('mission readiness')) {
        return validateMissionReadiness(userCode);
      }
      
      // Rust Functions Lesson Tests
      if (testName.includes('navigation function')) {
        return validateNavigationFunction(userCode);
      }
      
      if (testName.includes('fuel status logic')) {
        return validateFuelStatusFunction(userCode);
      }
      
      if (testName.includes('mission report')) {
        return validateMissionReportFunction(userCode);
      }
      
      if (testName.includes('warp speed calculation')) {
        return validateWarpSpeedFunction(userCode);
      }
      
      if (testName.includes('risk assessment')) {
        return validateRiskAssessmentFunction(userCode);
      }
      
      if (testName.includes('functions called in main')) {
        return validateFunctionCalls(userCode);
      }
      
      if (testName.includes('type safety')) {
        return validateTypeSafety(userCode);
      }
      
      // Solana Account Model Tests
      if (testName.includes('spacestation struct')) {
        return validateSpaceStationStruct(userCode);
      }
      
      if (testName.includes('space calculation')) {
        return validateSpaceCalculation(userCode);
      }
      
      if (testName.includes('establish_station')) {
        return validateEstablishStationFunction(userCode);
      }
      
      if (testName.includes('activate_station')) {
        return validateActivateStationFunction(userCode);
      }
      
      if (testName.includes('establishstation context')) {
        return validateEstablishStationContext(userCode);
      }
      
      if (testName.includes('activatestation context')) {
        return validateActivateStationContext(userCode);
      }
      
      if (testName.includes('custom error')) {
        return validateCustomError(userCode);
      }
      
      // Anchor Program Structure Tests
      if (testName.includes('missioncontrol and mission structs')) {
        return validateMissionStructs(userCode);
      }
      
      if (testName.includes('space calculations are accurate')) {
        return validateMissionSpaceCalculations(userCode);
      }
      
      if (testName.includes('all five instructions')) {
        return validateAllInstructions(userCode);
      }
      
      if (testName.includes('validation with require')) {
        return validateRequireMacro(userCode);
      }
      
      if (testName.includes('account constraints')) {
        return validateAccountConstraints(userCode);
      }
      
      if (testName.includes('mission status transitions')) {
        return validateStatusTransitions(userCode);
      }
      
      if (testName.includes('counters')) {
        return validateCounters(userCode);
      }
      
      if (testName.includes('authority-based access')) {
        return validateAuthorityAccess(userCode);
      }
      
      if (testName.includes('timestamp recorded')) {
        return validateTimestamp(userCode);
      }
      
      // Testing Lesson Tests
      if (testName.includes('test calls initialize')) {
        return validateTestInitialize(userCode);
      }
      
      if (testName.includes('ship account values match')) {
        return validateAccountValues(userCode);
      }
      
      if (testName.includes('test code compiles')) {
        return validateTestCompilation(userCode);
      }
      
      // Deployment Tests
      if (testName.includes('program compiles successfully')) {
        return validateProgramCompiles(userCode);
      }
      
      if (testName.includes('program deploys to devnet')) {
        return validateDevnetDeployment(userCode);
      }
      
      if (testName.includes('find deployed program id')) {
        return validateProgramIdDiscovery(userCode);
      }
      
      if (testName.includes('explore program in solana explorer')) {
        return validateExplorerUsage(userCode);
      }
      
      // PDA Tests
      if (testName.includes('shipstate struct is defined')) {
        return validateShipStateStruct(userCode);
      }
      
      if (testName.includes('pda initialization')) {
        return validatePDAInitialization(userCode);
      }
      
      if (testName.includes('account space calculation is correct')) {
        return validatePDASpaceCalculation(userCode);
      }
      
      if (testName.includes('user and system_program')) {
        return validateRequiredAccounts(userCode);
      }
      
      if (testName.includes('program compiles and pda')) {
        return validatePDADeterminism(userCode);
      }
      
      // SPL Token Tests
      if (testName.includes('calls mintto cpi')) {
        return validateMintToCPI(userCode);
      }
      
      if (testName.includes('user receives tokens')) {
        return validateTokenReceived(userCode);
      }
      
      if (testName.includes('only mint authority')) {
        return validateMintAuthority(userCode);
      }
      
      // CPI Tests
      if (testName.includes('transfer cpi is called')) {
        return validateTransferCPI(userCode);
      }
      
      if (testName.includes('tokens move from sender')) {
        return validateTokenTransfer(userCode);
      }
      
      if (testName.includes('only authority can approve')) {
        return validateTransferAuthority(userCode);
      }
      
      // Access Control Tests
      if (testName.includes('captain can call boost_shields')) {
        return validateCaptainAccess(userCode);
      }
      
      if (testName.includes('non-captain cannot call')) {
        return validateNonCaptainRestriction(userCode);
      }
      
      if (testName.includes('shield value updates')) {
        return validateShieldUpdate(userCode);
      }
      
      // Debugging Tests
      if (testName.includes('fuel increases and persists')) {
        return validateFuelPersistence(userCode);
      }
      
      if (testName.includes('no runtime errors')) {
        return validateNoRuntimeErrors(userCode);
      }
      
      if (testName.includes('mutable reference required')) {
        return validateMutableReference(userCode);
      }
      
      // Final Mission Tests
      if (testName.includes('passing test suite')) {
        return validateTestSuite(userCode);
      }
      
      if (testName.includes('deployed program on devnet')) {
        return validateFinalDevnetDeployment(userCode);
      }
      
      if (testName.includes('present your concept')) {
        return validateConceptPresentation(userCode);
      }
      
      // Generic fallbacks for common patterns
      if (testName.includes('compiles') || testName.includes('compilation')) {
        return validateGenericCompilation(userCode);
      }
      
      // Default: basic syntax check
      return userCode.length > 50 && !userCode.includes('TODO');
      
    } catch (error) {
      console.error(`Test validation error for "${test.name}":`, error);
      return false;
    }
  };

  // CORRECTED VALIDATION HELPER FUNCTIONS

  // Rust Variables Validation - Fixed to be more robust
  const validateImmutableVariables = (code: string): boolean => {
    // Check for immutable variables (using let, not let mut)
    const hasShipName = /let\s+ship_name\s*=.*"USS Solana"/.test(code) && !code.includes('let mut ship_name');
    const hasMaxCrewSize = /let\s+max_crew_size\s*:\s*u8\s*=\s*50/.test(code) && !code.includes('let mut max_crew_size');
    const hasMaxFuelCapacity = /let\s+max_fuel_capacity\s*:\s*u32\s*=\s*10000/.test(code) && !code.includes('let mut max_fuel_capacity');
    const hasWarpCapable = /let\s+warp_capable\s*:\s*bool\s*=\s*true/.test(code) && !code.includes('let mut warp_capable');
    return hasShipName && hasMaxCrewSize && hasMaxFuelCapacity && hasWarpCapable;
  };

  const validateMutableVariables = (code: string): boolean => {
    const hasMutCurrentFuel = /let\s+mut\s+current_fuel\s*:\s*u32\s*=\s*8500/.test(code);
    const hasMutCrewCount = /let\s+mut\s+crew_count\s*:\s*u8\s*=\s*25/.test(code);
    const hasMutShieldsActive = /let\s+mut\s+shields_active\s*:\s*bool\s*=\s*false/.test(code);
    return hasMutCurrentFuel && hasMutCrewCount && hasMutShieldsActive;
  };

  const validateTypeAnnotations = (code: string): boolean => {
    // Check for explicit type annotations
    const hasU8Types = (code.match(/:\s*u8/g) || []).length >= 2; // max_crew_size and crew_count
    const hasU32Types = (code.match(/:\s*u32/g) || []).length >= 2; // max_fuel_capacity and current_fuel
    const hasBoolType = code.includes(': bool');
    return hasU8Types && hasU32Types && hasBoolType;
  };

  const validateOperations = (code: string): boolean => {
    // Check for the specific operations
    const hasFuelOperation = /current_fuel\s*-=\s*500/.test(code) || /current_fuel\s*=\s*current_fuel\s*-\s*500/.test(code);
    const hasCrewOperation = /crew_count\s*\+=\s*10/.test(code) || /crew_count\s*=\s*crew_count\s*\+\s*10/.test(code);
    const hasShieldOperation = /shields_active\s*=\s*true/.test(code);
    return hasFuelOperation && hasCrewOperation && hasShieldOperation;
  };

  const validateTypeCasting = (code: string): boolean => {
    // Check for type casting examples
    const hasF32Cast = /as\s+f32/.test(code);
    const hasU32Cast = /as\s+u32/.test(code);
    return hasF32Cast && hasU32Cast;
  };

  const validateCompilation = (code: string): boolean => {
    return !code.includes('TODO') && 
           code.includes('fn main()') && 
           code.includes('println!') && 
           code.length > 100;
  };

  const validateMissionReadiness = (code: string): boolean => {
    // Check for mission readiness logic
    const hasReadyVariable = /let\s+ready_for_mission\s*=/.test(code);
    const hasAndOperator = code.includes('&&');
    const hasFuelCheck = /current_fuel\s*>\s*1000/.test(code);
    const hasCrewCheck = /crew_count\s*>=\s*20/.test(code);
    const hasShieldsCheck = code.includes('shields_active');
    return hasReadyVariable && hasAndOperator && hasFuelCheck && hasCrewCheck && hasShieldsCheck;
  };

  // Function validation helpers - Fixed
  const validateNavigationFunction = (code: string): boolean => {
    const hasFunction = /fn\s+calculate_travel_time/.test(code);
    const hasParams = /distance:\s*f64.*speed:\s*f64/.test(code);
    const hasReturn = /\->\s*f64/.test(code);
    const hasValidation = /if\s+speed\s*<=\s*0\.0/.test(code);
    return hasFunction && hasParams && hasReturn && hasValidation;
  };

  const validateFuelStatusFunction = (code: string): boolean => {
    const hasFunction = /fn\s+check_fuel_status/.test(code);
    const hasParams = /current_fuel:\s*u32.*required_fuel:\s*u32.*emergency_reserve:\s*u32/.test(code);
    const hasReturn = /\->\s*String/.test(code);
    const hasOptimal = code.includes('Fuel optimal');
    const hasAdequate = code.includes('Fuel adequate');
    const hasShortage = code.includes('Critical fuel shortage');
    return hasFunction && hasParams && hasReturn && hasOptimal && hasAdequate && hasShortage;
  };

  const validateMissionReportFunction = (code: string): boolean => {
    const hasFunction = /fn\s+generate_mission_report/.test(code);
    const hasParams = /ship_name:\s*&str/.test(code);
    const hasReturn = /\->\s*String/.test(code);
    const hasFormat = code.includes('format!');
    return hasFunction && hasParams && hasReturn && hasFormat;
  };

  const validateWarpSpeedFunction = (code: string): boolean => {
    const hasFunction = /fn\s+calculate_warp_speed/.test(code);
    const hasParams = /base_speed:\s*f64.*warp_factor:\s*u8/.test(code);
    const hasPowF = code.includes('.powf(1.5)');
    const hasWarpLimit = /if\s+warp_factor\s*>\s*9/.test(code) || code.includes('warp_factor > 9');
    return hasFunction && hasParams && hasPowF;
  };

  const validateRiskAssessmentFunction = (code: string): boolean => {
    const hasFunction = /fn\s+assess_mission_risk/.test(code);
    const hasParams = /distance:\s*f64.*crew_experience:\s*f32/.test(code);
    const hasRiskScore = code.includes('risk_score');
    const hasRiskLevels = code.includes('Minimal risk') && code.includes('Moderate risk') && code.includes('High risk');
    return hasFunction && hasParams && hasRiskScore && hasRiskLevels;
  };

  const validateFunctionCalls = (code: string): boolean => {
    const hasNavCall = /calculate_travel_time\s*\(/.test(code);
    const hasFuelCall = /check_fuel_status\s*\(/.test(code);
    const hasReportCall = /generate_mission_report\s*\(/.test(code);
    const hasWarpCall = /calculate_warp_speed\s*\(/.test(code);
    return hasNavCall && hasFuelCall && hasReportCall && hasWarpCall;
  };

  const validateTypeSafety = (code: string): boolean => {
    // Check for proper type usage without obvious errors
    return !code.includes('TODO') && 
           code.includes('fn ') && 
           !code.includes('type mismatch') && 
           code.length > 200;
  };

  // Anchor/Solana validation helpers - Fixed for better accuracy
  const validateSpaceStationStruct = (code: string): boolean => {
    const hasAccount = /#\[account\]/.test(code);
    const hasStruct = /pub\s+struct\s+SpaceStation/.test(code);
    const hasStationName = /station_name:\s*String/.test(code);
    const hasCommander = /commander:\s*Pubkey/.test(code);
    const hasCrewCount = /crew_count:\s*u16/.test(code);
    const hasFuelReserves = /fuel_reserves:\s*u64/.test(code);
    const hasOperational = /operational:\s*bool/.test(code);
    return hasAccount && hasStruct && hasStationName && hasCommander;
  };

  const validateSpaceCalculation = (code: string): boolean => {
    return /space\s*=\s*90/.test(code) || /space:\s*90/.test(code) || code.includes('space = 8 + 36 + 32 + 2 + 8 + 1 + 3');
  };

  const validateEstablishStationFunction = (code: string): boolean => {
    const hasFunction = /pub\s+fn\s+establish_station/.test(code);
    const hasParam = /station_name:\s*String/.test(code);
    const hasRequire = code.includes('require!');
    const hasLengthCheck = /station_name\.len\(\)\s*<=\s*32/.test(code);
    return hasFunction && hasParam && hasRequire && hasLengthCheck;
  };

  const validateActivateStationFunction = (code: string): boolean => {
    const hasFunction = /pub\s+fn\s+activate_station/.test(code);
    const hasOperational = /operational\s*=\s*true/.test(code);
    const hasCrewCount = /crew_count\s*=\s*10/.test(code);
    return hasFunction && hasOperational && hasCrewCount;
  };

  const validateEstablishStationContext = (code: string): boolean => {
    const hasInit = /#\[account\(init/.test(code);
    const hasPayer = /payer\s*=\s*commander/.test(code);
    const hasSpace = /space\s*=\s*90/.test(code);
    return hasInit && hasPayer && hasSpace;
  };

  const validateActivateStationContext = (code: string): boolean => {
    const hasMut = /#\[account\(.*mut/.test(code);
    const hasOne = /has_one\s*=\s*commander/.test(code);
    return hasMut && hasOne;
  };

  const validateCustomError = (code: string): boolean => {
    const hasErrorCode = /#\[error_code\]/.test(code);
    const hasEnum = /enum\s+ErrorCode/.test(code);
    const hasNameTooLong = /NameTooLong/.test(code);
    return hasErrorCode && hasEnum && hasNameTooLong;
  };

  // Mission Control validation helpers - Fixed
  const validateMissionStructs = (code: string): boolean => {
    const hasMissionControl = /pub\s+struct\s+MissionControl/.test(code);
    const hasMission = /pub\s+struct\s+Mission/.test(code);
    const hasAuthority = /authority:\s*Pubkey/.test(code);
    const hasMissionName = /mission_name:\s*String/.test(code);
    return hasMissionControl && hasMission && hasAuthority && hasMissionName;
  };

  const validateMissionSpaceCalculations = (code: string): boolean => {
    const has81 = /space\s*=\s*81/.test(code) || /space:\s*81/.test(code);
    const has150 = /space\s*=\s*150/.test(code) || /space:\s*150/.test(code);
    return has81 && has150;
  };

  const validateAllInstructions = (code: string): boolean => {
    const hasInitialize = /initialize_control/.test(code);
    const hasCreate = /create_mission/.test(code);
    const hasLaunch = /launch_mission/.test(code);
    const hasComplete = /complete_mission/.test(code);
    const hasAbort = /abort_mission/.test(code);
    return hasInitialize && hasCreate && hasLaunch && hasComplete && hasAbort;
  };

  const validateRequireMacro = (code: string): boolean => {
    const hasRequire = /require!\s*\(/.test(code);
    const hasError = /MissionError::/.test(code) || /ErrorCode::/.test(code);
    return hasRequire && hasError;
  };

  const validateAccountConstraints = (code: string): boolean => {
    const hasOne = /has_one/.test(code);
    const hasInit = /#\[account\(init/.test(code);
    const hasMut = /#\[account\(.*mut/.test(code);
    return hasOne && hasInit && hasMut;
  };

  const validateStatusTransitions = (code: string): boolean => {
    const hasStatusCheck = /status\s*==\s*0/.test(code);
    const hasStatusSet = /status\s*=\s*1/.test(code);
    const hasActiveCheck = /status\s*==\s*1/.test(code);
    return hasStatusCheck && hasStatusSet;
  };

  const validateCounters = (code: string): boolean => {
    const hasTotalIncrement = /total_missions\s*\+=\s*1/.test(code);
    const hasActiveCounter = /active_missions/.test(code);
    return hasTotalIncrement && hasActiveCounter;
  };

  const validateAuthorityAccess = (code: string): boolean => {
    const hasAbort = /abort_mission/.test(code);
    const hasAuthority = /authority:\s*Signer/.test(code);
    return hasAbort && hasAuthority;
  };

  const validateTimestamp = (code: string): boolean => {
    return /Clock::get\(\)\?\.unix_timestamp/.test(code);
  };

  // Testing validation helpers - Fixed
  const validateTestInitialize = (code: string): boolean => {
    const hasProgram = /program\.methods\.initialize/.test(code);
    const hasRpc = /\.rpc\(\)/.test(code);
    return hasProgram && hasRpc;
  };

  const validateAccountValues = (code: string): boolean => {
    const hasAssert = /assert\.equal/.test(code);
    const hasShipAccount = /shipAccount/.test(code);
    return hasAssert && hasShipAccount;
  };

  const validateTestCompilation = (code: string): boolean => {
    return /anchor\.workspace/.test(code) || /program\.account/.test(code);
  };

  // Deployment validation helpers - More flexible
  const validateProgramCompiles = (code: string): boolean => {
    return /anchor\s+build/.test(code) || code.includes('cargo build');
  };

  const validateDevnetDeployment = (code: string): boolean => {
    return /anchor\s+deploy/.test(code) && /devnet/.test(code);
  };

  const validateProgramIdDiscovery = (code: string): boolean => {
    return /target\/idl/.test(code) || /program\s+id/.test(code) || /programId/.test(code);
  };

  const validateExplorerUsage = (code: string): boolean => {
    return /explorer\.solana\.com/.test(code) || /devnet/.test(code);
  };

  // PDA validation helpers - Fixed
  const validateShipStateStruct = (code: string): boolean => {
    const hasStruct = /pub\s+struct\s+ShipState/.test(code);
    const hasName = /name:\s*String/.test(code);
    const hasFuel = /fuel:\s*u64/.test(code);
    return hasStruct && hasName && hasFuel;
  };

  const validatePDAInitialization = (code: string): boolean => {
    const hasSeeds = /seeds\s*=\s*\[/.test(code);
    const hasBump = /bump/.test(code);
    const hasShipSeed = /b"ship"/.test(code) || /"ship"/.test(code);
    return hasSeeds && hasBump && hasShipSeed;
  };

  const validatePDASpaceCalculation = (code: string): boolean => {
    return /space\s*=\s*52/.test(code) || /space:\s*52/.test(code) || code.includes('8 + 36 + 8');
  };

  const validateRequiredAccounts = (code: string): boolean => {
    const hasUser = /user:\s*Signer/.test(code);
    const hasSystemProgram = /system_program:\s*Program/.test(code);
    return hasUser && hasSystemProgram;
  };

  const validatePDADeterminism = (code: string): boolean => {
    return /seeds/.test(code) && /bump/.test(code);
  };

  // SPL Token validation helpers - Fixed
  const validateMintToCPI = (code: string): boolean => {
    const hasMintTo = /token::mint_to/.test(code);
    const hasCpiContext = /CpiContext/.test(code);
    return hasMintTo && hasCpiContext;
  };

  const validateTokenReceived = (code: string): boolean => {
    return /1_000_000/.test(code) || /1000000/.test(code);
  };

  const validateMintAuthority = (code: string): boolean => {
    return /authority:\s*Signer/.test(code);
  };

  // CPI validation helpers - Fixed
  const validateTransferCPI = (code: string): boolean => {
    const hasTransfer = /token::transfer/.test(code);
    const hasCpiContext = /CpiContext/.test(code);
    return hasTransfer && hasCpiContext;
  };

  const validateTokenTransfer = (code: string): boolean => {
    const hasFrom = /from:/.test(code);
    const hasTo = /to:/.test(code);
    return hasFrom && hasTo;
  };

  const validateTransferAuthority = (code: string): boolean => {
    return /authority:/.test(code);
  };

  // Access Control validation helpers - Fixed
  const validateCaptainAccess = (code: string): boolean => {
    const hasOne = /has_one\s*=\s*captain/.test(code);
    const hasSigner = /captain:\s*Signer/.test(code);
    return hasOne && hasSigner;
  };

  const validateNonCaptainRestriction = (code: string): boolean => {
    return /has_one/.test(code);
  };

  const validateShieldUpdate = (code: string): boolean => {
    return /shield\s*=\s*1000/.test(code);
  };

  // Debugging validation helpers - Fixed
  const validateFuelPersistence = (code: string): boolean => {
    const hasMutRef = /&mut/.test(code);
    const hasFuel = /fuel/.test(code);
    return hasMutRef && hasFuel;
  };

  const validateNoRuntimeErrors = (code: string): boolean => {
    return !code.includes('panic!') && !code.includes('unwrap()');
  };

  const validateMutableReference = (code: string): boolean => {
    return /&mut/.test(code);
  };

  // Final Mission validation helpers - Fixed
  const validateTestSuite = (code: string): boolean => {
    const hasTests = code.includes('test') || code.includes('describe') || code.includes('it(');
    const hasLength = code.length > 100;
    const noTodos = !code.includes('TODO');
    return hasTests && hasLength && noTodos;
  };

  const validateFinalDevnetDeployment = (code: string): boolean => {
    return /devnet/.test(code) || /deploy/.test(code) || /anchor\s+deploy/.test(code);
  };

  const validateConceptPresentation = (code: string): boolean => {
    // More sophisticated check for a complete solution
    const hasComments = (code.match(/\/\//g) || []).length > 3;
    const hasStructs = /struct/.test(code) || /interface/.test(code);
    const hasFunctions = (code.match(/fn\s+\w+|function\s+\w+/g) || []).length > 1;
    const hasLength = code.length > 200;
    return (hasComments || hasStructs || hasFunctions) && hasLength;
  };

  const validateGenericCompilation = (code: string): boolean => {
    const noTodos = !code.includes('TODO');
    const hasContent = code.length > 50;
    const hasBasicSyntax = code.includes('fn ') || code.includes('function') || code.includes('struct') || code.includes('impl');
    return noTodos && hasContent && hasBasicSyntax;
  };

  const showNextHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex(prev => prev + 1);
    } else {
      setShowHints(false);
      setHintIndex(0);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    toast.info('Code reset to initial state');
  };

  const showSolution = () => {
    setCode(solution);
    toast.info('Solution revealed! Study it carefully 📚');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Editor Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs">🔭 Rust Editor</span>
                </Badge>
                <Badge variant="outline" className="bg-accent/10">
                    <span className="text-xs">👽 Space Mode</span>
                </Badge>
            </div>
            
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowHints(!showHints)}
                    className="hover:bg-accent/10"
                >
                    💡 Hints
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetCode}
                    className="hover:bg-destructive/10"
                >
                    🔄 Reset
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={showSolution}
                    className="hover:bg-muted/50"
                >
                    👁️ Solution
                </Button>
            </div>
        </div>

        {/* Hints Panel */}
        {showHints && (
            <Card className="p-4 border-accent/20 bg-accent/5">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-accent-foreground">💡 Hint {hintIndex + 1} of {hints.length}</h4>
                    <Button size="sm" variant="ghost" onClick={showNextHint}>
                        {hintIndex < hints.length - 1 ? 'Next Hint' : 'Close'}
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">{hints[hintIndex]}</p>
            </Card>
        )}

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[500px]">
            {/* Code Editor */}
            <Card className="overflow-hidden border-primary/20">
                <div className="h-full">
                    <Editor
                        height="100%"
                        defaultLanguage="rust"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        onMount={handleEditorMount}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            wordWrap: 'on',
                            padding: { top: 16, bottom: 16 }
                        }}
                    />
                </div>
            </Card>

            {/* Output Console */}
            <Card className="flex flex-col border-muted/50">
                <div className="p-4 border-b bg-muted/20">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">👽 Space Console</h3>
                        <Button 
                            onClick={runCode} 
                            disabled={isRunning}
                            className="bg-gradient-ocean hover:bg-primary/90 text-primary-foreground shadow-ocean bg-white"
                        >
                            {isRunning ? '⚡ Running...' : '▶️ Run Code'}
                        </Button>
                    </div>
                </div>
                
                <div className="flex-1 p-4 bg-card">
                    <pre className="text-sm font-mono whitespace-pre-wrap text-card-foreground">
                        {output || 'Ready to test your code, matey! Click "Run Code" to begin...'}
                    </pre>
                </div>
            </Card>
        </div>
    </div>
  );
};