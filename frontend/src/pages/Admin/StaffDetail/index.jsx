import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StaffDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="p-10 text-white">
            <button onClick={() => navigate('/admin/staff')} className="mb-4 text-blue-400 hover:text-blue-300">&larr; Back to Staff Directory</button>
            <h1 className="text-2xl font-bold">Staff Detail Page</h1>
            <p className="mt-4 text-slate-400">Editing employee with ID: {id}</p>
            <p className="mt-2 text-slate-500">The detailed configuration forms will be implemented here later.</p>
        </div>
    );
};

export default StaffDetail;
