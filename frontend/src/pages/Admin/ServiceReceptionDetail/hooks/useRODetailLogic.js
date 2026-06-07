import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminRepairAPI } from '../../../../services/api/adminRepair.api';

const STEP_ORDER = ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'WAITING_PARTS', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED'];

const STEP_LABELS = {
    RECEIVED: 'Tiếp nhận & Lập hồ sơ',
    DIAGNOSING: 'Chẩn đoán điện tử',
    QUOTING: 'Lập báo giá',
    WAITING_PARTS: 'Chuẩn bị phụ tùng',
    IN_PROGRESS: 'Đang thi công',
    QC_TESTING: 'Kiểm định chất lượng (QC)',
    COMPLETED: 'Bàn giao xe',
};

const PARTS_STATUS_MAP = {
    WAITING: 'PENDING',
    IN_PROGRESS: 'INSTALLING',
    COMPLETED: 'DONE',
};

const mapAPIToROData = (p) => {
    const booking = p.booking_id || {};
    const user = booking.user_id || {};
    const vehicle = booking.vehicle_info || {};
    const timeline = p.timeline || [];

    // ----------- overview -----------
    const receivedStep = timeline.find(t => t.step === 'RECEIVED');
    const receptionInfo = receivedStep?.reception_info || {};

    const overview = {
        booking_code: booking.booking_code || p._id,
        status: p.status,
        customer_note: booking.customer_notes || '',
        customer_info: {
            full_name: user.full_name || 'Khách hàng',
            phone: user.phone || '',
            email: user.email || '',
        },
        vehicle_info: {
            license_plate: vehicle.license_plate || '',
            model: vehicle.model || vehicle.brand || '',
            brand: vehicle.brand || '',
            color: vehicle.color || '',
            image_url: vehicle.image_url || null,
        },
        health_hud: {
            odometer: receptionInfo.odometer || 0,
            fuel_level: receptionInfo.fuel_level || 0,
        },
    };

    // ----------- diagnostics -----------
    const diagStep = timeline.find(t => t.step === 'DIAGNOSING');
    let diagnosticData = null;
    if (diagStep?.diagnostics?.length) {
        const allItems = diagStep.diagnostics.flatMap(cat => cat.items || []);
        const summary = {
            total_items: allItems.length,
            normal: allItems.filter(i => i.status === 'normal').length,
            warning: allItems.filter(i => i.status === 'warning').length,
            critical: allItems.filter(i => i.status === 'critical').length,
        };
        const groups = diagStep.diagnostics.map(cat => ({
            id: cat.id || cat.title,
            title: cat.title,
            totalCount: (cat.items || []).length,
            technician_note: cat.technician_note || '',
            items: (cat.items || []).map(item => ({
                name: item.name,
                status: item.status || 'normal',
                action_required: item.action_required || '',
            })),
        }));
        diagnosticData = { groups, summary, conclusion: diagStep.notes || '' };
    }

    // ----------- quotation -----------
    const q = p.quotation || {};
    const parts = (q.parts || []).map(part => ({
        id: part.sku || part.name,
        type: 'part',
        sku: part.sku || '',
        name: part.name,
        quantity: part.quantity || 0,
        unit_price: part.unit_price || 0,
        total_price: (part.quantity || 0) * (part.unit_price || 0),
    }));
    const labors = (q.labors || []).map(labor => ({
        id: labor.description,
        type: 'labor',
        name: labor.description,
        quantity: labor.hours || 0,
        unit_price: labor.rate || 0,
        total_price: (labor.hours || 0) * (labor.rate || 0),
    }));
    const items = [...parts, ...labors];
    const servicePackageTotal = q.service_package_total || 0;
    const subtotal = items.reduce((s, i) => s + i.total_price, 0) + servicePackageTotal;
    const vat_rate = q.vat_rate || 0.1;
    const vat_amount = subtotal * vat_rate;
    const grand_total = subtotal + vat_amount;
    const deposit_amount = q.deposit_amount || 0;
    const remaining_amount = Math.max(0, grand_total - deposit_amount);

    let quotationData = null;
    if (items.length > 0 || q.status === 'APPROVED') {
        quotationData = {
            status: q.status || 'PENDING',
            service_package_total: servicePackageTotal,
            items,
            summary: { vat_amount, grand_total, subtotal },
            payment_terms: {
                deposit_amount,
                remaining_amount,
                deposit_status: q.status === 'APPROVED' ? 'PAID' : 'PENDING',
            },
        };
    }

    // ----------- progress (roadmap + logistics) -----------
    const currentStepIdx = STEP_ORDER.indexOf(p.current_step || p.status);

    const timeline_steps = STEP_ORDER.map((stepKey, idx) => {
        const timelineStep = timeline.find(t => t.step === stepKey);
        let status;
        if (idx < currentStepIdx) {
            status = 'done';
        } else if (idx === currentStepIdx) {
            status = (stepKey === 'QUOTING' && q.status === 'PENDING') ? 'warning' : 'active';
        } else {
            status = 'pending';
        }
        return {
            id: stepKey,
            title: STEP_LABELS[stepKey],
            status,
            started_at: timelineStep?.time || null,
        };
    });

    const parts_inventory = (p.parts_usage || []).map((part, i) => ({
        id: part.sku || i,
        name: part.name,
        sku: part.sku || '',
        status_code: PARTS_STATUS_MAP[part.status] || 'PENDING',
        fulfillment_percentage: part.progress || 0,
    }));

    const progressData = { timeline_steps, parts_inventory };

    // ----------- qc -----------
    const qcStep = timeline.find(t => t.step === 'QC_TESTING');
    let qcData = null;
    if (qcStep?.qc_checklist?.length) {
        qcData = {
            kcs_tasks: qcStep.qc_checklist.map((task, i) => ({
                id: i,
                title: task.task,
                status: task.status || 'pending',
                checked_by: '',
                notes: '',
            })),
        };
    }

    return { overview, diagnostic: diagnosticData, quotation: quotationData, progress: progressData, qc: qcData };
};

export const useRODetailLogic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [roData, setRoData] = useState(null);
    const [bookingCode, setBookingCode] = useState(id);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            setIsLoading(true);
            try {
                const raw = await AdminRepairAPI.getRepairProgressById(id);
                const mapped = mapAPIToROData(raw);
                setBookingCode(raw.booking_id?.booking_code || id);
                setRoData(mapped);
            } catch (err) {
                console.error('useRODetailLogic: failed to fetch', err);
                setRoData(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [id]);

    return { bookingCode, isLoading, roData };
};
