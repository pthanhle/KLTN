import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeSignatureDataUrl } from '../utils/trackingDataUtils';
import trackingApi from '../../../../services/api/tracking.api';
import { useSelector } from 'react-redux';

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
    if (!q?.parts?.length && !q?.labors?.length) return null;
    return {
        booking_code: realProgress.booking_id?.booking_code || realProgress._id,
        status: q.status || 'PENDING',
        parts: (q.parts || []).map((p) => ({
            sku: p.sku,
            name: p.name,
            quantity: p.quantity || 0,
            unit_price: p.unit_price || 0,
        })),
        labors: (q.labors || []).map((l) => ({
            description: l.description,
            hours: l.hours || 0,
            rate: l.rate || 0,
        })),
        vat_rate: q.vat_rate ?? 0.1,
        payment_terms: {
            required_deposit: q.deposit_amount || 0,
            deposit_status: q.deposit_amount > 0 ? 'PENDING' : 'PAID',
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
    const [repairStatus, setRepairStatus] = useState('RECEIVED');
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchDashboardDetail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!id) throw new Error('Không tìm thấy mã đơn dịch vụ trong URL.');

                const token = userInfo?.token;
                const queryParams = new URLSearchParams(location.search);
                const licensePlate = queryParams.get('license_plate');

                if (!token && !licensePlate) {
                    throw new Error('Vui lòng đăng nhập hoặc cung cấp biển số xe để xem thông tin đơn dịch vụ.');
                }

                let realProgress;
                if (licensePlate) {
                    realProgress = await trackingApi.lookupTracking(id, licensePlate);
                } else {
                    realProgress = await trackingApi.getTrackingDetail(id, token);
                }

                if (!realProgress) throw new Error('Không tìm thấy đơn dịch vụ.');

                const receivedStep = realProgress.timeline?.find((s) => s.step === 'RECEIVED');
                const ri = receivedStep?.reception_info || realProgress.reception_info || null;
                const advisorSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.advisor?.signature_url);
                const customerSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.customer?.signature_url);

                setRepairStatus(realProgress.status || 'RECEIVED');
                setOverviewData(ri ? mapOverviewData(realProgress, ri, advisorSignatureUrl, customerSignatureUrl) : null);
                setDiagnosticData(realProgress.timeline ? mapDiagnosticData(realProgress.timeline) : null);
                setQuotationData(mapQuotationData(realProgress, ri, advisorSignatureUrl, customerSignatureUrl));
                setQcData(null); // QC data mapped when QC_TESTING step is implemented
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

        fetchDashboardDetail();
    }, [id, location.search, userInfo?.token]);

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
        repairStatus,
        t,
    };
};
