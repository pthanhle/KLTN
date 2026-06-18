import { useState, useRef, useEffect } from 'react';
import { useVehicleContractDetailQuery, useUpdateVehicleContractMutation } from '../../../../../../services/queries/vehicleContract.queries';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

export const useContractBuilder = (id, initialContractData) => {
    const { t } = useTranslation('adminVehicleContractBuilder');
    const queryClient = useQueryClient();

    const [isEditMode, setIsEditMode] = useState(['draft', 'issued'].includes(initialContractData?.status));
    const [draftData, setDraftData] = useState(null);
    const printRef = useRef(null);

    useEffect(() => {
        setIsEditMode(['draft', 'issued'].includes(initialContractData?.status));
    }, [initialContractData?.status]);

    useEffect(() => {
        if (initialContractData) {
            setDraftData(JSON.parse(JSON.stringify(initialContractData)));
        }
    }, [initialContractData]);

    const updateMutation = useUpdateVehicleContractMutation();

    const handlePrintAction = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Hop_dong_${initialContractData?.contract_number || id}`,
        onBeforeGetContent: () => {
            return new Promise((resolve, reject) => {
                if (!['draft', 'issued'].includes(initialContractData?.status)) {
                    return resolve();
                }

                const payload = {
                    customer_snapshot: draftData.customer_snapshot,
                    vehicle_snapshot: draftData.vehicle_snapshot,
                    pricing_snapshot: draftData.pricing_snapshot
                };
                updateMutation.mutateAsync({ id, data: payload })
                    .then(() => resolve())
                    .catch((err) => {
                        message.error('Lỗi khi lưu dữ liệu trước khi in');
                        reject(err);
                    });
            });
        },
        pageStyle: `
            @page { size: A4; margin: 15mm; }
            @media print {
                html, body {
                    margin: 0;
                    padding: 0;
                }
                body { -webkit-print-color-adjust: exact; }
                .no-print { display: none !important; }
            }
        `
    });

    const handlePrint = () => {
        handlePrintAction();
    };

    const handleFieldChange = (section, field, value) => {
        setDraftData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        const payload = {
            customer_snapshot: draftData.customer_snapshot,
            vehicle_snapshot: draftData.vehicle_snapshot,
            pricing_snapshot: draftData.pricing_snapshot
        };
        updateMutation.mutate({ id, data: payload }, {
            onSuccess: () => message.success(t('Lưu thông tin thành công')),
            onError: (err) => message.error(err.message || t('Có lỗi xảy ra'))
        });
    };

    return {
        state: {
            contract: draftData || initialContractData,
            isLoading: false,
            isEditMode,
            isSaving: updateMutation.isPending || updateMutation.isLoading
        },
        refs: {
            printRef
        },
        actions: {
            toggleEditMode: () => setIsEditMode(!isEditMode),
            handleFieldChange,
            handleSave,
            handlePrint
        }
    };
};
