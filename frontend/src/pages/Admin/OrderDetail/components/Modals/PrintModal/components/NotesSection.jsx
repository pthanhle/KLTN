import React from 'react';

export const NotesSection = ({ note, t }) => {
    if (!note) return null;
    return (
        <section className="bg-gray-100 p-3 rounded-lg border border-gray-300">
            <p className="font-bold mb-1">{t('print_note')}</p>
            <p className="font-display italic text-lg font-bold">{note}</p>
        </section>
    );
};
