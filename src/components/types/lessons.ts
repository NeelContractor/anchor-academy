export interface Tests {
    name: string,
    description: string,
    check: string,
    points: number
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    chapter: number;
    order: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    storyText: string;
    objectives: string[];
    code: {
      initial: string;
      solution: string;
      tests: Tests[];
    };
    hints: string[];
    completed: boolean;
    locked: boolean;
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    lessons: Lesson[];
    completed: boolean;
}

export interface UserProgress {
    currentLesson: string;
    completedLessons: string[];
    badges: Badge[];
    xp: number;
    streak: number;
    lastActiveDate: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    earnedAt: string;
}

export interface CodeChallenge {
    description: string;
    initialCode: string;
    solution: string;
    tests: {
        description: string;
        test: string;
    }[];
}