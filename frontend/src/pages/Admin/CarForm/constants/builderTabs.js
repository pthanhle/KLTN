import { LayoutDashboard, Tag, Settings2, Palette, ListChecks, Globe, Images, Box } from 'lucide-react';

export const BUILDER_TABS = [
    { id: 'overview', labelKey: 'tabOverview', icon: LayoutDashboard },
    { id: 'pricing', labelKey: 'tabPricing', icon: Tag },
    { id: 'specs', labelKey: 'tabSpecs', icon: Settings2 },
    { id: 'colors', labelKey: 'tabColors', icon: Palette },
    { id: 'features', labelKey: 'tabFeatures', icon: ListChecks },
    { id: 'seo', labelKey: 'tabSEO', icon: Globe },
    { id: 'library', labelKey: 'tabLibrary', icon: Images },
    { id: '360', labelKey: 'tab360', icon: Box },
];
