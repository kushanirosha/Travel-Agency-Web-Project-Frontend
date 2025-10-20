import React from 'react';

interface Award {
    title: string;
    description: string;
    year: number;
    iconUrl?: string;
}

const awards: Award[] = [
    {
        title: 'Best Travel Agency',
        description: 'Awarded for outstanding customer service and travel planning.',
        year: 2023,
        iconUrl: 'https://img.icons8.com/ios-filled/50/000000/trophy.png',
    },
    {
        title: 'Top Rated Tours',
        description: 'Recognized for providing top-rated tours worldwide.',
        year: 2022,
        iconUrl: 'https://img.icons8.com/ios-filled/50/000000/medal.png',
    },
    {
        title: 'Excellence in Innovation',
        description: 'Honored for innovative travel solutions.',
        year: 2021,
        iconUrl: 'https://img.icons8.com/ios-filled/50/000000/star.png',
    },
];

const AwardSection: React.FC = () => (
    <section style={{ padding: '2rem 0', background: '#ffffffff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Awards</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {awards.map((award) => (
                <div
                    key={award.title}
                    style={{
                        background: '#fff',
                        padding: '1.5rem',
                        minWidth: '220px',
                        textAlign: 'center',
                    }}
                >
                    {award.iconUrl && (
                        <img src={award.iconUrl} alt={award.title} style={{ width: 40, marginBottom: 12 }} />
                    )}
                    <h3 style={{ margin: '0.5rem 0' }}>{award.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>{award.description}</p>
                    <span style={{ fontWeight: 600, color: '#0078d4' }}>{award.year}</span>
                </div>
            ))}
        </div>
    </section>
);

export default AwardSection;