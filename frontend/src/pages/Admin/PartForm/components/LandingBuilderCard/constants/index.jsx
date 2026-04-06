import React from 'react';
import { AlignLeft, AlignRight, Sun, Moon, Palette } from 'lucide-react';

export const getAlignOptions = (t) => [
    { value: 'left', label: t('adminPartForm:alignLeft', 'Căn Trái'), icon: <AlignLeft size={14} className="mr-2" /> },
    { value: 'right', label: t('adminPartForm:alignRight', 'Căn Phải'), icon: <AlignRight size={14} className="mr-2" /> }
];

export const getThemeOptions = (t) => [
    { value: 'light', label: t('adminPartForm:themeLight', 'Sáng (Light)'), icon: <Sun size={14} className="mr-2" /> },
    { value: 'dark', label: t('adminPartForm:themeDark', 'Tối (Dark)'), icon: <Moon size={14} className="mr-2" /> },
    { value: 'brand', label: t('adminPartForm:themeBrand', 'Nổi Bật (Brand)'), icon: <Palette size={14} className="mr-2" /> }
];
