"use client";

import React, { useState } from 'react';
import { appData, TrainingModule } from '../../lib/data';

// Mock Data for a standalone component (replace with your actual import from lib/data.ts)
const mockTrainingModules: TrainingModule[] = appData.trainingModules;

// --- Sub-Component: Individual Training Card ---

interface TrainingModuleCardProps {
    module: TrainingModule;
    onStart: (moduleId: string) => void;
}

const TrainingModuleCard: React.FC<TrainingModuleCardProps> = ({ module, onStart }) => {
    const { id, title, duration, completed, progress } = module;

    const buttonText = completed ? 'Review Module' : (progress > 0 ? 'Continue' : 'Start Now');

    return (
        <div className="module-card">
            <div className="module-info">
                <div>
                    <h3 className="module-title">{title}</h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        Duration: {duration}
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        Progress: {progress}%
                    </p>
                    <div className="module-progress-bar">
                        <div className="module-progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className="module-actions">
                    <button 
                        className="btn btn--primary btn--small" 
                        onClick={() => onStart(id)}
                    >
                        <i className="fas fa-play"></i> {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- New: Lesson Modal Component ---

interface LessonModalProps {
    module: TrainingModule | null;
    onClose: () => void;
    onAdvanceProgress: (moduleId: string) => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ module, onClose, onAdvanceProgress }) => {
    if (!module) return null;

    const handleAdvance = () => {
        onAdvanceProgress(module.id);
    };

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="modal-title">{module.title}</h2>
                
                <div style={{ marginBottom: '20px' }}>
                    <p>Welcome to your lesson! This section covers the fundamental concepts of civic engagement and issue reporting.</p>
                    
                    <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>1. Understanding Civic Issues</h3>
                    <p>Civic issues include potholes, streetlight problems, garbage collection, and other community concerns that affect daily life.</p>
                    
                    <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>2. How to Report Effectively</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>Take clear photos of the issue</li>
                        <li>Provide accurate location details</li>
                        <li>Describe the problem clearly</li>
                        <li>Choose the appropriate priority level</li>
                    </ul>
                    
                    <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f8ff', border: '1px solid #add8e6', borderRadius: '4px' }}>
                        <strong>Did you know?</strong> Active community reporting helps cities address issues faster and improve quality of life for everyone!
                    </div>

                    <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Current Progress: <strong>{module.progress}%</strong></span>
                        {module.progress < 100 && <span style={{ color: 'var(--color-primary)' }}>Ready to advance!</span>}
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button"
                        className="btn btn--secondary"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button 
                        type="button"
                        className="btn btn--primary"
                        onClick={handleAdvance}
                        disabled={module.completed}
                    >
                        {module.completed ? 'Lesson Complete' : 'Advance Progress'}
                    </button>
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
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
    const activeModule = modules.find(m => m.id === activeModuleId) || null;

    // Function to open the lesson modal
    const handleStartModule = (moduleId: string) => {
        setActiveModuleId(moduleId);
    };

    // Function to update module progress from inside the modal
    const handleAdvanceProgress = (moduleId: string) => {
        const currentModule = modules.find(m => m.id === moduleId);
        if (currentModule && !currentModule.completed) {
            let newProgress = currentModule.progress;
            
            // Advance progress by a significant step (e.g., 40% if starting, 33% otherwise)
            newProgress = Math.min(100, currentModule.progress + (currentModule.progress === 0 ? 40 : 33));
            
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
        <div className="page page--active" id="training">
            <div className="container">
                <h1 className="page-header">Civic Education & Training</h1>
                <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
                    Learn how to effectively report and track civic issues in your community.
                </p>

                {/* Progress Summary */}
                <section className="section">
                    <h2 className="section-title">Your Learning Progress</h2>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1, padding: '16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', opacity: 0.8 }}>Modules Completed</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{completedCount} of {modules.length}</div>
                        </div>
                        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Overall Progress</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {Math.round((completedCount / modules.length) * 100) || 0}%
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Module Grid */}
                <section className="section">
                    <h2 className="section-title">Available Training Modules</h2>
                    <div className="training-modules-grid">
                        {modules.map(module => (
                            <TrainingModuleCard 
                                key={module.id} 
                                module={module} 
                                onStart={handleStartModule} 
                            />
                        ))}
                    </div>
                </section>
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
