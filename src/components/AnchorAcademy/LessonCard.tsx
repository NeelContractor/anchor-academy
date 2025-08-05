import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trophy, Lock, CheckCircle } from 'lucide-react';
import { Lesson } from '../types/lessons';

interface LessonCardProps {
  lesson: Lesson;
  onStart: () => void;
}

export const LessonCard = ({ lesson, onStart }: LessonCardProps) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
        case 'beginner': return 'bg-success/10 text-success border-success/20';
        case 'intermediate': return 'bg-accent/10 text-accent-foreground border-accent/20';
        case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
        default: return 'bg-muted/10 text-muted-foreground border-muted/20';
        }
    };

    const getStatusIcon = () => {
        if (lesson.completed) return <CheckCircle className="w-5 h-5 text-success" />;
        if (lesson.locked) return <Lock className="w-5 h-5 text-muted-foreground" />;
        return <Trophy className="w-5 h-5 text-white" />;
    };

    return (
        <Card className={`p-6 transition-all duration-300 hover:shadow-elegant group ${
            lesson.locked 
                ? 'opacity-60 cursor-not-allowed' 
                : lesson.completed 
                ? 'border-success/30 bg-success/5 hover:border-success/50' 
                : 'hover:border-primary/50 hover:shadow-ocean cursor-pointer'
            }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                    </Badge>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lesson.estimatedTime}m</span>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {lesson.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {lesson.description}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                        Chapter {lesson.chapter} • Lesson {lesson.order}
                    </span>
                </div>
                
                <Button 
                    onClick={onStart}
                    disabled={lesson.locked}
                    variant={lesson.completed ? "outline" : "default"}
                    className={lesson.completed 
                        ? "hover:bg-success/10 border-success/20 text-success" 
                        : "bg-gradient-ocean hover:bg-primary/90 shadow-ocean bg-white"
                    }
                >
                    {lesson.completed ? '📖 Review' : lesson.locked ? '🔒 Locked' : '🚀 Start'}
                </Button>
            </div>

            {!lesson.locked && (
                <div className="mt-4 pt-4 border-t border-border/50">
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Learning objectives:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        {lesson.objectives.slice(0, 2).map((objective, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                {objective}
                            </li>
                        ))}
                        {lesson.objectives.length > 2 && (
                            <li className="font-medium text-white">
                                +{lesson.objectives.length - 2} more objectives
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </Card>
    );
};