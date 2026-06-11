import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeSignatureDataUrl } from '../utils/trackingDataUtils';
import trackingApi from '../../../../services/api/tracking.api';
import { useSelector } from 'react-redux';

const IN_PROGRESS_STATUSES = ['IN_PROGRESS', 'QC_TESTING', 'COMPLETED'];

const mapProgressData = (p) => {
    if (!IN_PROGRESS_STATUSES.includes(p.status)) return null;

    const parts = p.parts_usage || [];
    const overallProgress = parts.length === 0
        ? (p.status === 'COMPLETED' ? 100 : 50)
        : Math.round(parts.reduce((sum, part) => {
            if (part.status === 'COMPLETED') return sum + 100;
            if (part.status === 'IN_PROGRESS') return sum + (part.progress || 50);
            return sum;
        }, 0) / parts.length);

    const timeline = p.timeline || [];
    const inProgressStep = timeline.find((s) => s.step === 'IN_PROGRESS');
    const mechanic = p.mechanic_id;
    const labors = p.quotation?.labors || [];

    const doneSteps = [];
    const receivedStep = timeline.find((s) => s.step === 'RECEIVED');
    if (receivedStep) {
        doneSteps.push({
            id: 'step_received',
            status: 'done',
            title: 'Tiếp nhận & Lập hồ sơ',
            completed_at: receivedStep.time,
            description: receivedStep.note || 'Đã hoàn tất tiếp nhận và kiểm tra tình trạng xe.',
        });
    }
    const diagStep = timeline.find((s) => s.step === 'DIAGNOSING');
    if (diagStep) {
        doneSteps.push({
            id: 'step_diag',
            status: 'done',
            title: 'Chẩn đoán điện tử',
            completed_at: diagStep.time,
            description: diagStep.notes || diagStep.note || 'Đã hoàn thành chẩn đoán kỹ thuật toàn diện.',
        });
    }

    const laborSteps = labors.map((labor, idx) => {
        let stepStatus;
        if (p.status === 'COMPLETED' || p.status === 'QC_TESTING') {
            stepStatus = 'done';
        } else {
            stepStatus = idx === 0 ? 'active' : 'pending';
        }
        return {
            id: `labor_${idx}`,
            status: stepStatus,
            title: labor.description,
            started_at: idx === 0 ? inProgressStep?.time : null,
            completed_at: stepStatus === 'done' ? inProgressStep?.time : null,
            description: labor.hours > 0 ? `${labor.hours} giờ công` : '',
            mechanic: (idx === 0 && mechanic) ? {
                name: mechanic.full_name,
                role: 'KỸ THUẬT VIÊN',
                avatar: mechanic.avatar || null,
            } : null,
            evidence_images: (idx === 0 && inProgressStep?.images?.length)
                ? inProgressStep.images.map((url, i) => ({ id: `img_${i}`, url, alt: `Hình ảnh thi công ${i + 1}` }))
                : [],
        };
    });

    const supplementSteps = (p.supplement_requests || []).map((req) => ({
        id: `supplement_${req._id}`,
        status: req.status === 'PENDING' ? 'warning' : req.status === 'APPROVED' ? 'done' : 'pending',
        title: req.title,
        started_at: req.created_at,
        description: req.description || '',
        approval_request: req.status !== 'REJECTED' ? {
            id: req._id,
            booking_code: p.booking_id?.booking_code,
            issue_title: req.title,
            technician_note: req.description,
            action_required: req.delay_reason || 'Phát sinh trong quá trình thi công',
            parts: req.parts || [],
            labors: req.labors || [],
            total_price: req.total_price || 0,
            status: req.status.toLowerCase(),
        } : null,
    }));

    const activeLaborTitle = laborSteps.find((s) => s.status === 'active')?.title;

    return {
        overall_progress: p.status === 'COMPLETED' ? 100 : overallProgress,
        current_operation_name: activeLaborTitle || (p.status === 'QC_TESTING' ? 'Đang Kiểm Định QC' : 'Đang Thi Công'),
        estimated_ready_at: p.estimated_completion || null,
        hero_image: inProgressStep?.images?.[0] || null,
        timeline_steps: [...doneSteps, ...laborSteps, ...supplementSteps],
        parts_inventory: parts.map((part, idx) => ({
            id: part.sku || `part_${idx}`,
            sku: part.sku || '',
            name: part.name,
            status_code: part.status === 'COMPLETED' ? 'DONE' : part.status === 'IN_PROGRESS' ? 'INSTALLING' : 'WAITING',
            fulfillment_percentage: part.status === 'COMPLETED' ? 100 : part.status === 'IN_PROGRESS' ? (part.progress || 50) : 0,
            estimated_arrival_at: part.eta || null,
        })),
        system_activity: (p.system_logs || []).map((log, idx) => ({
            id: `log_${idx}`,
            timestamp: log.time,
            type_code: log.type,
            message: log.message,
        })),
    };
};

const mapDiagnosticData = (timeline) => {
    const diagStep = timeline.find((s) => s.step === 'DIAGNOSING' && s.status === 'COMPLETED');
    if (!diagStep?.diagnostics?.length) return null;

    const groups = diagStep.diagnostics.map((cat, idx) => {
        const catItems = cat.items || [];
        return {
            id: cat.id || `group_${idx}`,
            title: cat.title,
            icon: cat.icon || 'Cpu',
            totalCount: catItems.length,
            technician_note: cat.technician_note || null,
            items: catItems.map((item) => ({
                name: item.name,
                status: item.status,
                action_required: item.action_required || null,
                media_urls: item.media_urls || [],
            })),
        };
    });

    const allItems = groups.flatMap((g) => g.items);
    return {
        summary: {
            total_items: allItems.length,
            normal: allItems.filter((i) => i.status === 'normal').length,
            warning: allItems.filter((i) => i.status === 'warning').length,
            critical: allItems.filter((i) => i.status === 'critical').length,
        },
        groups,
        conclusion: diagStep.notes || '',
        technician: null,
        last_maintenance_date: null,
    };
};

const mapOverviewData = (realProgress, ri, advisorSignatureUrl, customerSignatureUrl) => ({
    booking_code: realProgress.booking_id?.booking_code || realProgress._id,
    customer_note: ri.customer_notes || '',
    status: realProgress.status,
    reception_notes: realProgress.note || '',
    health_hud: {
        odometer: ri.odometer || 0,
        fuel_level: ri.fuel_level ?? 0,
    },
    vehicle_image: realProgress.images?.[0] || null,
    hotspots: (ri.damage_map || []).map((h, idx) => ({
        id: idx + 1,
        top: `${Math.min(Math.max(Number(h.y) || 0, 0), 1) * 100}%`,
        left: `${Math.min(Math.max(Number(h.x) || 0, 0), 1) * 100}%`,
        label: h.description || h.label || `Điểm ${idx + 1}`,
    })),
    checklist: (ri.belongings || []).map((b, idx) => ({
        id: idx + 1,
        name: b.item,
        checked: b.status,
    })),
    signatures: {
        advisor: advisorSignatureUrl
            ? { name: 'CỐ VẤN DỊCH VỤ', isImage: true, url: advisorSignatureUrl }
            : { name: 'CỐ VẤN DỊCH VỤ', svgPath: '' },
        customer: customerSignatureUrl
            ? { name: 'KHÁCH HÀNG', isImage: true, url: customerSignatureUrl }
            : { name: 'KHÁCH HÀNG', svgPath: '' },
    },
});

const mapQuotationData = (realProgress, ri, advisorSignatureUrl, customerSignatureUrl) => {
    const q = realProgress.quotation;
    // Show quotation tab whenever advisor has submitted a quotation (PENDING/APPROVED) with any amount
    const hasQuotation = q?.status && (q.deposit_amount > 0 || q.final_amount > 0 || q.service_package_total > 0 || q.parts?.length || q.labors?.length);
    if (!hasQuotation) return null;
    const booking = realProgress.booking_id || {};
    const creationDate = q.approved_at || realProgress.updatedAt || realProgress.createdAt;
    return {
        progress_id: realProgress._id,
        booking_code: booking.booking_code || realProgress._id,
        customer_info: {
            full_name: booking.customer_info?.full_name || '',
            phone: booking.customer_info?.contact_phone || '',
            address: booking.customer_info?.address || '',
        },
        vehicle_info: {
            brand: booking.vehicle_info?.brand || '',
            model: booking.vehicle_info?.model || '',
            license_plate: booking.vehicle_info?.license_plate || '',
            // ODO recorded at reception (ri.odometer), not from booking vehicle profile
            current_odometer: ri?.odometer || booking.vehicle_info?.current_odometer || 0,
        },
        advisor_name: realProgress.advisor_id?.full_name || '',
        creation_date: creationDate ? new Date(creationDate).toLocaleDateString('vi-VN') : '',
        status: q.status || 'PENDING',
        service_package_total: q.service_package_total || 0,
        parts: (q.parts || []).map((p, idx) => ({
            id: p.sku || `part_${idx}`,
            sku: p.sku || '',
            name: p.name || '',
            quantity: p.quantity || 0,
            unit_price: p.unit_price || 0,
            total_price: (p.quantity || 0) * (p.unit_price || 0),
        })),
        // QuotationItemsTable expects: { id, name, quantity (hours), unit_price (rate), total_price }
        labors: (q.labors || []).map((l, idx) => ({
            id: l.description || `labor_${idx}`,
            name: l.description || '',
            quantity: l.hours || 0,
            unit_price: l.rate || 0,
            total_price: (l.hours || 0) * (l.rate || 0),
        })),
        vat_rate: q.vat_rate ?? 0.1,
        deposit_amount: q.deposit_amount || 0,
        final_amount: q.final_amount || 0,
        payment_terms: {
            required_deposit: q.deposit_amount || 0,
            deposit_status: q.status === 'APPROVED' ? 'PAID' : 'PENDING',
        },
        reception_snapshot: ri
            ? {
                  odometer: ri.odometer || 0,
                  fuel_level: ri.fuel_level ?? 0,
                  customer_notes: ri.customer_notes || '',
                  damage_map: ri.damage_map || [],
                  belongings: ri.belongings || [],
              }
            : null,
        customer_signature: customerSignatureUrl || null,
        advisor_signature: advisorSignatureUrl || null,
    };
};

const mapDeliveryData = (p) => {
    if (!['COMPLETED'].includes(p.status)) return null;

    const q = p.quotation || {};
    const booking = p.booking_id || {};
    const advisor = p.advisor_id || {};

    // Build invoice items from quotation parts + labors + approved supplement parts/labors
    const items = [];
    (q.parts || []).forEach((part, i) => {
        items.push({
            id: `part_${i}`,
            sku: part.sku || '',
            name: part.name || '',
            quantity: part.quantity || 0,
            unit_price: part.unit_price || 0,
            total_price: (part.quantity || 0) * (part.unit_price || 0),
            is_addition: false,
        });
    });
    (q.labors || []).forEach((labor, i) => {
        items.push({
            id: `labor_${i}`,
            sku: '',
            name: labor.description || '',
            quantity: labor.hours || 1,
            unit_price: labor.rate || 0,
            total_price: (labor.hours || 1) * (labor.rate || 0),
            is_addition: false,
        });
    });

    const partsTotal = (q.parts || []).reduce((s, p) => s + (p.quantity || 0) * (p.unit_price || 0), 0);
    const laborsTotal = (q.labors || []).reduce((s, l) => s + (l.hours || 1) * (l.rate || 0), 0);
    const subTotal = partsTotal + laborsTotal;
    const vatRate = q.vat_rate ?? 0.1;
    const vatAmount = subTotal * vatRate;
    const grandTotal = q.final_amount || (subTotal + vatAmount);
    const depositPaid = q.deposit_amount || 0;
    const balanceDue = Math.max(0, grandTotal - depositPaid);

    const advisorSigRaw = p.qc_advisor_signature || null;
    const advisorSigUrl = advisorSigRaw ? `data:image/png;base64,${advisorSigRaw}` : null;

    // Next maintenance: 3 months from today, +5000 km from odometer
    const ri = p.timeline?.find((s) => s.step === 'RECEIVED')?.reception_info || {};
    const currentOdo = ri.odometer || 0;
    const nextMaintDate = new Date();
    nextMaintDate.setMonth(nextMaintDate.getMonth() + 3);

    return {
        handover_brief: {
            odo_out: p.delivery?.handover_brief?.odometer_at_delivery || currentOdo,
            next_maintenance_date: nextMaintDate.toISOString(),
            next_maintenance_km: currentOdo + 5000,
            warranty_months: 24,
            status_code: 'READY',
        },
        invoice_ledger: {
            transaction_id: booking.booking_code || p._id,
            items,
            sub_total: subTotal,
            vat_amount: vatAmount,
            grand_total: grandTotal,
            deposit_paid: depositPaid,
            balance_due: balanceDue,
            payment_status: p.delivery?.invoice_ledger?.payment_status || 'PENDING',
        },
        handshake_protocol: {
            advisor_signature: {
                is_signed: !!advisorSigUrl,
                image_url: advisorSigUrl,
                role: 'CỐ VẤN DỊCH VỤ',
                name: advisor.full_name || 'Cố vấn dịch vụ',
            },
            client_signature: { is_signed: false, image_url: null },
        },
    };
};

const mapQcData = (p) => {
    const checklist = p.qc_checklist || [];
    const signature = p.qc_advisor_signature || null;
    const advisor = p.advisor_id || {};

    if (!checklist.length && !signature) return null;

    const kcs_tasks = checklist.map((item, i) => ({
        id: i,
        title: item.task || `Hạng mục ${i + 1}`,
        desc: '',
        icon: 'Cpu',
        status: item.status === 'passed' ? 'completed' : item.status === 'failed' ? 'processing' : 'pending',
    }));

    return {
        kcs_tasks,
        estimated_delivery: p.estimated_completion || null,
        spec_hud: null,
        vehicle_visual: null,
        manager: {
            name: advisor.full_name || 'Cố vấn dịch vụ',
            role: 'CỐ VẤN DỊCH VỤ',
            signature: signature ? `data:image/png;base64,${signature}` : null,
        },
    };
};

export const useTrackingDetailLogic = () => {
    const { id } = useParams();
    const location = useLocation();
    const { t } = useTranslation('tracking');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [diagnosticData, setDiagnosticData] = useState(null);
    const [qcData, setQcData] = useState(null);
    const [overviewData, setOverviewData] = useState(null);
    const [quotationData, setQuotationData] = useState(null);
    const [progressData, setProgressData] = useState(null);
    const [deliveryData, setDeliveryData] = useState(null);
    const [repairStatus, setRepairStatus] = useState('RECEIVED');
    const [progressId, setProgressId] = useState(null);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabParam = queryParams.get('tab');
        if (tabParam) setActiveTab(tabParam);
    }, [location.search]);

    const fetchDashboardDetail = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!id) throw new Error('Không tìm thấy mã đơn dịch vụ trong URL.');

            const queryParams = new URLSearchParams(location.search);
            const licensePlate = queryParams.get('license_plate');

            if (!isAuthenticated && !licensePlate) {
                throw new Error('Vui lòng đăng nhập hoặc cung cấp biển số xe để xem thông tin đơn dịch vụ.');
            }

            let realProgress;
            if (licensePlate) {
                realProgress = await trackingApi.lookupTracking(id, licensePlate);
            } else {
                realProgress = await trackingApi.getTrackingDetail(id);
            }

            if (!realProgress) throw new Error('Không tìm thấy đơn dịch vụ.');

            const receivedStep = realProgress.timeline?.find((s) => s.step === 'RECEIVED');
            const ri = receivedStep?.reception_info || realProgress.reception_info || null;
            const advisorSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.advisor?.signature_url);
            const customerSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.customer?.signature_url);

            setProgressId(realProgress._id);
            setRepairStatus(realProgress.status || 'RECEIVED');
            setOverviewData(ri ? mapOverviewData(realProgress, ri, advisorSignatureUrl, customerSignatureUrl) : null);
            setDiagnosticData(realProgress.timeline ? mapDiagnosticData(realProgress.timeline) : null);
            setQuotationData(mapQuotationData(realProgress, ri, advisorSignatureUrl, customerSignatureUrl));
            setQcData(mapQcData(realProgress));
            setDeliveryData(mapDeliveryData(realProgress));
            setProgressData(mapProgressData(realProgress));
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardDetail();
    }, [id, location.search, isAuthenticated]);

    return {
        isLoading,
        error,
        activeTab,
        setActiveTab,
        overviewData,
        diagnosticData,
        qcData,
        quotationData,
        setQuotationData,
        progressData,
        setProgressData,
        deliveryData,
        repairStatus,
        progressId,
        t,
        refetch: fetchDashboardDetail,
    };
};
