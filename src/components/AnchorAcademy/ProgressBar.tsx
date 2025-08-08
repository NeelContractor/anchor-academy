import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Star, Target } from 'lucide-react';

interface ProgressBarProps {
    xp: number;
    level: number;
    streak: number;
    completedLessons: number;
    totalLessons: number;
}

export const ProgressBar = ({ xp, level, streak, completedLessons, totalLessons }: ProgressBarProps) => {
    // Fix 1: Calculate XP needed for next level correctly
    const xpToNextLevel = 100; // XP needed to level up (always 100)
    
    // Fix 2: Calculate current level XP properly
    const currentLevelXp = xp % 100; // Remainder gives current level progress
    
    // Fix 3: Fix the progress percentage calculation
    const progressToNextLevel = Math.max(0, (currentLevelXp / xpToNextLevel) * 100);
    
    // Fix 4: Handle edge cases for display
    const displayCurrentLevelXp = Math.max(0, currentLevelXp);
    const displayProgressPercentage = Math.min(100, Math.max(0, progressToNextLevel));

    return (
        <div className="bg-card border rounded-lg p-4 shadow-elegant">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center font-bold shadow-ocean">
                            {level}
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Astronaut Level {level}</h3>
                            <p className="text-sm text-muted-foreground">{displayCurrentLevelXp}/{xpToNextLevel} XP</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <Badge variant="outline" className="bg-accent/10 border-accent/20">
                            <Flame className="w-4 h-4 mr-1 text-accent" />
                            {streak} day streak
                        </Badge>
                        
                        <Badge variant="outline" className="bg-success/10 border-success/20">
                            <Target className="w-4 h-4 mr-1 text-success" />
                            {completedLessons}/{totalLessons} lessons
                        </Badge>
                        
                        <Badge variant="outline" className="bg-primary/10 border-primary/20">
                            <Star className="w-4 h-4 mr-1 text-primary" />
                            {Math.max(0, xp)} XP
                        </Badge>
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to next level</span>
                    <span className="font-medium text-foreground">{Math.round(displayProgressPercentage)}%</span>
                </div>
                
                <Progress
                    value={displayProgressPercentage}
                    className="h-3 bg-muted/30"
                />
            </div>
        </div>
    );
};