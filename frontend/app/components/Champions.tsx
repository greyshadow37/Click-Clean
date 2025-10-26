// components/Champions.tsx
import React, { useMemo } from 'react';
import { appData, CommunityReporter } from '../../lib/data';

interface ReporterRowProps {
    reporter: CommunityReporter;
    index: number;
}

const ReporterRow: React.FC<ReporterRowProps> = ({ reporter, index }) => {
    const rank = index + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';

    return (
        <tr className={rankClass}>
            <td>
                <span className="rank-badge">{rank}</span>
            </td>
            <td>{reporter.name}</td>
            <td>{reporter.city}</td>
            <td>{reporter.issuesResolved} issues</td>
            <td>{reporter.trainingCompleted}</td>
        </tr>
    );
};

const Champions: React.FC = () => {
    // Sort reporters by issues resolved (descending)
    const sortedReporters = useMemo(() => {
        return [...appData.communityReporters].sort((a, b) => b.issuesResolved - a.issuesResolved);
    }, []);

    return (
        <div className="page page--active" id="champions">
            <div className="container">
                <h1 className="page-header">Community Reporters Leaderboard</h1>

                <section className="section">
                    <h2 className="section-title">Top Community Reporters</h2>
                    <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
                        Recognizing individuals who have made the biggest impact on civic issue resolution and community engagement.
                    </p>

                    <div className="leaderboard-container" style={{ overflowX: 'auto' }}>
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Reporter</th>
                                    <th>City</th>
                                    <th>Issues Resolved</th>
                                    <th>Modules Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedReporters.map((reporter, index) => (
                                    <ReporterRow key={reporter.id} reporter={reporter} index={index} />
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
