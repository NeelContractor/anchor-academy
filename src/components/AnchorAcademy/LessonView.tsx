import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, Target, Clock, Trophy } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { toast } from 'sonner';
import { Lesson } from '../types/lessons';
import { ThemeSelect } from '../theme-select';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
}

// Simple Markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    // Split into lines for processing
    const lines = text.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          result.push(
            <pre key={`code-${i}`} className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }
      
      // Process regular markdown
      let processedLine = line;
      
      // Headers (check in order: ###, ##, # to avoid conflicts)
      if (line.trim().startsWith('### ')) {
        const headerText = line.replace(/^###\s+/, '').trim();
        result.push(
          <h3 key={`h3-${i}`} className="text-xl font-semibold mt-6 mb-3 text-foreground">
            {processInlineMarkdown(headerText)}
          </h3>
        );
        continue;
      }
      
      if (line.trim().startsWith('## ')) {
        const headerText = line.replace(/^##\s+/, '').trim();
        result.push(
          <h2 key={`h2-${i}`} className="text-2xl font-bold mt-8 mb-4 text-foreground">
            {processInlineMarkdown(headerText)}
          </h2>
        );
        continue;
      }
      
      if (line.trim().startsWith('# ')) {
        const headerText = line.replace(/^#\s+/, '').trim();
        result.push(
          <h1 key={`h1-${i}`} className="text-3xl font-bold mt-10 mb-6 text-foreground">
            {processInlineMarkdown(headerText)}
          </h1>
        );
        continue;
      }
      
      // Lists
      if (line.trim().startsWith('- ')) {
        const listText = line.substring(line.indexOf('- ') + 2);
        result.push(
          <div key={`list-${i}`} className="flex items-start gap-3 my-2">
            <span className="text-primary mt-2">•</span>
            <span className="text-foreground">{processInlineMarkdown(listText)}</span>
          </div>
        );
        continue;
      }
      
      // Numbered lists with emojis
      if (line.trim().match(/^[🔒🔑🛡️⚡🎯📦🔄🔧]\s*\*\*/)) {
        const parts = line.split('**');
        if (parts.length >= 3) {
          const emoji = parts[0].trim();
          const boldText = parts[1];
          const restText = parts.slice(2).join('**');
          result.push(
            <div key={`emoji-list-${i}`} className="flex items-start gap-3 my-2">
              <span className="text-xl">{emoji}</span>
              <span className="text-foreground">
                <strong className="font-semibold text-foreground">{boldText}</strong>
                {processInlineMarkdown(restText)}
              </span>
            </div>
          );
          continue;
        }
      }
      
      // Regular paragraphs
      if (line.trim() !== '') {
        result.push(
          <p key={`p-${i}`} className="text-foreground leading-relaxed my-3">
            {processInlineMarkdown(processedLine)}
          </p>
        );
      } else {
        // Empty line for spacing
        result.push(<br key={`br-${i}`} />);
      }
    }
    
    return result;
  };
  
  const processInlineMarkdown = (text: string) => {
    const parts = [];
    let current = '';
    let i = 0;
    
    while (i < text.length) {
      if (text.substring(i, i + 2) === '**') {
        // Add current text
        if (current) {
          parts.push(current);
          current = '';
        }
        
        // Find closing **
        let j = i + 2;
        let boldText = '';
        while (j < text.length - 1 && text.substring(j, j + 2) !== '**') {
          boldText += text[j];
          j++;
        }
        
        if (j < text.length - 1) {
          parts.push(<strong key={`bold-${i}`} className="font-semibold text-foreground">{boldText}</strong>);
          i = j + 2;
        } else {
          current += '**';
          i += 2;
        }
      } else if (text[i] === '`' && text[i + 1] !== '`') {
        // Inline code
        if (current) {
          parts.push(current);
          current = '';
        }
        
        let j = i + 1;
        let codeText = '';
        while (j < text.length && text[j] !== '`') {
          codeText += text[j];
          j++;
        }
        
        if (j < text.length) {
          parts.push(
            <code key={`code-${i}`} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              {codeText}
            </code>
          );
          i = j + 1;
        } else {
          current += '`';
          i++;
        }
      } else {
        current += text[i];
        i++;
      }
    }
    
    if (current) {
      parts.push(current);
    }
    
    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
  };
  
  return <div className="space-y-2">{renderMarkdown(content)}</div>;
};

export const LessonView = ({ lesson, onBack, onComplete }: LessonViewProps) => {
  const [currentTab, setCurrentTab] = useState<'story' | 'code'>('story');

  const handleLessonComplete = () => {
    onComplete(lesson.id);
    toast.success('🎉 Lesson completed! You earned 50 XP!', {
      description: 'Ready for the next adventure?'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={onBack}
                            className="hover:bg-primary/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Lessons
                        </Button>
                        
                        <Separator orientation="vertical" className="h-6" />
                        
                        <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(lesson.difficulty)}>
                                {lesson.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/10">
                                Chapter {lesson.chapter}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <ThemeSelect />
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{lesson.estimatedTime} minutes</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            {/* Lesson Title */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text ">
                    {lesson.title}
                </h1>
                <p className="text-xl text-muted-foreground">{lesson.description}</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
                <div className="flex items-center gap-4 border-b">
                    <button
                        onClick={() => setCurrentTab('story')}
                        className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                            currentTab === 'story'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Story & Objectives
                    </button>
                    
                    <button
                        onClick={() => setCurrentTab('code')}
                        className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                            currentTab === 'code'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Trophy className="w-4 h-4" />
                        Code Challenge
                    </button>
                </div>
            </div>

            {/* Content */}
            {currentTab === 'story' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Story */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-2xl">📜</span>
                                <h2 className="text-2xl font-bold text-foreground">The Adventure Begins</h2>
                            </div>
                            
                            <div className="prose prose-lg max-w-none">
                                <MarkdownRenderer content={lesson.storyText} />
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-primary/20">
                                <Button 
                                    onClick={() => setCurrentTab('code')}
                                    // className="bg-gradient-ocean hover:bg-primary/90 text-primary-foreground shadow-ocean "
                                >
                                    Start Coding Challenge 🚀
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Objectives */}
                    <div className="space-y-6">
                        <Card className="p-6 border-accent/20 bg-accent/5">
                            <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5" />
                                <h3 className="font-semibold text-accent-foreground">Learning Objectives</h3>
                            </div>
                            
                            <ul className="space-y-3">
                                {lesson.objectives.map((objective, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-medium ">{index + 1}</span>
                                    </div>
                                    <span className="text-sm text-foreground">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                        
                        <Card className="p-6 border-muted/20">
                            <h3 className="font-semibold mb-4 text-foreground">💡 What you'll learn</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                This lesson will teach you fundamental concepts that are essential for your journey 
                                in Anchor development. Take your time to understand each concept before moving on!
                            </p>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="h-[calc(100vh-300px)]">
                    <CodeEditor
                        initialCode={lesson.code.initial}
                        solution={lesson.code.solution}
                        tests={lesson.code.tests}
                        hints={lesson.hints}
                        onComplete={handleLessonComplete}
                    />
                </div>
            )}
        </div>
    </div>
  );
};