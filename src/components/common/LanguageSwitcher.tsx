'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { languageNames, Language } from '@/lib/translations';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ActionButton from './button/actionButton';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <ActionButton
                        icon={<Languages />}
                        tooltipContent={languageNames[language]}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuItem
                    onClick={() => handleLanguageChange('bn')}
                    className={`cursor-pointer ${language === 'bn' ? 'bg-accent' : ''
                        }`}
                >
                    <span className="flex items-center gap-2">
                        {language === 'bn' && <span className="text-primary">✓</span>}
                        {languageNames.bn}
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleLanguageChange('en')}
                    className={`cursor-pointer ${language === 'en' ? 'bg-accent' : ''
                        }`}
                >
                    <span className="flex items-center gap-2">
                        {language === 'en' && <span className="text-primary">✓</span>}
                        {languageNames.en}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
