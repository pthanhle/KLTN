import { getMasterServiceSession } from '../utils/trackingDataUtils';

export const getProgressData = (trackingId) => {
    const serviceSession = getMasterServiceSession(trackingId);

    const baseProgress = {
        id: trackingId, overall_progress: 65, current_operation_code: 'SUSPENSION', current_operation_name: 'ĐANG THI CÔNG GẦM & PHANH', estimated_ready_at: '2026-03-26T15:30:00Z',
        hero_image_url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',
        timeline_steps: [
            { id: 'step_1', status: 'done', title: 'Tiếp nhận & Lập hồ sơ', started_at: '2026-03-25T08:00:00Z', completed_at: '2026-03-25T08:15:00Z', description: 'Đã hoàn tất tiếp nhận, kiểm tra trầy xước.' },
            { id: 'step_2', status: 'done', title: 'Chẩn đoán điện tử', started_at: '2026-03-25T08:20:00Z', completed_at: '2026-03-25T09:45:00Z', description: 'Hoàn thành bóc tách mỡ khung gầm và kiểm tra hệ thống treo.' },
            { id: 'step_3', status: 'active', title: 'Đang Thực Hiện: Hệ thống Treo & Phanh', started_at: '2026-03-25T11:30:00Z', completed_at: null, mechanic: { name: serviceSession?.mechanic_info?.name, role: serviceSession?.mechanic_info?.level, avatar: serviceSession?.mechanic_info?.avatar }, evidence_images: [{ id: 'img1', url: 'https://images.unsplash.com/photo-1625047509168-a71c6e95b2c7?w=400', alt: 'Brake pad' }] },
            { id: 'step_warning_1', status: 'warning', title: 'Tạm dừng & Chờ Xác Nhận Thêm', started_at: '2026-03-25T14:30:00Z', completed_at: null, description: 'Phát hiện đĩa phanh bị xước sâu không thể vớt lại, bắt buộc thay đĩa phanh mới.', mechanic: { name: 'Trần Văn Hải', role: 'Cố vấn Dịch vụ', avatar: 'https://i.pravatar.cc/150' }, approval_request: { id: 'ar_001', issue_title: 'Phát hiện đĩa phanh bị xước sâu', technician_note: 'Đĩa phanh trước do lâu ngày mòn má phanh đã ăn sâu vào thép, không thể láng lại.', action_required: 'Thay cặp đĩa phanh tản nhiệt cao cấp', total_price: 15000000, status: 'approved' } },
            { id: 'step_4', status: 'pending', title: 'Kiểm Định Chất Lượng (QC) & Bàn Giao', started_at: null, completed_at: null, description: 'Kiểm tra lực phanh trên máy Dyno chuyên dụng.' }
        ],
        parts_inventory: [
            { id: 'p1', sku: 'PT-BUSH-A', name: 'Bộ bọc cao su càng A', status_code: 'DONE', fulfillment_percentage: 100 },
            { id: 'p2', sku: 'PT-BRK-01', name: 'Bộ má phanh gốm', status_code: 'INSTALLING', fulfillment_percentage: 60 },
            { id: 'p3', sku: 'PT-BRK-DSC', name: 'Cặp đĩa phanh tản nhiệt', status_code: 'PENDING', fulfillment_percentage: 10, estimated_arrival_at: '2026-03-25T16:00:00Z' }
        ],
        system_activity: [
            { id: 'log_1', timestamp: '2026-03-25T14:35:00Z', type_code: 'WARNING', message: 'Treo hệ thống do phát sinh vật tư Đĩa Phanh.' },
            { id: 'log_2', timestamp: '2026-03-25T11:30:00Z', type_code: 'INFO', message: 'Bắt đầu quy trình tháo bánh xe và hệ thống treo.' }
        ]
    };

    if (['SRV-2026-R22', 'SRV-2026-X11A', 'SRV-2026-Y22B', 'SRV-2026-Z33C', 'SRV-2026-R11'].includes(trackingId)) {
        return { ...baseProgress, overall_progress: 10, timeline_steps: [baseProgress.timeline_steps[0]], parts_inventory: [], system_activity: [] };
    }

    // Removed B77P override so it defaults to baseProgress
    // Đã duyệt (RO_CREATED)
    if (['SRV-2026-W11', 'SRV-2026-W22'].includes(trackingId)) {
        const roSteps = [...baseProgress.timeline_steps];
        roSteps[2] = { ...roSteps[2], status: 'active', title: 'Chuẩn bị vật tư & Phân khoang', description: 'Đang chuẩn bị linh kiện để thi công' };
        roSteps[3] = { ...roSteps[3], status: 'pending' };
        return { ...baseProgress, overall_progress: 40, timeline_steps: roSteps, system_activity: [] };
    }

    // Hoàn thành
    if (['SRV-2026-X99R'].includes(trackingId)) {
        const doneSteps = baseProgress.timeline_steps.map(s => ({ ...s, status: 'done', completed_at: '2026-05-20T10:00:00Z' }));
        return { ...baseProgress, overall_progress: 100, timeline_steps: doneSteps, parts_inventory: baseProgress.parts_inventory.map(p => ({ ...p, status_code: 'DONE', fulfillment_percentage: 100 })) };
    }

    return baseProgress;
};
