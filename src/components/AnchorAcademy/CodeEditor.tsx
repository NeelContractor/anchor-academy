import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

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
        toast.success('Code challenge completed! 🚀');
        setTimeout(() => onComplete(), 1000);
      } else {
        const failedTests = tests.filter((_, index) => !passedTests.includes(index));
        const passedPoints = passedTests.reduce((sum, index) => sum + tests[index].points, 0);
        const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
        
        const failedTestMessages = failedTests.map((test, index) => 
          `• ${test.name}: ${test.description}`
        ).join('\n');
        
        // Debug information for failed tests
        const debugInfo = failedTests.map((test, index) => {
          const debugResult = debugTestCase(code, test);
          return `  Debug ${test.name}: ${debugResult}`;
        }).join('\n');
        
        setOutput(prev => prev + 
          `❌ Some tests failed:\n${failedTestMessages}\n\n` +
          `🔍 Debug Info:\n${debugInfo}\n\n` +
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

  const debugTestCase = (userCode: string, test: TestCase): string => {
    const testName = test.name.toLowerCase();
    
    // Debug information for Mission Control tests
    if (testName.includes('missioncontrol and mission structs')) {
      const hasMCStruct = /pub\s+struct\s+MissionControl/.test(userCode);
      const hasMissionStruct = /pub\s+struct\s+Mission(?!\w)/.test(userCode);
      const hasMCAccount = /#\[account\][\s\S]*?pub\s+struct\s+MissionControl/.test(userCode);
      const hasMissionAccount = /#\[account\][\s\S]*?pub\s+struct\s+Mission(?!\w)/.test(userCode);
      
      return `MC struct: ${hasMCStruct}, Mission struct: ${hasMissionStruct}, MC #[account]: ${hasMCAccount}, Mission #[account]: ${hasMissionAccount}`;
    }
    
    if (testName.includes('space calculations')) {
      const has81 = /space\s*=\s*81/.test(userCode);
      const has150 = /space\s*=\s*150/.test(userCode);
      return `space=81: ${has81}, space=150: ${has150}`;
    }
    
    if (testName.includes('all five instructions')) {
      const instructions = ['initialize_control', 'create_mission', 'launch_mission', 'complete_mission', 'abort_mission'];
      const found = instructions.filter(inst => new RegExp(`pub\\s+fn\\s+${inst}`).test(userCode));
      return `Found instructions: ${found.join(', ')} (${found.length}/5)`;
    }
    
    if (testName.includes('validation with require')) {
      const hasRequire = /require!\s*\(/i.test(userCode);
      const hasErrorEnum = /#\[error_code\]/.test(userCode);
      const errorVariants = (userCode.match(/MissionError::\w+/g) || []).length;
      return `require!: ${hasRequire}, error_code: ${hasErrorEnum}, error variants: ${errorVariants}`;
    }
    
    return 'Debug info not available';
  };

  const runTestCase = (userCode: string, test: TestCase): boolean => {
    // Normalize code for easier pattern matching
    const normalizedCode = userCode.replace(/\s+/g, ' ').toLowerCase();
    const testName = test.name.toLowerCase();
    
    try {
      // Mission Control validation - FIXED
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
      
      // Add other test cases here as needed...
      // For now, default to a basic check
      return userCode.length > 50 && !userCode.includes('TODO');
      
    } catch (error) {
      console.error(`Test validation error for "${test.name}":`, error);
      return false;
    }
  };

  // FIXED Mission Control validation helpers
  const validateMissionStructs = (code: string): boolean => {
    console.log('Validating Mission Structs...');
    
    // Check for MissionControl struct with #[account] attribute
    const hasMissionControlStruct = /pub\s+struct\s+MissionControl/.test(code);
    const hasMissionControlAccount = /#\[account\][\s\S]*?pub\s+struct\s+MissionControl/.test(code) ||
                                    /pub\s+struct\s+MissionControl[\s\S]*?#\[account\]/.test(code);
    
    // Check for Mission struct with #[account] attribute (but not MissionControl)
    const hasMissionStruct = /pub\s+struct\s+Mission(?!\w)/.test(code); // Use negative lookahead
    const hasMissionAccount = /#\[account\][\s\S]*?pub\s+struct\s+Mission(?!\w)/.test(code) ||
                             /pub\s+struct\s+Mission(?!\w)[\s\S]*?#\[account\]/.test(code);
    
    // Check for required MissionControl fields
    const hasMCFields = /authority:\s*Pubkey/.test(code) &&
                        /total_missions:\s*u32/.test(code) &&
                        /active_missions:\s*u32/.test(code) &&
                        /emergency_contact:\s*Pubkey/.test(code) &&
                        /initialized:\s*bool/.test(code);
    
    // Check for required Mission fields
    const hasMissionFields = /mission_id:\s*u32/.test(code) &&
                            /commander:\s*Pubkey/.test(code) &&
                            /mission_name:\s*String/.test(code) &&
                            /destination:\s*String/.test(code) &&
                            /crew_size:\s*u8/.test(code) &&
                            /status:\s*u8/.test(code) &&
                            /fuel_allocated:\s*u64/.test(code) &&
                            /created_at:\s*i64/.test(code);
    
    const result = hasMissionControlStruct && hasMissionStruct && 
                   (hasMissionControlAccount || hasMissionAccount) && 
                   hasMCFields && hasMissionFields;
    
    console.log('Mission Structs validation:', {
      hasMissionControlStruct,
      hasMissionStruct,
      hasMissionControlAccount,
      hasMissionAccount,
      hasMCFields,
      hasMissionFields,
      result
    });
    
    return result;
  };

  const validateMissionSpaceCalculations = (code: string): boolean => {
    console.log('Validating Space Calculations...');
    
    // Look for space = 81 (for MissionControl)
    const has81 = /space\s*=\s*81/.test(code) ||
                  /#\[account\([^}]*space\s*=\s*81/.test(code) ||
                  /InitializeControl[\s\S]*?space\s*=\s*81/.test(code);
    
    // Look for space = 150 (for Mission)  
    const has150 = /space\s*=\s*150/.test(code) ||
                   /#\[account\([^}]*space\s*=\s*150/.test(code) ||
                   /CreateMission[\s\S]*?space\s*=\s*150/.test(code);
    
    console.log('Space calculations validation:', { has81, has150 });
    
    return has81 && has150;
  };

  const validateAllInstructions = (code: string): boolean => {
    console.log('Validating All Instructions...');
    
    // Check that all 5 instruction functions exist
    const instructions = [
      'initialize_control',
      'create_mission', 
      'launch_mission',
      'complete_mission',
      'abort_mission'
    ];
    
    const foundInstructions = instructions.filter(instruction => {
      const pattern = new RegExp(`pub\\s+fn\\s+${instruction}`, 'g');
      return pattern.test(code);
    });
    
    // Also check they have basic implementation (Ok() return)
    const implementedInstructions = instructions.filter(instruction => {
      const pattern = new RegExp(`pub\\s+fn\\s+${instruction}[\\s\\S]*?Ok\\(\\)`, 'g');
      return pattern.test(code);
    });
    
    const result = foundInstructions.length === 5;
    
    console.log('All instructions validation:', {
      foundInstructions: foundInstructions.length,
      implementedInstructions: implementedInstructions.length,
      instructions: foundInstructions,
      result
    });
    
    return result;
  };

  const validateRequireMacro = (code: string): boolean => {
    console.log('Validating Require Macro...');
    
    // Check for require! macro usage
    const hasRequire = /require!\s*\(/i.test(code);
    
    // Check for MissionError enum definition with #[error_code]
    const hasErrorEnum = /#\[error_code\][\s\S]*?enum\s+MissionError/.test(code) ||
                         /enum\s+MissionError[\s\S]*?#\[error_code\]/.test(code);
    
    // Check for specific error variants
    const errorVariants = [
      /MissionNameTooLong/.test(code),
      /DestinationTooLong/.test(code),
      /InvalidCrewSize/.test(code),
      /InsufficientFuel/.test(code),
      /InvalidMissionStatus/.test(code),
      /MissionNotActive/.test(code)
    ];
    
    const errorVariantCount = errorVariants.filter(Boolean).length;
    
    // Check for usage of MissionError in require! statements
    const hasErrorUsage = /MissionError::/.test(code) && hasRequire;
    
    const result = hasRequire && hasErrorEnum && hasErrorUsage && errorVariantCount >= 3;
    
    console.log('Require macro validation:', {
      hasRequire,
      hasErrorEnum,
      hasErrorUsage,
      errorVariantCount,
      result
    });
    
    return result;
  };

  const validateAccountConstraints = (code: string): boolean => {
    const hasOne = /has_one/.test(code);
    const hasInit = /#\[account\(\s*init/.test(code) || code.includes('#[account(init');
    const hasMut = /#\[account\(\s*mut/.test(code) || /#\[account\([^)]*mut/.test(code);
    const hasPayer = /payer\s*=/.test(code);
    return hasOne && hasInit && hasMut && hasPayer;
  };

  const validateStatusTransitions = (code: string): boolean => {
    // Check for status checks and updates
    const hasStatusCheck = /status\s*==\s*[0-9]/.test(code) || /mission\.status\s*==\s*[0-9]/.test(code);
    const hasStatusSet = /status\s*=\s*[0-9]/.test(code) || /mission\.status\s*=\s*[0-9]/.test(code);
    
    return hasStatusCheck && hasStatusSet;
  };

  const validateCounters = (code: string): boolean => {
    const hasTotalIncrement = /total_missions\s*\+=\s*1/.test(code) || /total_missions\s*=.*\+\s*1/.test(code);
    const hasActiveCounter = /active_missions/.test(code);
    const hasCounterUpdate = /active_missions\s*[\+\-]=/.test(code) || /active_missions\s*=/.test(code);
    return hasTotalIncrement && hasActiveCounter && hasCounterUpdate;
  };

  const validateAuthorityAccess = (code: string): boolean => {
    const hasAbort = /abort_mission/.test(code);
    const hasAuthority = /authority:\s*Signer/.test(code);
    const hasAbortContext = /AbortMission/.test(code);
    return hasAbort && hasAuthority && hasAbortContext;
  };

  const validateTimestamp = (code: string): boolean => {
    return /Clock::get\(\)\?\.unix_timestamp/.test(code) || /unix_timestamp/.test(code);
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
              // theme="vs-dark"
              theme={theme == "dark" ? "vs-dark" : "vs-light" }
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
                // className="bg-gradient-ocean hover:bg-primary/90 text-primary-foreground shadow-ocean"
              >
                {isRunning ? '⚡ Running...' : '▶️ Run Code'}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-card">
            <pre className="text-sm font-mono whitespace-pre-wrap text-card-foreground">
              {output || 'Ready to test your code, space cadet! Click "Run Code" to begin...'}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};