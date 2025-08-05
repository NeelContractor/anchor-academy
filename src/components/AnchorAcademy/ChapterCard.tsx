import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Chapter } from '../types/lessons';

interface ChapterCardProps {
    chapter: Chapter;
    progress: number;
    onClick: () => void;
}

export const ChapterCard = ({ chapter, progress, onClick }: ChapterCardProps) => {
  const completedLessons = chapter.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = chapter.lessons.length;
  
  return (
    <Card 
        className="p-6 cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 group border-primary/10 hover:border-primary/30"
        onClick={onClick}
    >
        <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full ${chapter.color} flex items-center justify-center text-2xl shadow-treasure`}>
                    {chapter.icon}
                </div>
                
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {completedLessons}/{totalLessons} lessons
                </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {chapter.title}
        </h3>
      
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {chapter.description}
        </p>

        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            
            <Progress 
                value={progress} 
                className="h-2 bg-muted/30"
            />
        </div>

        {chapter.completed && (
            <div className="mt-4 flex items-center gap-2 text-success">
                <span className="text-sm font-medium">🏆 Chapter Completed!</span>
            </div>
        )}
    </Card>
  );
};