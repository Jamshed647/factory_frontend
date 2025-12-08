# Multilingual Support - Usage Guide

## Overview
The multilingual system supports Bangla (default) and English with instant language switching and persistent language selection.

## Using Translations in Components

### Basic Usage

```tsx
'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function MyComponent() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t.dashboard}</h1>
      <button>{t.save}</button>
      <p>Current language: {language}</p>
    </div>
  );
}
```

### Changing Language Programmatically

```tsx
'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function CustomLanguageButton() {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };
  
  return (
    <button onClick={toggleLanguage}>
      Switch to {language === 'bn' ? 'English' : 'বাংলা'}
    </button>
  );
}
```

## Adding New Translations

To add new translations, edit `/src/lib/translations.ts`:

```typescript
export interface Translations {
  // ... existing translations
  myNewKey: string;
}

export const translations: Record<Language, Translations> = {
  bn: {
    // ... existing translations
    myNewKey: 'আমার নতুন টেক্সট',
  },
  en: {
    // ... existing translations
    myNewKey: 'My New Text',
  },
};
```

## Features

✅ **Instant Switching** - Language changes without page reload  
✅ **Persistent Selection** - Language preference saved in localStorage  
✅ **Bangla Default** - First-time visitors see Bangla  
✅ **Type-Safe** - Full TypeScript support for all translations  
✅ **Accessible** - Updates HTML lang attribute for screen readers

## Language Switcher Location

The language switcher is located in the header bar between the notifications bell and profile icon.

## Implementation Details

- **Context**: `LanguageContext` provides global language state
- **Hook**: `useLanguage()` accesses language context
- **Storage**: Language preference stored in `localStorage` with key `'language'`
- **Default**: Bangla (`'bn'`) is the default language
- **Supported Languages**: Bangla (`'bn'`), English (`'en'`)
