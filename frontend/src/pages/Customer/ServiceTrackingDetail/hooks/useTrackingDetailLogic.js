import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiagnosticData } from '../data/mockDiagnosticData';
import { getQcData } from '../data/mockQcData';
import { getOverviewData } from '../data/mockOverviewData';
import { getQuotationData } from '../data/mockQuotationData';
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

                const data = getDiagnosticData(id || 'SRV-2026-B77P');
                const qc = getQcData(id || 'SRV-2026-B77P');
                const mockOverview = getOverviewData(id || 'SRV-2026-B77P');
                const quotation = getQuotationData(id || 'SRV-2026-B77P');

                let overview = mockOverview;
                if (realProgress && realProgress.timeline) {
                    const receivedStep = realProgress.timeline.find(t => t.step === 'RECEIVED');
                    const ri = receivedStep?.reception_info || realProgress.reception_info;
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
                            vehicle_image: realProgress.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41rvL56LDgqy7Q6rRp-OwmmEOZG4_EigDYMPUCrG1yhJbO406mV-5oRTuJRbVcCnNUHk7qIGWh-eBoCzJg4OZ3gVUWsofrmxhMWwLPqW0klZNWejNMm6wcO72fS87wG5WLw4ODs5JgUTxgoJYy9ZjINalD6rwNGWpOZm_O6k5N99aISoOOC4qYJV8DldamtRrM-TvrHCkkadDIa9cdvmqURXu8ZcFDImprAz0mRvtPebV5przpkHQ4R6Z6Z3uzCQYSSuPdbCo0uV0',
                            hotspots: (ri.damage_map || []).map((h, idx) => ({
                                id: idx + 1,
                                top: `${h.y * 100}%`,
                                left: `${h.x * 100}%`,
                                label: h.description || `Điểm ${idx + 1}`
                            })),
                            checklist: (ri.belongings || []).map((b, idx) => ({
                                id: idx + 1,
                                name: b.item,
                                checked: b.status
                            })),
                            signatures: {
                                advisor: receivedStep?.signatures?.advisor?.signature_url ?
                                    { name: 'CỐ VẤN DỊCH VỤ', isImage: true, url: receivedStep.signatures.advisor.signature_url } :
                                    { name: 'CỐ VẤN DỊCH VỤ', svgPath: '' },
                                customer: receivedStep?.signatures?.customer?.signature_url ?
                                    { name: 'KHÁCH HÀNG', isImage: true, url: receivedStep.signatures.customer.signature_url } :
                                    { name: 'KHÁCH HÀNG', svgPath: '' }
                            }
                        };
                    }
                }

                setDiagnosticData(data);
                setQcData(qc);
                setOverviewData(overview);
                setQuotationData(quotation);
            } catch (error) {
                console.error("Failed to load tracking details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardDetail();
    }, [id]);

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
