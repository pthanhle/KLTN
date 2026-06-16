import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Plus, Inbox } from 'lucide-react';
import { useVehicleUnitsQuery } from '../../../../../../services/queries/vehicleUnit.queries';
import VehicleUnitFormModal from './components/Modals/VehicleUnitFormModal';
import VehicleUnitTimelineModal from './components/Modals/VehicleUnitTimelineModal';
import VehicleUnitTable from './components/Tables/VehicleUnitTable';
import VehicleUnitHeader from './components/Headers/VehicleUnitHeader';
import VehicleUnitEmptyState from './components/EmptyStates/VehicleUnitEmptyState';

const VehicleUnitsTab = ({ carId, form }) => {
    const { t } = useTranslation('adminCars');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const carColors = form?.getFieldValue('colors') || [];

    const { data: response, isLoading } = useVehicleUnitsQuery({ carId, limit: 100 });
    const units = response?.data || [];

    if (!carId) {
        return <VehicleUnitEmptyState />;
    }

    const handleEdit = (record) => {
        setSelectedUnit(record);
        setIsFormOpen(true);
    };

    const handleViewTimeline = (record) => {
        setSelectedUnit(record);
        setIsTimelineOpen(true);
    };

    const handleAddNew = () => {
        setSelectedUnit(null);
        setIsFormOpen(true);
    };

    return (
        <div className="w-full max-w-6xl mx-auto pb-32 pt-8">
            <div className="space-y-6 animate-in fade-in duration-500">
                <VehicleUnitHeader onAddNew={handleAddNew} />

                <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                    <VehicleUnitTable 
                        units={units} 
                        isLoading={isLoading} 
                        onEdit={handleEdit} 
                        onViewTimeline={handleViewTimeline}
                    />
                </div>

                <VehicleUnitFormModal 
                    open={isFormOpen} 
                    onClose={() => setIsFormOpen(false)} 
                    unit={selectedUnit}
                    carId={carId}
                    carColors={carColors}
                />

                <VehicleUnitTimelineModal 
                    open={isTimelineOpen}
                    onClose={() => setIsTimelineOpen(false)}
                    unitId={selectedUnit?.id}
                />
            </div>
        </div>
    );
};

export default VehicleUnitsTab;
