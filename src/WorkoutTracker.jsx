// WorkoutTracker.jsx
import { useState, useEffect } from 'react';
import './WorkoutTracker.css'; // Import the CSS file

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState([]);
    const [stats, setStats] = useState({
        steps: 0,
        caloriesBurned: 0,
        caloriesConsumed: 0
    });
    const [goals, setGoals] = useState({
        weight: 0,
        steps: 10000,
        calories: 2000
    });
    const [currentWeight, setCurrentWeight] = useState(0);
    const [activeTab, setActiveTab] = useState('workouts');
    const [newWorkout, setNewWorkout] = useState({
        name: '',
        type: 'strength',
        weight: '',
        sets: '',
        reps: '',
        completed: false
    });

    useEffect(() => {
        setStats(prev => ({
            ...prev,
            caloriesBurned: Math.round(prev.steps * 0.04)
        }));
    }, [stats.steps]);

    const handleAddWorkout = () => {
        if (newWorkout.name && newWorkout.sets && newWorkout.reps) {
            setWorkouts([
                ...workouts,
                {
                    ...newWorkout,
                    id: Date.now(),
                    createdAt: new Date().toLocaleString(),
                    completedAt: null
                }
            ]);
            setNewWorkout({
                name: '', type: 'strength', weight: '', sets: '', reps: '', completed: false
            });
        }
    };

    const toggleWorkoutCompletion = (id) => {
        setWorkouts(workouts.map(workout =>
            workout.id === id
                ? {
                    ...workout,
                    completed: !workout.completed,
                    completedAt: !workout.completed ? new Date().toLocaleString() : null
                }
                : workout
        ));
    };

    const deleteWorkout = (id) => {
        setWorkouts(workouts.filter(workout => workout.id !== id));
    };

    const handleStatsChange = (e) => {
        const { name, value } = e.target;
        setStats(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleGoalsChange = (e) => {
        const { name, value } = e.target;
        setGoals(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Fitness Tracker</h1>
                <div className="title-underline"></div>
            </header>

            <div className="main-container">
                <div className="tab-container">
                    <button className={`tab-button ${activeTab === 'workouts' ? 'active-tab' : ''}`} onClick={() => setActiveTab('workouts')}>
                        <span className="tab-icon">💪</span> Workouts
                    </button>
                    <button className={`tab-button ${activeTab === 'stats' ? 'active-tab' : ''}`} onClick={() => setActiveTab('stats')}>
                        <span className="tab-icon">📊</span> Stats
                    </button>
                    <button className={`tab-button ${activeTab === 'goals' ? 'active-tab' : ''}`} onClick={() => setActiveTab('goals')}>
                        <span className="tab-icon">🎯</span> Goals
                    </button>
                </div>

                {activeTab === 'workouts' && (
                    <div className="tab-content">
                        <div className="section-container">
                            <div className="form-card">
                                <h3 className="section-title">Add New Workout</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Exercise Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={newWorkout.name}
                                            onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                                            placeholder="Exercise name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Type</label>
                                        <select
                                            className="form-select"
                                            value={newWorkout.type}
                                            onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
                                        >
                                            <option value="strength">Strength</option>
                                            <option value="cardio">Cardio</option>
                                            <option value="flexibility">Flexibility</option>
                                            <option value="balance">Balance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Weight (lbs)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={newWorkout.weight}
                                            onChange={(e) => setNewWorkout({...newWorkout, weight: e.target.value})}
                                            placeholder="Weight"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Sets</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={newWorkout.sets}
                                            onChange={(e) => setNewWorkout({...newWorkout, sets: e.target.value})}
                                            placeholder="Sets"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Reps</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={newWorkout.reps}
                                            onChange={(e) => setNewWorkout({...newWorkout, reps: e.target.value})}
                                            placeholder="Reps"
                                        />
                                    </div>
                                </div>
                                <button className="add-button" onClick={handleAddWorkout}>+ Add Workout</button>
                            </div>
                        </div>

                        <h3 className="section-title">Your Workouts</h3>
                        {workouts.length === 0 ? (
                            <div className="empty-message">No workouts added yet. Add your first workout above!</div>
                        ) : (
                            <div className="workout-list">
                                {workouts.map(workout => (
                                    <div key={workout.id} className={`workout-card ${workout.completed ? 'completed-workout' : 'pending-workout'}`}>
                                        <div className="workout-header">
                                            <h4 className="workout-name">{workout.name}</h4>
                                            <span className="workout-type">
                                                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="workout-details">
                                            <div>Weight: {workout.weight ? `${workout.weight} lbs` : 'N/A'}</div>
                                            <div>Sets: {workout.sets}</div>
                                            <div>Reps: {workout.reps}</div>
                                        </div>
                                        <div className="workout-timestamps">
                                            <div>Created: {workout.createdAt}</div>
                                            {workout.completed && <div>Completed: {workout.completedAt}</div>}
                                        </div>
                                        <div className="workout-actions">
                                            <button className={`action-button ${workout.completed ? 'complete-button' : 'mark-button'}`} onClick={() => toggleWorkoutCompletion(workout.id)}>
                                                ✓ {workout.completed ? 'Completed' : 'Mark Complete'}
                                            </button>
                                            <button className="action-button delete-button" onClick={() => deleteWorkout(workout.id)}>
                                                ✕ Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="tab-content">
                        <h3 className="section-title">Daily Statistics</h3>
                        {/* your original stats tab code stays here */}
                    </div>
                )}

                {activeTab === 'goals' && (
                    <div className="tab-content">
                        <h3 className="section-title">Set Your Goals</h3>
                        {/* your original goals tab code stays here */}
                    </div>
                )}
            </div>
        </div>
    );
}
