"use client"

import { ArrowLeft, Star, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react"
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Chapter, Lesson, UserProgress } from "../types/lessons";
import { LessonView } from "./LessonView";
import { LessonCard } from "./LessonCard";
import { ProgressBar } from "./ProgressBar";
import { ChapterCard } from "./ChapterCard";
import { chapters } from "../data/lessons";

export default function Dashboard() {
    const [currentView, setCurrentView] = useState<'dashboard' | "chapter" | "lesson">("dashboard");
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [userProgress, setUserProgress] = useState<UserProgress>({
        currentLesson: '',
        completedLessons: [],
        badges: [],
        xp: 150,
        streak: 3,
        lastActiveDate: new Date().toISOString()
    });

    //calculate user level
    const userLevel = Math.floor(userProgress.xp / 100) + 1;
    const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

    const handleChapterClick = (chapter: Chapter) => {
        setSelectedChapter(chapter);
        setCurrentView("chapter");
    }

    const handleLessonStart = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setCurrentView("lesson");
    }

    const handleLessonComplete = (lessonId: string) => {
        setUserProgress(prev => ({
            ...prev,
            completedLessons: [...prev.completedLessons, lessonId],
            xp: prev.xp + 50,
            streak: prev.streak + 1,
        }));
        setCurrentView("chapter");
    }

    const getChapterProgress = (chapter: Chapter) => {
        const completedCount = chapter.lessons.filter(lesson => 
            userProgress.completedLessons.includes(lesson.id)
        ).length;
        return (completedCount / chapter.lessons.length) * 100;
    };

    useEffect(() => {
        chapters.forEach(chapter => {
            chapter.lessons.forEach((lesson, index) => {
                if (index === 0) {
                    lesson.locked = false; // first lesson alway unlocked
                } else {
                    const previousLesson = chapter.lessons[index - 1];
                    lesson.locked = !userProgress.completedLessons.includes(previousLesson.id);
                }
                lesson.completed = userProgress.completedLessons.includes(lesson.id);
            });
        });
    }, [userProgress.completedLessons]);

    if (currentView == 'lesson' && selectedLesson) {
        return (
            <LessonView 
                lesson={selectedLesson}
                onBack={() => setCurrentView("chapter")}
                onComplete={handleLessonComplete}
            />
        )
    }

    if (currentView === 'chapter' && selectedChapter) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Chapter Header */}
                    <div className="mb-8">
                        <Button 
                            variant="ghost" 
                            onClick={() => setCurrentView('dashboard')}
                            className="mb-4 hover:bg-primary/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-16 h-16 rounded-full ${selectedChapter.color} flex items-center justify-center text-3xl shadow-cosmic`}>
                                {selectedChapter.icon}
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-galaxy bg-clip-text text-transparent font-orbitron">
                                {selectedChapter.title}
                                </h1>
                                <p className="text-xl text-muted-foreground">{selectedChapter.description}</p>
                            </div>
                        </div>
                    </div>
        
                    {/* Lessons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedChapter.lessons.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            onStart={() => handleLessonStart(lesson)}
                        />
                        ))}
                    </div>
                </div>
            </div>
        );
      }

    return (
        <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/10 border-b">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-6 font-orbitron">
                        <span className="bg-gradient-to-r from-white to-gray-300 inline-block text-transparent bg-clip-text font-[Orbitron]">Anchor Academy</span> 🚀
                    </h1>
                    <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-space">
                        Embark on an interstellar journey to master Anchor development! Learn Solana programming 
                        through interactive lessons, hands-on coding challenges, and space-themed missions.
                    </p>
                    
                    <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-5 h-5" />
                            <span>10,000+ astronauts</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Trophy className="w-5 h-5" />
                            <span>Interactive missions</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Star className="w-5 h-5" />
                            <span>Real Rust practice</span>
                        </div>
                    </div>
                </div>

                {/* Progress Overview */}
                <ProgressBar
                    xp={userProgress.xp}
                    level={userLevel}
                    streak={userProgress.streak}
                    completedLessons={userProgress.completedLessons.length}
                    totalLessons={totalLessons}
                />
            </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
            {/* Recent Activity */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground font-orbitron">Continue Your Mission</h2>
                
                {userProgress.completedLessons.length > 0 ? (
                    <Card className="p-6 border-accent/20 bg-accent/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    🌟 Excellent progress, Space Cadet!
                                </h3>
                                <p className="text-muted-foreground">
                                    You've completed {userProgress.completedLessons.length} missions. 
                                    Ready for your next galactic challenge?
                                </p>
                            </div>
                            <Button 
                                // variant="nebula" 
                                size="lg"
                            >
                                Continue Mission 🚀
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-6 border-primary/20 bg-primary/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    🛸 Ready for launch?
                                </h3>
                                <p className="text-muted-foreground">
                                    Start your cosmic Anchor development journey with Rust fundamentals!
                                </p>
                            </div>
                            <Button 
                                // variant="galaxy" 
                                size="lg"
                                onClick={() => handleChapterClick(chapters[0])}
                            >
                                Launch Mission 🚀
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            {/* Chapters */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground font-orbitron">Learning Galaxies</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            progress={getChapterProgress(chapter)}
                            onClick={() => handleChapterClick(chapter)}
                        />
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="w-12 h-12 bg-gradient-galaxy rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-cosmic">
                        💻
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Stellar Code Lab</h3>
                    <p className="text-muted-foreground">
                        Write and test real Rust code with our advanced space-grade editor
                    </p>
                </Card>
                
                <Card className="p-6 text-center border-accent/20 hover:border-accent/40 transition-colors">
                    <div className="w-12 h-12 bg-gradient-nebula rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-nebula">
                        🏆
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Mission Progress</h3>
                    <p className="text-muted-foreground">
                        Earn cosmic XP, unlock stellar badges, and track your galactic journey
                    </p>
                </Card>
                
                <Card className="p-6 text-center border-success/20 hover:border-success/40 transition-colors">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-2xl mx-auto mb-4 text-success-foreground">
                        🎯
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Interstellar Practice</h3>
                    <p className="text-muted-foreground">
                        Learn by building real Anchor programs and launching Solana applications
                    </p>
                </Card>
            </div>
        </div>
    </div>
    )
}