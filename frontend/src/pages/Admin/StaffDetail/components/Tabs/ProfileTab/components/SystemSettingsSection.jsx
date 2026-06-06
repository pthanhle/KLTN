import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, RefreshCw, Copy, Check, KeyRound } from 'lucide-react';
import { Modal } from 'antd';
import { formatDate } from '../../../../utils/dateUtils';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { useQueryClient } from '@tanstack/react-query';

const PasswordResetModal = ({ open, staffName, onClose, onSubmit }) => {
    const [mode, setMode] = useState('auto');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const reset = () => {
        setMode('auto');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setShowPwd(false);
        setShowConfirm(false);
    };

    const handleClose = () => { reset(); onClose(); };

    const handleSubmit = async () => {
        if (mode === 'custom') {
            if (!password) { setError('Vui lòng nhập mật khẩu mới'); return; }
            if (password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }
            if (password !== confirmPassword) { setError('Mật khẩu xác nhận không khớp'); return; }
        }
        setIsSubmitting(true);
        try {
            const newPwd = await onSubmit(mode === 'custom' ? password : undefined);
            reset();
            onClose();
            Modal.info({
                title: 'Mật khẩu mới',
                content: (
                    <div className="py-2">
                        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-lg font-bold tracking-widest text-slate-800 select-all text-center">
                            {newPwd}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">Hãy lưu lại mật khẩu này ngay bây giờ.</p>
                    </div>
                ),
                okText: 'Đã lưu',
            });
        } catch (e) {
            setError(e?.response?.data?.message || 'Không thể đặt lại mật khẩu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            title="Đặt lại mật khẩu"
            width={420}
            centered
        >
            <div className="flex flex-col gap-5 pt-4">
                {/* Mode toggle */}
                <div className="flex bg-slate-100 dark:bg-[#141416] rounded-xl p-1 gap-1">
                    {['auto', 'custom'].map(m => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => { setMode(m); setError(''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                                mode === m
                                    ? 'bg-white dark:bg-[#2c2c2e] text-yellow-600 dark:text-yellow-500 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                            {m === 'auto' ? 'Tạo tự động' : 'Nhập thủ công'}
                        </button>
                    ))}
                </div>

                {mode === 'auto' ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                        Hệ thống sẽ tạo mật khẩu ngẫu nhiên an toàn cho{' '}
                        <strong className="text-slate-700 dark:text-slate-200">{staffName}</strong>.<br />
                        Mật khẩu cũ sẽ ngay lập tức bị vô hiệu.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                Mật khẩu mới
                            </label>
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-yellow-400 transition-colors">
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setError(''); }}
                                    placeholder="Ít nhất 6 ký tự"
                                    className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-mono"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(v => !v)}
                                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
                                >
                                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                Xác nhận mật khẩu
                            </label>
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-yellow-400 transition-colors">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                                    placeholder="Nhập lại mật khẩu"
                                    className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-mono"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(v => !v)}
                                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
                                >
                                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <p className="text-xs text-red-500 text-center -mt-1">{error}</p>
                )}

                <div className="flex gap-3 pt-1">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-medium"
                    >
                        Huỷ
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting
                            ? <RefreshCw size={14} className="animate-spin" />
                            : <KeyRound size={14} />
                        }
                        {mode === 'auto' ? 'Tạo mật khẩu' : 'Đặt mật khẩu'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const SystemSettingsSection = ({ staff }) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const getAccessLevelDisplay = (level) => {
        if (level === 'ADMIN') return t('adminStaffDetail:access_level_admin', 'Quản trị viên');
        return t('adminStaffDetail:access_level_standard', 'Người dùng tiêu chuẩn');
    };

    const handleCopyPassword = () => {
        if (!staff.lastSetPassword) return;
        navigator.clipboard.writeText(staff.lastSetPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleResetSubmit = async (customPassword) => {
        const res = await AdminStaffAPI.resetPassword(
            staff._id,
            customPassword ? { newPassword: customPassword } : undefined
        );
        queryClient.invalidateQueries({ queryKey: ['admin-staff-detail', staff._id] });
        return res?.newPassword;
    };

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-8 border border-slate-200 dark:border-white/5 flex flex-col gap-8 shadow-sm dark:shadow-none transition-colors">
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-yellow-500 tracking-tight mb-8 uppercase">
                    {t('adminStaffDetail:section_system_status', 'Trạng thái hệ thống')}
                </h2>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                            {t('adminStaffDetail:label_access_level', 'Quyền truy cập')}
                        </span>
                        <span className="text-base text-slate-900 dark:text-white font-medium">
                            {getAccessLevelDisplay(staff.accessLevel)}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                            {t('adminStaffDetail:label_last_login', 'Đăng nhập lần cuối')}
                        </span>
                        <span className="text-sm text-slate-900 dark:text-white">
                            {staff.lastLogin ? formatDate(staff.lastLogin) : 'N/A'}
                        </span>
                    </div>

                    {/* Password section */}
                    <div className="flex flex-col gap-3">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                            Mật khẩu tài khoản
                        </span>
                        {staff.lastSetPassword ? (
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2">
                                    <span className={`font-mono text-sm flex-1 select-all ${showPassword ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                                        {showPassword ? staff.lastSetPassword : '••••••••••••••••'}
                                    </span>
                                    <button
                                        onClick={() => setShowPassword(v => !v)}
                                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                        title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={handleCopyPassword}
                                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                        title="Sao chép"
                                    >
                                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <button
                                    onClick={() => setResetModalOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/20 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
                                >
                                    <RefreshCw size={13} />
                                    Đặt lại
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 dark:text-slate-400 italic">
                                    Chưa có mật khẩu lưu (nhân viên đã tự đổi qua email)
                                </span>
                                <button
                                    onClick={() => setResetModalOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/20 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
                                >
                                    <RefreshCw size={13} />
                                    Đặt lại mật khẩu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PasswordResetModal
                open={resetModalOpen}
                staffName={staff.fullName}
                onClose={() => setResetModalOpen(false)}
                onSubmit={handleResetSubmit}
            />
        </div>
    );
};
