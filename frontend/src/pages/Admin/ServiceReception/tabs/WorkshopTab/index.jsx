import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, pointerWithin, DragOverlay } from '@dnd-kit/core';
import { Modal, Form, InputNumber } from 'antd';
import GanttSkeleton from './components/GanttSkeleton';
import { useWorkshopLogic } from './hooks/useWorkshopLogic';
import FilterToolbar from './components/FilterToolbar';
import GanttGrid from './components/GanttGrid';
import ROBlock from './components/GanttGrid/ROBlock';
import UnassignedQueue from './components/UnassignedQueue';
import AssignmentModal from './components/Modals/AssignmentModal';

const WorkshopTab = ({ selectedDate }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        bookings,
        unassignedBookings,
        bays,
        technicians,
        isLoading,
        searchTerm,
        setSearchTerm,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        adjustDuration,
        pendingAssignment,
        confirmAssignment,
        cancelAssignment,
        selectedDateStr,
        isAddBayModalOpen,
        openAddBayModal,
        closeAddBayModal,
        createBay,
        deleteBay,
    } = useWorkshopLogic(selectedDate);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const handleAddBayOk = async () => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);
            await createBay(values.bay_number);
            form.resetFields();
        } catch (_) {
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddBayCancel = () => {
        form.resetFields();
        closeAddBayModal();
    };

    if (isLoading) {
        return <GanttSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0a0b] h-full p-4 md:p-6">
            <FilterToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddBay={openAddBayModal}
            />

            <div className="flex-1 overflow-hidden relative rounded-xl">
                <DndContext
                    sensors={sensors}
                    collisionDetection={pointerWithin}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex h-full w-full">
                        <div className="flex-1 h-full overflow-y-auto custom-scrollbar border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#0a0a0b]">
                            <GanttGrid bays={bays} bookings={bookings} technicians={technicians} adjustDuration={adjustDuration} activeBooking={activeBooking} selectedDateStr={selectedDateStr} onDeleteBay={deleteBay} />
                        </div>

                        <UnassignedQueue bookings={unassignedBookings} />
                    </div>

                    <DragOverlay>
                        {activeBooking ? <ROBlock booking={activeBooking} selectedDateStr={selectedDateStr} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <AssignmentModal
                visible={!!pendingAssignment}
                assignmentData={pendingAssignment}
                technicians={technicians}
                onConfirm={confirmAssignment}
                onCancel={cancelAssignment}
                selectedDate={selectedDate}
            />

            <Modal
                title="Thêm khoang sửa chữa"
                open={isAddBayModalOpen}
                onOk={handleAddBayOk}
                onCancel={handleAddBayCancel}
                okText="Tạo khoang"
                cancelText="Huỷ"
                confirmLoading={isSubmitting}
                width={360}
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="bay_number"
                        label="Số hiệu khoang"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số hiệu khoang' },
                            { type: 'number', min: 1, max: 99, message: 'Số hiệu từ 1 đến 99' },
                        ]}
                    >
                        <InputNumber
                            className="w-full"
                            placeholder="Ví dụ: 1, 2, 3..."
                            min={1}
                            max={99}
                            autoFocus
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default WorkshopTab;
