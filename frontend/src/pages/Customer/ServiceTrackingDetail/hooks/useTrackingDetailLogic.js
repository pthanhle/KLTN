import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiagnosticData } from '../data/mockDiagnosticData';
import { getQcData } from '../data/mockQcData';
import { getOverviewData } from '../data/mockOverviewData';
import { getQuotationData } from '../data/mockQuotationData';
import { normalizeSignatureDataUrl } from '../utils/trackingDataUtils';
import trackingApi from '../../../../services/api/tracking.api';
import { useSelector } from 'react-redux';

export const useTrackingDetailLogic = () => {
    const { id } = useParams();
    const location = useLocation();
    const { t } = useTranslation('tracking');

    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [diagnosticData, setDiagnosticData] = useState(null);
    const [qcData, setQcData] = useState(null);
    const [overviewData, setOverviewData] = useState(null);
    const [quotationData, setQuotationData] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchDashboardDetail = async () => {
            setIsLoading(true);
            try {
                const token = userInfo?.token;
                const queryParams = new URLSearchParams(location.search);
                const licensePlate = queryParams.get('license_plate');

                let realProgress = null;
                if (id) {
                    try {
                        if (licensePlate) {
                            realProgress = await trackingApi.lookupTracking(id, licensePlate);
                        } else if (token) {
                            realProgress = await trackingApi.getTrackingDetail(id, token);
                        }
                    } catch (err) {
                        console.error('No real tracking data found:', err);
                    }
                }

                const fallbackCode = id || 'SRV-2026-B77P';
                const data = getDiagnosticData(fallbackCode);
                const qc = getQcData(fallbackCode);
                const mockOverview = getOverviewData(fallbackCode);
                let quotation = getQuotationData(fallbackCode);

                let overview = mockOverview;
                if (realProgress?.timeline) {
                    const receivedStep = realProgress.timeline.find((step) => step.step === 'RECEIVED');
                    const ri = receivedStep?.reception_info || realProgress.reception_info;
                    const advisorSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.advisor?.signature_url);
                    const customerSignatureUrl = normalizeSignatureDataUrl(receivedStep?.signatures?.customer?.signature_url);

                    if (ri) {
                        overview = {
                            booking_code: realProgress.booking_id?.booking_code || id,
                            customer_note: ri.customer_notes || '',
                            status: realProgress.status,
                            reception_notes: realProgress.note || 'Không có ghi chú thêm',
                            health_hud: {
                                odometer: ri.odometer || 0,
                                fuel_level: ri.fuel_level ?? 0
                            },
                            vehicle_image: realProgress.images?.[0] || mockOverview.vehicle_image,
                            hotspots: (ri.damage_map || []).map((h, idx) => ({
                                id: idx + 1,
                                top: `${Math.min(Math.max(Number(h.y) || 0, 0), 1) * 100}%`,
                                left: `${Math.min(Math.max(Number(h.x) || 0, 0), 1) * 100}%`,
                                label: h.description || h.label || `Điểm ${idx + 1}`
                            })),
                            checklist: (ri.belongings || []).map((b, idx) => ({
                                id: idx + 1,
                                name: b.item,
                                checked: b.status
                            })),
                            signatures: {
                                advisor: advisorSignatureUrl
                                    ? { name: receivedStep?.signatures?.advisor?.name || 'CỐ VẤN DỊCH VỤ', isImage: true, url: advisorSignatureUrl }
                                    : { name: 'CỐ VẤN DỊCH VỤ', svgPath: '' },
                                customer: customerSignatureUrl
                                    ? { name: receivedStep?.signatures?.customer?.name || 'KHÁCH HÀNG', isImage: true, url: customerSignatureUrl }
                                    : { name: 'KHÁCH HÀNG', svgPath: '' }
                            }
                        };
                    }

                    if (quotation) {
                        quotation = {
                            ...quotation,
                            customer_signature: customerSignatureUrl || quotation.customer_signature,
                            advisor_signature: advisorSignatureUrl || quotation.advisor_signature,
                            reception_snapshot: ri ? {
                                odometer: ri.odometer || 0,
                                fuel_level: ri.fuel_level ?? 0,
                                customer_notes: ri.customer_notes || '',
                                damage_map: ri.damage_map || [],
                                belongings: ri.belongings || []
                            } : quotation.reception_snapshot
                        };
                    }
                }

                setDiagnosticData(data);
                setQcData(qc);
                setOverviewData(overview);
                setQuotationData(quotation);
            } catch (error) {
                console.error('Failed to load tracking details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardDetail();
    }, [id, location.search, userInfo?.token]);

    return {
        isLoading,
        activeTab,
        setActiveTab,
        overviewData,
        diagnosticData,
        qcData,
        quotationData,
        setQuotationData,
        t
    };
};
