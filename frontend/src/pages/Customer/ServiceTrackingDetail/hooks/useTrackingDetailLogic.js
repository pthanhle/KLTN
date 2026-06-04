import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiagnosticData } from '../data/mockDiagnosticData';
import { getQcData } from '../data/mockQcData';
import { getOverviewData } from '../data/mockOverviewData';
import { getQuotationData } from '../data/mockQuotationData';
import trackingApi from '../../../services/api/tracking.api';
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
                if (realProgress && realProgress.reception_info) {
                    const ri = realProgress.reception_info;
                    overview = {
                        booking_code: realProgress.booking_id?.booking_code || id,
                        customer_note: ri.customer_notes || mockOverview.customer_note,
                        status: realProgress.status,
                        reception_notes: realProgress.note || 'Không có ghi chú thêm',
                        health_hud: {
                            odometer: ri.odometer || mockOverview.health_hud.odometer,
                            fuel_level: ri.fuel_level ? (ri.fuel_level / 100) * 100 : mockOverview.health_hud.fuel_level
                        },
                        vehicle_image: realProgress.images?.[0] || mockOverview.vehicle_image,
                        hotspots: (ri.damage_map || []).map((h, idx) => ({
                            id: idx + 1,
                            top: `${h.y * 100}%`,
                            left: `${h.x * 100}%`,
                            label: h.description
                        })),
                        checklist: (ri.belongings || []).map((b, idx) => ({
                            id: idx + 1,
                            name: b.item,
                            checked: b.status
                        })),
                        signatures: {
                            advisor: { name: 'CỐ VẤN DỊCH VỤ', svgPath: '' },
                            customer: realProgress.signatures?.customer?.signature_url ?
                                { name: 'KHÁCH HÀNG', isImage: true, url: realProgress.signatures.customer.signature_url } :
                                mockOverview.signatures.customer
                        }
                    };
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
