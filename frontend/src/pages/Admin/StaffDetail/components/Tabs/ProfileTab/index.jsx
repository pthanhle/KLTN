import React from 'react';
import { PersonalDetailsSection } from './components/PersonalDetailsSection';
import { SystemSettingsSection } from './components/SystemSettingsSection';

const ProfileTab = ({ staff }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PersonalDetailsSection staff={staff} />
            <SystemSettingsSection staff={staff} />
        </div>
    );
};

export default ProfileTab;
