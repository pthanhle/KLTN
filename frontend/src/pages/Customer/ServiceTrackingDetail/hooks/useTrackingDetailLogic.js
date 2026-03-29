import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiagnosticData } from '../data/mockDiagnosticData';
import { getQcData } from '../data/mockQcData';
import { getOverviewData } from '../data/mockOverviewData';
import { getQuotationData } from '../data/mockQuotationData';

export const useTrackingDetailLogic = () => {
    const { id } = useParams();
    const { t } = useTranslation('tracking');
    
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [diagnosticData, setDiagnosticData] = useState(null);
    const [qcData, setQcData] = useState(null);
    const [overviewData, setOverviewData] = useState(null);
    const [quotationData, setQuotationData] = useState(null);

    useEffect(() => {
        // Fake API simulation fetching full dashboard detail
        const fetchDashboardDetail = async () => {
            setIsLoading(true);
            try {
                await new Promise(res => setTimeout(res, 600)); // Simulating network
                const data = getDiagnosticData(id || 'SRV-2026-B77P');
                const qc = getQcData(id || 'SRV-2026-B77P');
                const overview = getOverviewData(id || 'SRV-2026-B77P');
                const quotation = getQuotationData(id || 'SRV-2026-B77P');
                
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
