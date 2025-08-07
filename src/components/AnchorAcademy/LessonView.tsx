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
                                <div className="text-foreground leading-relaxed whitespace-pre-line">
                                    {lesson.storyText}
                                </div>
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
                                <Target className="w-5 h-5 text-accent" />
                                <h3 className="font-semibold text-accent-foreground">Learning Objectives</h3>
                            </div>
                            
                            <ul className="space-y-3">
                                {lesson.objectives.map((objective, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-medium text-accent">{index + 1}</span>
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