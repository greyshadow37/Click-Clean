import React, { useState } from 'react';
// Assuming Lucide icons are available in the Next.js environment
import { BookOpen, CheckCircle, Clock, PlayCircle } from 'lucide-react';

// --- Data Structures (Typically imported from lib/data.ts) ---
interface TrainingModule {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    progress: number;
}

// Mock Data for a standalone component (replace with your actual import from lib/data.ts)
const mockTrainingModules: TrainingModule[] = [
    {"id": 1, "title": "Waste Segregation Basics", "duration": "30 mins", "completed": false, "progress": 0},
    {"id": 2, "title": "Home Composting Guide", "duration": "45 mins", "completed": false, "progress": 30},
    {"id": 3, "title": "Plastic Reuse Techniques", "duration": "25 mins", "completed": true, "progress": 100},
    {"id": 4, "title": "E-waste Management and Disposal", "duration": "35 mins", "completed": false, "progress": 60},
    {"id": 5, "title": "Community Clean-up Organization", "duration": "50 mins", "completed": false, "progress": 0},
];

// --- Sub-Component: Individual Training Card ---

interface TrainingModuleCardProps {
    module: TrainingModule;
    onStart: (moduleId: number) => void;
}

const TrainingModuleCard: React.FC<TrainingModuleCardProps> = ({ module, onStart }) => {
    const { id, title, duration, completed, progress } = module;

    // Determine status and styling dynamically
    const color = completed ? 'text-green-600' : (progress > 0 ? 'text-teal-500' : 'text-slate-500');
    const progressColor = completed ? 'bg-green-500' : 'bg-teal-400';
    
    let Icon = BookOpen;
    if (completed) {
        Icon = CheckCircle;
    } else if (progress > 0) {
        Icon = PlayCircle;
    }

    const buttonText = completed ? 'Review Module' : (progress > 0 ? 'Continue' : 'Start Now');

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
            <div>
                {/* Header and Icon */}
                <div className="flex items-start space-x-3 mb-4">
                    <Icon className={`w-6 h-6 mt-1 ${color}`} />
                    <h3 className="text-xl font-semibold text-gray-800 leading-tight">{title}</h3>
                </div>

                {/* Duration */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{duration}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center text-xs font-medium text-gray-600 mb-1">
                        <span>Progress:</span>
                        <span className={color}>{progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className={`h-full rounded-full ${progressColor}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Footer and Action */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className={`text-sm font-medium ${color}`}>
                    {completed ? 'Completed' : (progress > 0 ? 'In Progress' : 'Start Module')}
                </span>
                <button
                    onClick={() => onStart(id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

// --- New: Lesson Modal Component ---

interface LessonModalProps {
    module: TrainingModule | null;
    onClose: () => void;
    onAdvanceProgress: (moduleId: number) => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ module, onClose, onAdvanceProgress }) => {
    if (!module) return null;

    const handleAdvance = () => {
        onAdvanceProgress(module.id);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">{module.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Simulated Lesson Content */}
                    <div className="prose max-w-none text-gray-700 mb-6">
                        <p>Welcome to your lesson! This section covers the fundamental concepts of **{module.title}**. To simulate learning, you can click the button below to advance your progress.</p>
                        
                        <h3 className="text-xl font-semibold mt-6">1. The Importance of Source Segregation</h3>
                        <p>Waste must be separated into at least two streams—wet (biodegradable) and dry (non-biodegradable)—at the source (homes, offices, shops). This simple step drastically improves recycling rates and reduces landfill load. </p>
                        
                        <h3 className="text-xl font-semibold mt-4">2. Key Actionable Steps</h3>
                        <ul className="list-disc pl-5">
                            <li>Identify your waste streams: Wet, Dry, Hazardous, and E-waste.</li>
                            <li>Use distinct bins for each category (e.g., Green for Wet, Blue for Dry).</li>
                            <li>Ensure wet waste is processed (composted) or collected daily.</li>
                        </ul>
                        
                        <p className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            **Did you know?** Over 60% of India's waste is still improperly dumped, leading to severe environmental and health issues. Your knowledge is key to changing this!
                        </p>

                        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600 flex justify-between items-center">
                            <span>Current Progress: **{module.progress}%**</span>
                            {module.progress < 100 && <span className="text-teal-600 font-semibold">Ready to advance!</span>}
                        </div>
                    </div>

                    {/* Modal Footer and Action Button */}
                    <div className="flex justify-end pt-4 border-t">
                        <button 
                            onClick={handleAdvance}
                            disabled={module.completed}
                            className={`px-6 py-3 text-white font-medium rounded-lg transition duration-150 shadow-md ${
                                module.completed 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                            }`}
                        >
                            {module.completed ? 'Lesson Complete' : 'Advance Progress'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Component: Training Page ---

const Training: React.FC = () => {
    // Use the mock data in state for dynamic updates
    const [modules, setModules] = useState<TrainingModule[]>(mockTrainingModules);
    // State to track which module is currently open in the modal
    const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
    const activeModule = modules.find(m => m.id === activeModuleId) || null;

    // Function to open the lesson modal
    const handleStartModule = (moduleId: number) => {
        setActiveModuleId(moduleId);
    };

    // Function to update module progress from inside the modal
    const handleAdvanceProgress = (moduleId: number) => {
        const module = modules.find(m => m.id === moduleId);
        if (module && !module.completed) {
            let newProgress = module.progress;
            
            // Advance progress by a significant step (e.g., 40% if starting, 33% otherwise)
            newProgress = Math.min(100, module.progress + (module.progress === 0 ? 40 : 33));
            
            const updatedModules = modules.map(m =>
                m.id === moduleId ? { ...m, progress: newProgress, completed: newProgress === 100 } : m
            );
            setModules(updatedModules);

            if (newProgress === 100) {
                // If completed, close the modal for a cleaner user flow
                setActiveModuleId(null);
            }
        }
    };

    const completedCount = modules.filter(m => m.completed).length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Skill Up: Green Training Modules</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Enhance your knowledge on sustainable waste management with these interactive courses.
                </p>

                {/* Progress Summary Card */}
                <div className="bg-indigo-600 text-white p-5 rounded-xl shadow-xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <span className="text-sm font-medium opacity-80">Your Training Status</span>
                        <p className="text-3xl font-bold mt-1">
                            {completedCount} of {modules.length} Modules Completed
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <span className="inline-block px-4 py-1.5 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                            {Math.round((completedCount / modules.length) * 100) || 0}% Complete
                        </span>
                    </div>
                </div>
                
                {/* Module Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map(module => (
                        <TrainingModuleCard 
                            key={module.id} 
                            module={module} 
                            onStart={handleStartModule} 
                        />
                    ))}
                </div>
            </div>

            {/* Lesson Modal (Renders if a module is active) */}
            {activeModule && (
                <LessonModal 
                    module={activeModule} 
                    onClose={() => setActiveModuleId(null)} 
                    onAdvanceProgress={handleAdvanceProgress}
                />
            )}
        </div>
    );
};

export default Training;
