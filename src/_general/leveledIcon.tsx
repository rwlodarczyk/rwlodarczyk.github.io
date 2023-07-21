import React from 'react';

type LeveledIconProps = {
    children: React.ReactNode;
}

const LeveledIcon = ({children}: LeveledIconProps) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            {children}
        </div>
    );
}

export default LeveledIcon;