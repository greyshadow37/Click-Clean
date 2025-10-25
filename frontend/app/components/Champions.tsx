// components/Champions.tsx
import React, { useMemo } from 'react';
import { appData, GreenChampion } from '../../lib/data';

interface ChampionRowProps {
    champion: GreenChampion;
    index: number;
}

const ChampionRow: React.FC<ChampionRowProps> = ({ champion, index }) => {
    const rank = index + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';

    return (
        <tr className={rankClass}>
            <td>
                <span className="rank-badge">{rank}</span>
            </td>
            <td>{champion.name}</td>
            <td>{champion.city}</td>
            <td>{champion.wasteDiverted} kg</td>
            <td>{champion.trainingCompleted}</td>
        </tr>
    );
};

const Champions: React.FC = () => {
    // Sort champions by waste diverted (descending)
    const sortedChampions = useMemo(() => {
        return [...appData.greenChampions].sort((a, b) => b.wasteDiverted - a.wasteDiverted);
    }, []);

    return (
        <div className="page page--active" id="champions">
            <div className="container">
                <h1 className="page-header">Green Champions Leaderboard</h1>

                <section className="section">
                    <h2 className="section-title">Top Green Champions</h2>
                    <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
                        Recognizing individuals who have made the biggest impact on waste diversion and training.
                    </p>

                    <div className="leaderboard-container" style={{ overflowX: 'auto' }}>
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Champion</th>
                                    <th>City</th>
                                    <th>Waste Diverted</th>
                                    <th>Modules Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedChampions.map((champion, index) => (
                                    <ChampionRow key={champion.id} champion={champion} index={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Champions;
