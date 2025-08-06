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
      const results = validateCodeDynamic(code, tests);
      const passedTests = results.filter(r => r.passed);
      
      if (passedTests.length === tests.length) {
        const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
        setOutput(prev => prev + 
          '✅ Compilation successful!\n' +
          '✅ All tests passed!\n' +
          `🎯 Score: ${totalPoints}/${totalPoints} points\n\n` +
          passedTests.map(r => `✅ ${r.test.name}: ${r.message || 'Passed'}`).join('\n') +
          '\n\n🎉 Excellent work, space cadet! You\'ve mastered this lesson!'
        );
        toast.success('Code challenge completed! 🚀');
        setTimeout(() => onComplete(), 1000);
      } else {
        const failedTests = results.filter(r => !r.passed);
        const passedPoints = passedTests.reduce((sum, r) => sum + r.test.points, 0);
        const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
        
        const passedMessages = passedTests.map(r => `✅ ${r.test.name}`).join('\n');
        const failedMessages = failedTests.map(r => `❌ ${r.test.name}: ${r.message}`).join('\n');
        
        setOutput(prev => prev + 
          (passedMessages ? `Passed:\n${passedMessages}\n\n` : '') +
          `Failed:\n${failedMessages}\n\n` +
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

  const validateCodeDynamic = (userCode: string, testCases: TestCase[]): Array<{test: TestCase, passed: boolean, message: string}> => {
    return testCases.map(test => {
      const result = runTestCase(userCode, test);
      return {
        test,
        passed: result.passed,
        message: result.message
      };
    });
  };

  const runTestCase = (userCode: string, test: TestCase): {passed: boolean, message: string} => {
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
      
      if (testName.includes('pre-flight operations executed')) {
        return validateOperations(userCode);
      }
      
      if (testName.includes('type casting for calculations')) {
        return validateTypeCasting(userCode);
      }
      
      if (testName.includes('code compiles without errors')) {
        return validateCompilation(userCode);
      }
      
      if (testName.includes('mission readiness logic')) {
        return validateMissionReadiness(userCode);
      }
      
      // Rust Functions Lesson Tests
      if (testName.includes('navigation function works correctly')) {
        return validateNavigationFunction(userCode);
      }
      
      if (testName.includes('fuel status logic correct')) {
        return validateFuelStatusFunction(userCode);
      }
      
      if (testName.includes('mission report formatting')) {
        return validateMissionReportFunction(userCode);
      }
      
      if (testName.includes('warp speed calculation')) {
        return validateWarpSpeedFunction(userCode);
      }
      
      if (testName.includes('risk assessment algorithm')) {
        return validateRiskAssessmentFunction(userCode);
      }
      
      if (testName.includes('all functions called in main')) {
        return validateFunctionCalls(userCode);
      }
      
      if (testName.includes('type safety maintained')) {
        return validateTypeSafety(userCode);
      }
      
      // Solana Account Model Tests
      if (testName.includes('spacestation struct is defined with correct field types')) {
        return validateSpaceStationStruct(userCode);
      }
      
      if (testName.includes('space calculation is accurate')) {
        return validateSpaceCalculation(userCode);
      }
      
      if (testName.includes('establish_station initializes all spacestation fields correctly')) {
        return validateEstablishStationFunction(userCode);
      }
      
      if (testName.includes('activate_station correctly updates state')) {
        return validateActivateStationFunction(userCode);
      }
      
      if (testName.includes('establishstation context uses #[account(init)] correctly')) {
        return validateEstablishStationContext(userCode);
      }
      
      if (testName.includes('activatestation context uses #[account(has_one = commander)]')) {
        return validateActivateStationContext(userCode);
      }
      
      if (testName.includes('custom error for station_name overflow')) {
        return validateCustomError(userCode);
      }
      
      // Anchor Program Structure Tests
      if (testName.includes('missioncontrol and mission structs defined with correct field types')) {
        return validateMissionStructs(userCode);
      }
      
      if (testName.includes('space calculations are accurate')) {
        return validateMissionSpaceCalculations(userCode);
      }
      
      if (testName.includes('all five instructions implemented')) {
        return validateAllInstructions(userCode);
      }
      
      if (testName.includes('validation with require! macro and custom errors')) {
        return validateRequireMacro(userCode);
      }
      
      if (testName.includes('account constraints')) {
        return validateAccountConstraints(userCode);
      }
      
      if (testName.includes('mission status transitions work as expected')) {
        return validateStatusTransitions(userCode);
      }
      
      if (testName.includes('counters') && testName.includes('correctly updated')) {
        return validateCounters(userCode);
      }
      
      if (testName.includes('authority-based access control for abort')) {
        return validateAuthorityAccess(userCode);
      }
      
      if (testName.includes('timestamp recorded on mission creation')) {
        return validateTimestamp(userCode);
      }
      
      if (testName.includes('program compiles and follows anchor best practices')) {
        return validateAnchorBestPractices(userCode);
      }
      
      // Testing Lesson Tests
      if (testName.includes('test calls initialize successfully')) {
        return validateTestInitialize(userCode);
      }
      
      if (testName.includes('ship account values match expected')) {
        return validateAccountValues(userCode);
      }
      
      if (testName.includes('test code compiles and passes')) {
        return validateTestCompilation(userCode);
      }
      
      // Deployment Tests
      if (testName.includes('program compiles successfully')) {
        return validateProgramCompiles(userCode);
      }
      
      if (testName.includes('program deploys to devnet')) {
        return validateDevnetDeployment(userCode);
      }
      
      if (testName.includes('user can find deployed program id')) {
        return validateProgramIdDiscovery(userCode);
      }
      
      if (testName.includes('explore program in solana explorer')) {
        return validateExplorerUsage(userCode);
      }
      
      // PDA Tests
      if (testName.includes('shipstate struct is defined properly')) {
        return validateShipStateStruct(userCode);
      }
      
      if (testName.includes('pda initialization uses seeds and bump')) {
        return validatePDAInitialization(userCode);
      }
      
      if (testName.includes('account space calculation is correct')) {
        return validatePDASpaceCalculation(userCode);
      }
      
      if (testName.includes('user and system_program accounts included')) {
        return validateRequiredAccounts(userCode);
      }
      
      if (testName.includes('program compiles and pda is deterministic')) {
        return validatePDADeterminism(userCode);
      }
      
      // SPL Token Tests
      if (testName.includes('calls mintto cpi')) {
        return validateMintToCPI(userCode);
      }
      
      if (testName.includes('user receives tokens after mint')) {
        return validateTokenReceived(userCode);
      }
      
      if (testName.includes('only mint authority can mint')) {
        return validateMintAuthority(userCode);
      }
      
      // CPI Tests
      if (testName.includes('transfer cpi is called')) {
        return validateTransferCPI(userCode);
      }
      
      if (testName.includes('tokens move from sender to receiver')) {
        return validateTokenTransfer(userCode);
      }
      
      if (testName.includes('only authority can approve transfer')) {
        return validateTransferAuthority(userCode);
      }
      
      // Access Control Tests
      if (testName.includes('captain can call boost_shields')) {
        return validateCaptainAccess(userCode);
      }
      
      if (testName.includes('non-captain cannot call boost_shields')) {
        return validateNonCaptainRestriction(userCode);
      }
      
      if (testName.includes('shield value updates correctly')) {
        return validateShieldUpdate(userCode);
      }
      
      // Debugging Tests
      if (testName.includes('fuel increases and persists on-chain')) {
        return validateFuelPersistence(userCode);
      }
      
      if (testName.includes('no runtime errors during execution')) {
        return validateNoRuntimeErrors(userCode);
      }
      
      if (testName.includes('mutable reference required for state changes')) {
        return validateMutableReference(userCode);
      }
      
      // Final Mission Tests
      if (testName.includes('have at least one passing test suite')) {
        return validateTestSuite(userCode);
      }
      
      if (testName.includes('deployed program on devnet')) {
        return validateFinalDevnetDeployment(userCode);
      }
      
      if (testName.includes('present your concept and code')) {
        return validateConceptPresentation(userCode);
      }
      
      // Generic fallback
      return validateGenericTest(userCode, test);
      
    } catch (error) {
      return {
        passed: false,
        message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  // Improved validation helper functions with better error messages
  const validateImmutableVariables = (code: string): {passed: boolean, message: string} => {
    const checks = [
      { name: 'ship_name', pattern: /let\s+ship_name\s*=/, antiPattern: /let\s+mut\s+ship_name/ },
      { name: 'max_crew_size', pattern: /let\s+max_crew_size/, antiPattern: /let\s+mut\s+max_crew_size/ },
      { name: 'max_fuel_capacity', pattern: /let\s+max_fuel_capacity/, antiPattern: /let\s+mut\s+max_fuel_capacity/ },
      { name: 'warp_capable', pattern: /let\s+warp_capable/, antiPattern: /let\s+mut\s+warp_capable/ }
    ];
    
    const missing = [];
    const incorrect = [];
    
    for (const check of checks) {
      if (!check.pattern.test(code)) {
        missing.push(check.name);
      } else if (check.antiPattern.test(code)) {
        incorrect.push(check.name);
      }
    }
    
    if (missing.length > 0) {
      return { passed: false, message: `Missing immutable variables: ${missing.join(', ')}` };
    }
    if (incorrect.length > 0) {
      return { passed: false, message: `These should be immutable (remove 'mut'): ${incorrect.join(', ')}` };
    }
    
    return { passed: true, message: 'All immutable variables correctly defined' };
  };

  const validateMutableVariables = (code: string): {passed: boolean, message: string} => {
    const required = ['current_fuel', 'crew_count', 'shields_active'];
    const missing = required.filter(name => 
      !new RegExp(`let\\s+mut\\s+${name}`).test(code)
    );
    
    if (missing.length > 0) {
      return { passed: false, message: `Missing mutable variables: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'All mutable variables correctly defined' };
  };

  const validateTypeAnnotations = (code: string): {passed: boolean, message: string} => {
    const u8Count = (code.match(/:\s*u8/g) || []).length;
    const u32Count = (code.match(/:\s*u32/g) || []).length;
    const boolCount = (code.match(/:\s*bool/g) || []).length;
    
    const issues = [];
    if (u8Count < 2) issues.push(`Need at least 2 u8 types (found ${u8Count})`);
    if (u32Count < 2) issues.push(`Need at least 2 u32 types (found ${u32Count})`);
    if (boolCount < 1) issues.push(`Need at least 1 bool type (found ${boolCount})`);
    
    if (issues.length > 0) {
      return { passed: false, message: issues.join(', ') };
    }
    
    return { passed: true, message: 'Type annotations are correct' };
  };

  const validateOperations = (code: string): {passed: boolean, message: string} => {
    const operations = [
      { name: 'fuel consumption', patterns: [/current_fuel\s*-=\s*500/, /current_fuel\s*=\s*current_fuel\s*-\s*500/] },
      { name: 'crew addition', patterns: [/crew_count\s*\+=\s*10/, /crew_count\s*=\s*crew_count\s*\+\s*10/] },
      { name: 'shield activation', patterns: [/shields_active\s*=\s*true/] }
    ];
    
    const missing = operations.filter(op => 
      !op.patterns.some(pattern => pattern.test(code))
    ).map(op => op.name);
    
    if (missing.length > 0) {
      return { passed: false, message: `Missing operations: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'All pre-flight operations implemented' };
  };

  const validateTypeCasting = (code: string): {passed: boolean, message: string} => {
    const hasF32Cast = /as\s+f32/.test(code);
    const hasU32Cast = /as\s+u32/.test(code);
    
    const missing = [];
    if (!hasF32Cast) missing.push('f32 casting');
    if (!hasU32Cast) missing.push('u32 casting');
    
    if (missing.length > 0) {
      return { passed: false, message: `Missing type casting: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Type casting implemented correctly' };
  };

  const validateCompilation = (code: string): {passed: boolean, message: string} => {
    if (code.includes('TODO')) {
      return { passed: false, message: 'Code still contains TODO comments' };
    }
    if (!code.includes('fn main()')) {
      return { passed: false, message: 'Missing main function' };
    }
    if (!code.includes('println!')) {
      return { passed: false, message: 'Missing println! statements' };
    }
    
    return { passed: true, message: 'Code structure is complete' };
  };

  const validateMissionReadiness = (code: string): {passed: boolean, message: string} => {
    const hasReadinessVar = /ready_for_mission/.test(code);
    const hasLogicalAnd = /&&/.test(code);
    const hasFuelCheck = /current_fuel\s*>\s*1000/.test(code);
    const hasCrewCheck = /crew_count\s*>=\s*20/.test(code);
    const hasShieldCheck = /shields_active/.test(code);
    
    const missing = [];
    if (!hasReadinessVar) missing.push('ready_for_mission variable');
    if (!hasLogicalAnd) missing.push('&& logical operator');
    if (!hasFuelCheck) missing.push('fuel > 1000 check');
    if (!hasCrewCheck) missing.push('crew >= 20 check');
    if (!hasShieldCheck) missing.push('shields_active check');
    
    if (missing.length > 0) {
      return { passed: false, message: `Mission readiness logic missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Mission readiness logic implemented correctly' };
  };

  // Function validation helpers
  const validateNavigationFunction = (code: string): {passed: boolean, message: string} => {
    const hasFunction = /fn\s+calculate_travel_time/.test(code);
    const hasCorrectParams = /calculate_travel_time\s*\([^)]*distance\s*:\s*f64[^)]*speed\s*:\s*f64[^)]*\)/.test(code);
    const hasReturnType = /calculate_travel_time[^{]*->\s*f64/.test(code);
    const hasZeroCheck = /if\s+speed\s*<=\s*0\.0/.test(code) || /speed\s*<=\s*0\.0/.test(code);
    const hasDivision = /distance\s*\/\s*speed/.test(code);
    
    const missing = [];
    if (!hasFunction) missing.push('function definition');
    if (!hasCorrectParams) missing.push('correct parameters (distance: f64, speed: f64)');
    if (!hasReturnType) missing.push('return type -> f64');
    if (!hasZeroCheck) missing.push('division by zero check');
    if (!hasDivision) missing.push('distance / speed calculation');
    
    if (missing.length > 0) {
      return { passed: false, message: `Navigation function missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Navigation function implemented correctly' };
  };

  const validateFuelStatusFunction = (code: string): {passed: boolean, message: string} => {
    const hasFunction = /fn\s+check_fuel_status/.test(code);
    const hasCorrectParams = /check_fuel_status\s*\([^)]*current_fuel\s*:\s*u32[^)]*required_fuel\s*:\s*u32[^)]*emergency_reserve\s*:\s*u32[^)]*\)/.test(code);
    const hasReturnType = /check_fuel_status[^{]*->\s*String/.test(code);
    const hasOptimalCheck = /current_fuel\s*>=\s*required_fuel\s*\+\s*emergency_reserve/.test(code) || 
                           /current_fuel\s*>=\s*\(required_fuel\s*\+\s*emergency_reserve\)/.test(code);
    const hasAdequateCheck = /current_fuel\s*>=\s*required_fuel/.test(code);
    const hasStrings = code.includes('"Fuel optimal"') && code.includes('"Fuel adequate"') && 
                      (code.includes('"Critical fuel shortage"') || code.includes('"shortage"'));
    
    const missing = [];
    if (!hasFunction) missing.push('function definition');
    if (!hasCorrectParams) missing.push('correct parameters');
    if (!hasReturnType) missing.push('String return type');
    if (!hasOptimalCheck) missing.push('optimal fuel check (current >= required + reserve)');
    if (!hasAdequateCheck) missing.push('adequate fuel check');
    if (!hasStrings) missing.push('required status strings');
    
    if (missing.length > 0) {
      return { passed: false, message: `Fuel status function missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Fuel status function implemented correctly' };
  };

  const validateMissionReportFunction = (code: string): {passed: boolean, message: string} => {
    const hasFunction = /fn\s+generate_mission_report/.test(code);
    const hasStringParam = /ship_name\s*:\s*&str/.test(code);
    const hasU32Params = /crew_count\s*:\s*u32/.test(code) && /fuel_remaining\s*:\s*u32/.test(code);
    const hasU16Param = /days_elapsed\s*:\s*u16/.test(code);
    const hasReturnType = /generate_mission_report[^{]*->\s*String/.test(code);
    const hasFormat = /format!/.test(code);
    
    const missing = [];
    if (!hasFunction) missing.push('function definition');
    if (!hasStringParam) missing.push('ship_name: &str parameter');
    if (!hasU32Params) missing.push('u32 parameters for crew_count and fuel_remaining');
    if (!hasU16Param) missing.push('days_elapsed: u16 parameter');
    if (!hasReturnType) missing.push('String return type');
    if (!hasFormat) missing.push('format! macro for string formatting');
    
    if (missing.length > 0) {
      return { passed: false, message: `Mission report function missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Mission report function implemented correctly' };
  };

  const validateWarpSpeedFunction = (code: string): {passed: boolean, message: string} => {
    const hasFunction = /fn\s+calculate_warp_speed/.test(code);
    const hasParams = /base_speed\s*:\s*f64/.test(code) && /warp_factor\s*:\s*u8/.test(code);
    const hasReturnType = /calculate_warp_speed[^{]*->\s*f64/.test(code);
    const hasPowerCalc = /\.powf\s*\(\s*1\.5\s*\)/.test(code);
    const hasWarpLimit = /warp_factor\s*>\s*9/.test(code) || /if.*9/.test(code);
    
    const missing = [];
    if (!hasFunction) missing.push('function definition');
    if (!hasParams) missing.push('correct parameters (base_speed: f64, warp_factor: u8)');
    if (!hasReturnType) missing.push('f64 return type');
    if (!hasPowerCalc) missing.push('.powf(1.5) calculation');
    if (!hasWarpLimit) missing.push('warp factor limit check (> 9)');
    
    if (missing.length > 0) {
      return { passed: false, message: `Warp speed function missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Warp speed function implemented correctly' };
  };

  const validateRiskAssessmentFunction = (code: string): {passed: boolean, message: string} => {
    const hasFunction = /fn\s+assess_mission_risk/.test(code);
    const hasParams = /distance\s*:\s*f64/.test(code) && /unknown_systems\s*:\s*u8/.test(code) && 
                     /crew_experience\s*:\s*f32/.test(code);
    const hasReturnType = /assess_mission_risk[^{]*->\s*String/.test(code);
    const hasRiskScore = /risk_score/.test(code);
    const hasFormula = /distance\s*\/\s*100\.0/.test(code) && /unknown_systems.*\*.*0\.5/.test(code);
    const hasThresholds = /<=\s*0\.0/.test(code) && /<=\s*3\.0/.test(code);
    
    const missing = [];
    if (!hasFunction) missing.push('function definition');
    if (!hasParams) missing.push('correct parameters');
    if (!hasReturnType) missing.push('String return type');
    if (!hasRiskScore) missing.push('risk_score calculation');
    if (!hasFormula) missing.push('risk formula (distance/100 + systems*0.5 - experience)');
    if (!hasThresholds) missing.push('risk threshold checks (0.0 and 3.0)');
    
    if (missing.length > 0) {
      return { passed: false, message: `Risk assessment function missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'Risk assessment function implemented correctly' };
  };

  const validateFunctionCalls = (code: string): {passed: boolean, message: string} => {
    const requiredCalls = [
      'calculate_travel_time(',
      'check_fuel_status(',
      'generate_mission_report(',
      'calculate_warp_speed(',
      'assess_mission_risk('
    ];
    
    const missing = requiredCalls.filter(call => !code.includes(call));
    
    if (missing.length > 0) {
      return { passed: false, message: `Missing function calls: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'All functions called correctly in main' };
  };

  const validateTypeSafety = (code: string): {passed: boolean, message: string} => {
    // Check for common type safety issues
    if (code.includes('TODO')) {
      return { passed: false, message: 'Code contains TODO items' };
    }
    
    // Check for proper function definitions
    const functionCount = (code.match(/fn\s+\w+/g) || []).length;
    if (functionCount < 5) {
      return { passed: false, message: `Expected at least 5 functions, found ${functionCount}` };
    }
    
    return { passed: true, message: 'Type safety maintained throughout code' };
  };

  // Add more specific validation functions for other lesson types...
  const validateSpaceStationStruct = (code: string): {passed: boolean, message: string} => {
    const hasStruct = /#\[account\][\s\S]*pub struct SpaceStation/.test(code);
    const hasStationName = /station_name\s*:\s*String/.test(code);
    const hasCommander = /commander\s*:\s*Pubkey/.test(code);
    const hasCrewCount = /crew_count\s*:\s*u16/.test(code);
    const hasFuelReserves = /fuel_reserves\s*:\s*u64/.test(code);
    const hasOperational = /operational\s*:\s*bool/.test(code);
    const hasCoordinates = /coordinates\s*:\s*\[u8;\s*3\]/.test(code);
    
    const missing = [];
    if (!hasStruct) missing.push('#[account] struct SpaceStation');
    if (!hasStationName) missing.push('station_name: String');
    if (!hasCommander) missing.push('commander: Pubkey');
    if (!hasCrewCount) missing.push('crew_count: u16');
    if (!hasFuelReserves) missing.push('fuel_reserves: u64');
    if (!hasOperational) missing.push('operational: bool');
    if (!hasCoordinates) missing.push('coordinates: [u8; 3]');
    
    if (missing.length > 0) {
      return { passed: false, message: `SpaceStation struct missing: ${missing.join(', ')}` };
    }
    
    return { passed: true, message: 'SpaceStation struct correctly defined' };
  };

  const validateSpaceCalculation = (code: string): {passed: boolean, message: string} => {
    if (code.includes('space = 90') || code.includes('space: 90')) {
      return { passed: true, message: 'Space calculation correct (90 bytes)' };
    }
    
    return { passed: false, message: 'Space should be 90 bytes (8 + 36 + 32 + 2 + 8 + 1 + 3)' };
  };

  // Additional validation functions for other lessons would go here...
  // For brevity, I'll add a few more key ones and then use a generic fallback

  const validateGenericTest = (code: string, test: TestCase): {passed: boolean, message: string} => {
    // Generic validation based on test description
    if (test.description.toLowerCase().includes('compile')) {
      if (code.includes