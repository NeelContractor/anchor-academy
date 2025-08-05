import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CodeEditorProps {
  initialCode: string;
  solution: string;
  tests: string[];
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
    setOutput('Compiling your Rust code...\n');
    
    try {
      // Simulate code compilation and execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation checks
      const passedTests = validateCode(code);
      
      if (passedTests.length === tests.length) {
        setOutput(prev => prev + '✅ Compilation successful!\n✅ All tests passed!\n\n🎉 Excellent work, pirate! You\'ve mastered this lesson!');
        toast.success('Code challenge completed! 🏴‍☠️');
        setTimeout(() => onComplete(), 1000);
      } else {
        const failedTests = tests.filter((_, index) => !passedTests.includes(index));
        setOutput(prev => prev + `❌ Some tests failed:\n${failedTests.map(test => `• ${test}`).join('\n')}\n\nTry again, matey!`);
        toast.error('Some tests failed. Check the hints!');
      }
    } catch (error) {
      setOutput(prev => prev + '❌ Compilation failed. Check your syntax!');
      toast.error('Code compilation failed');
    } finally {
      setIsRunning(false);
    }
  };

  const validateCode = (userCode: string): number[] => {
    const passed: number[] = [];
    
    // Basic validation logic - in a real implementation, this would be more sophisticated
    if (userCode.includes('let treasure_name')) passed.push(0);
    if (userCode.includes('let mut treasure_count')) passed.push(1);
    if (userCode.includes('treasure_count +=') || userCode.includes('treasure_count = treasure_count +')) passed.push(2);
    if (!userCode.includes('TODO:')) passed.push(3);
    
    return passed;
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
                    <span className="text-xs">⚓ Rust Editor</span>
                </Badge>
                <Badge variant="outline" className="bg-accent/10">
                    <span className="text-xs">🏴‍☠️ Pirate Mode</span>
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
                        theme="vs-light"
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
                        <h3 className="font-semibold text-sm">🏴‍☠️ Pirate Console</h3>
                        <Button 
                            onClick={runCode} 
                            disabled={isRunning}
                            className="bg-gradient-ocean hover:bg-primary/90 text-primary-foreground shadow-ocean"
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