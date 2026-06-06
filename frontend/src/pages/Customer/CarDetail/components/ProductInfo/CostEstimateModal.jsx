import { useState } from 'react';
import { Modal, Spin } from 'antd';
import { MapPin, Calculator } from 'lucide-react';
import { useClientCostEstimateQuery } from '../../../../../services/queries/costEstimate.queries';

const REGIONS = [
    { key: 'I',   label: 'Khu vực I',   desc: 'Gồm TP Hà Nội và TP Hồ Chí Minh',                                                                  feeKey: 'le_phi_kv1' },
    { key: 'II',  label: 'Khu vực II',  desc: 'Gồm các TP trực thuộc TW (trừ HN, HCM), TP trực thuộc tỉnh và thị xã',                              feeKey: 'le_phi_kv2' },
    { key: 'III', label: 'Khu vực III', desc: 'Gồm các khu vực khác ngoài khu vực I và khu vực II',                                                 feeKey: 'le_phi_kv3' },
];

const DEFAULT = {
    phi_kiem_dinh: 340000,
    phi_duong_bo: 1560000,
    bao_hiem_tnds: 436700,
    bao_hiem_than_xe: 8535000,
    le_phi_kv1: 11000000,
    le_phi_kv2: 1000000,
    le_phi_kv3: 200000,
};

const fmt = (n) => n?.toLocaleString('vi-VN') ?? '—';

const CostEstimateModal = ({ open, onClose, carPrice = 0 }) => {
    const [selectedRegion, setSelectedRegion] = useState('III');
    const { data: cfg, isLoading } = useClientCostEstimateQuery(open);

    const c = cfg ?? DEFAULT;
    const region = REGIONS.find((r) => r.key === selectedRegion);
    const truocBa = Math.round(carPrice * 0.1);
    const lePhi = c[region.feeKey] ?? DEFAULT[region.feeKey];
    const total = carPrice + truocBa + c.phi_kiem_dinh + lePhi + c.phi_duong_bo + c.bao_hiem_tnds + c.bao_hiem_than_xe;

    const rows = [
        { label: 'Giá xe (bao gồm VAT)',                        value: carPrice },
        { label: 'Lệ phí trước bạ (10%)',                       value: truocBa },
        { label: 'Phí kiểm định',                               value: c.phi_kiem_dinh },
        { label: 'Lệ phí đăng ký',                              value: lePhi,            highlight: true },
        { label: 'Phí sử dụng đường bộ cá nhân (1 năm)',        value: c.phi_duong_bo },
        { label: 'Bảo hiểm TNDS (1 năm)',                       value: c.bao_hiem_tnds },
        { label: 'Bảo hiểm thân xe',                            value: c.bao_hiem_than_xe },
    ];

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={
                <div className="flex items-center gap-2">
                    <Calculator size={18} className="text-yellow-500" />
                    <span className="font-bold text-base">Dự toán chi phí</span>
                </div>
            }
            width={620}
        >
            {isLoading ? (
                <div className="flex justify-center py-10"><Spin /></div>
            ) : (
                <div className="space-y-5 py-2">
                    {/* Region selector */}
                    <div>
                        <div className="flex items-center gap-1.5 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <MapPin size={14} />
                            Nơi đăng ký
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            {REGIONS.map((r) => (
                                <button
                                    key={r.key}
                                    onClick={() => setSelectedRegion(r.key)}
                                    className={`flex-1 px-3 py-2.5 rounded-xl border text-left transition-all text-sm ${
                                        selectedRegion === r.key
                                            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 font-semibold'
                                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                                    }`}
                                >
                                    <div className="font-bold">{r.label}</div>
                                    <div className="text-xs mt-0.5 opacity-70 leading-tight">{r.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cost breakdown */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody>
                                {rows.map((row) => (
                                    <tr
                                        key={row.label}
                                        className={`border-b border-slate-100 dark:border-white/5 last:border-0 ${
                                            row.highlight ? 'bg-yellow-50 dark:bg-yellow-500/5' : ''
                                        }`}
                                    >
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                                            {row.label}
                                            {row.highlight && (
                                                <span className="ml-1.5 text-xs text-yellow-600 dark:text-yellow-500 font-semibold">
                                                    ({region?.label})
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-slate-800 dark:text-slate-200 tabular-nums whitespace-nowrap">
                                            {fmt(row.value)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Total row */}
                        <div className="flex items-center justify-between px-4 py-4 bg-slate-900 dark:bg-yellow-500">
                            <span className="font-black uppercase text-sm tracking-wide text-white dark:text-slate-900">
                                Tổng chi phí (VNĐ)
                            </span>
                            <span className="font-black text-lg text-yellow-400 dark:text-slate-900 tabular-nums">
                                {fmt(total)}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                        Mức biểu phí trên đây là tạm tính và có thể thay đổi do sự thay đổi của thuế và các bên cung cấp dịch vụ khác.
                        Mức bảo hiểm đã gồm 10% VAT.
                    </p>
                </div>
            )}
        </Modal>
    );
};

export default CostEstimateModal;
