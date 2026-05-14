import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOverviewData } from '../../../Customer/ServiceTrackingDetail/data/mockOverviewData';
import { getDiagnosticData } from '../../../Customer/ServiceTrackingDetail/data/mockDiagnosticData';
import { getQuotationData } from '../../../Customer/ServiceTrackingDetail/data/mockQuotationData';
import { getProgressData } from '../../../Customer/ServiceTrackingDetail/data/mockProgressData';
import { getQcData } from '../../../Customer/ServiceTrackingDetail/data/mockQcData';

export const useRODetailLogic = () => {
    const { id: bookingCode } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [roData, setRoData] = useState(null);

    useEffect(() => {
        const fetchROData = () => {
            setIsLoading(true);
            try {
                const overview = getOverviewData(bookingCode);
                const diagnostic = getDiagnosticData(bookingCode);
                const quotation = getQuotationData(bookingCode);
                const progress = getProgressData(bookingCode);
                const qc = getQcData(bookingCode);

                let processedQuotation = quotation;
                if (quotation && !quotation.items) {
                    const parts = quotation.parts || [];
                    const labors = quotation.labors || [];
                    const vat_rate = quotation.vat_rate || 0.1;

                    const partItems = parts.map(p => ({ ...p, type: 'part', total_price: p.quantity * p.unit_price }));
                    const laborItems = labors.map(l => ({ ...l, name: l.description, type: 'labor', quantity: l.hours, total_price: l.hours * l.rate }));
                    const items = [...partItems, ...laborItems];

                    const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);
                    const vat_amount = subtotal * vat_rate;
                    const grand_total = subtotal + vat_amount;

                    processedQuotation = { ...quotation, items, summary: { vat_amount, grand_total } };
                }

                setTimeout(() => {
                    setRoData({
                        overview,
                        diagnostic,
                        quotation: processedQuotation,
                        progress,
                        qc,
                    });
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Failed to fetch RO detail data", error);
                setIsLoading(false);
            }
        };

        if (bookingCode) {
            fetchROData();
        }
    }, [bookingCode]);

    return {
        bookingCode,
        isLoading,
        roData
    };
};
