# How to Apply Translations to Your Components

## Overview

The translation system is now fully set up with **130+ translations** covering:
- ✅ Navigation menus (already applied)
- ✅ Table headers and columns
- ✅ Form labels
- ✅ Buttons and actions
- ✅ Status messages
- ✅ Invoice and document terms
- ✅ Product-related fields

## Quick Start Pattern

### 1. Import the Hook
```tsx
import { useLanguage } from '@/hooks/useLanguage';
```

### 2. Use in Component
```tsx
export default function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t.employeeList}</h1>;
}
```

## Example: Employee Table (COMPLETED ✅)

The `employeeTable.tsx` has been updated as a **working example**. Here's what was changed:

### Before:
```tsx
<h2 className="text-2xl font-bold">Employee List</h2>
```

### After:
```tsx
const { t } = useLanguage();
// ...
<h2 className="text-2xl font-bold">{t.employeeList}</h2>
```

### Table Columns Before:
```tsx
columns: [
  { key: "name", header: "Name" },
  { key: "phone", header: "Contact Info" },
  { key: "status", header: "Status" },
]
```

### Table Columns After:
```tsx
columns: [
  { key: "name", header: t.name },
  { key: "phone", header: t.contactInfo },
  { key: "status", header: t.status },
]
```

## Apply to Other Tables

Follow the same pattern for all your other tables:

### Salesman Table
```tsx
// src/components/pageComponents/salesmanComponents/salesmanTable.tsx
const { t } = useLanguage();

// Change title
<h2>{t.salesmanList}</h2>

// Change columns
columns: [
  { key: "name", header: t.name },
  { key: "phone", header: t.contactInfo },
  { key: "status", header: t.status },
  { key: "role", header: t.role },
  { key: "action", header: t.action },
]
```

### Customer Table
```tsx
const { t } = useLanguage();
<h2>{t.customerList}</h2>
```

### Product Table
```tsx
const { t } = useLanguage();

columns: [
  { key: "productName", header: t.productName },
  { key: "quantity", header: t.quantity },
  { key: "price", header: t.price },
  { key: "total", header: t.total },
]
```

## Available Translations

### Table Titles
- `t.employeeList` → "Employee List" / "কর্মচারী তালিকা"
- `t.salesmanList` → "Salesman List" / "বিক্রয়কর্মী তালিকা"
- `t.customerList` → "Customer List" / "গ্রাহক তালিকা"
- `t.supplierList` → "Supplier List" / "সরবরাহকারী তালিকা"
- `t.productList` → "Product List" / "পণ্য তালিকা"
- `t.factoryList` → "Factory List" / "কারখানা তালিকা"
- `t.companyList` → "Company List" / "কোম্পানি তালিকা"

### Table Columns
- `t.name` → "Name" / "নাম"
- `t.contactInfo` → "Contact Info" / "যোগাযোগের তথ্য"
- `t.status` → "Status" / "অবস্থা"
- `t.role` → "Role" / "ভূমিকা"
- `t.action` → "Action" / "কার্যক্রম"
- `t.factoryName` → "Factory Name" / "কারখানার নাম"
- `t.companyName` → "Company Name" / "কোম্পানির নাম"
- `t.phone` → "Phone" / "ফোন"
- `t.email` → "Email" / "ইমেইল"
- `t.address` → "Address" / "ঠিকানা"
- `t.date` → "Date" / "তারিখ"
- `t.quantity` → "Quantity" / "পরিমাণ"
- `t.price` → "Price" / "মূল্য"
- `t.total` → "Total" / "মোট"
- `t.description` → "Description" / "বিবরণ"

### Buttons & Actions
- `t.create` → "Create" / "তৈরি করুন"
- `t.edit` → "Edit" / "সম্পাদনা"
- `t.delete` → "Delete" / "মুছুন"
- `t.save` → "Save" / "সংরক্ষণ"
- `t.cancel` → "Cancel" / "বাতিল"
- `t.update` → "Update" / "আপডেট করুন"
- `t.view` → "View" / "দেখুন"
- `t.goToDashboard` → "Go to Dashboard" / "ড্যাশবোর্ডে যান"

### Form Labels
- `t.firstName` → "First Name" / "প্রথম নাম"
- `t.lastName` → "Last Name" / "শেষ নাম"
- `t.password` → "Password" / "পাসওয়ার্ড"
- `t.selectFactory` → "Select Factory" / "কারখানা নির্বাচন করুন"
- `t.selectCompany` → "Select Company" / "কোম্পানি নির্বাচন করুন"

### Status Values
- `t.active` → "Active" / "সক্রিয়"
- `t.inactive` → "Inactive" / "নিষ্ক্রিয়"
- `t.pending` → "Pending" / "অপেক্ষমাণ"
- `t.approved` → "Approved" / "অনুমোদিত"
- `t.rejected` → "Rejected" / "প্রত্যাখ্যাত"

### Invoice & Documents
- `t.invoice` → "Invoice" / "চালান"
- `t.invoiceId` → "Invoice ID" / "চালান আইডি"
- `t.invoiceDate` → "Invoice Date" / "চালানের তারিখ"
- `t.customerDetails` → "Customer Details" / "গ্রাহকের বিবরণ"
- `t.itemList` → "Item List" / "পণ্যের তালিকা"
- `t.subtotal` → "Subtotal" / "উপমোট"
- `t.discount` → "Discount" / "ছাড়"
- `t.paid` → "Paid" / "পরিশোধিত"
- `t.due` → "Due" / "বকেয়া"
- `t.totalAmount` → "Total Amount" / "মোট পরিমাণ"

### Product Related
- `t.product` → "Product" / "পণ্য"
- `t.productName` → "Product Name" / "পণ্যের নাম"
- `t.unitPrice` → "Unit Price" / "একক মূল্য"
- `t.totalPrice` → "Total Price" / "মোট মূল্য"
- `t.seller` → "Seller" / "বিক্রেতা"
- `t.buyer` → "Buyer" / "ক্রেতা"

## Step-by-Step Guide

### For Tables:
1. Open your table component file
2. Add import: `import { useLanguage } from '@/hooks/useLanguage';`
3. Add hook: `const { t } = useLanguage();`
4. Replace hardcoded text with `{t.keyName}`
5. Test by switching languages

### For Forms:
```tsx
const { t } = useLanguage();

<label>{t.firstName}</label>
<input placeholder={t.firstName} />

<button>{t.save}</button>
<button>{t.cancel}</button>
```

### For Cards:
```tsx
const { t } = useLanguage();

<Card>
  <h3>{t.productName}</h3>
  <p>{t.price}: ${price}</p>
  <p>{t.quantity}: {qty}</p>
  <button>{t.view}</button>
</Card>
```

## Adding New Translations

If you need a translation that doesn't exist:

1. Open `src/lib/translations.ts`
2. Add to interface:
```typescript
export interface Translations {
  // ... existing
  myNewField: string;
}
```

3. Add to both `bn` and `en` objects:
```typescript
bn: {
  // ... existing
  myNewField: 'আমার নতুন ফিল্ড',
},
en: {
  // ... existing
  myNewField: 'My New Field',
}
```

4. Use it: `{t.myNewField}`

## Testing

1. Open your application
2. Click the language switcher in the header
3. Select "বাংলা (BN)" - all text should change to Bangla
4. Select "English (EN)" - all text should change to English
5. Navigate between pages - language should persist

## Priority Components to Update

1. ✅ **Employee Table** - DONE (example)
2. **Salesman Table** - Apply same pattern
3. **Customer Table** - Apply same pattern
4. **Supplier Table** - Apply same pattern
5. **Product Tables** - Apply same pattern
6. **Factory Table** - Apply same pattern
7. **Invoice Components** - Use invoice translations
8. **Dashboard Cards** - Use dashboard translations
9. **Forms** - Use form label translations

## Summary

- 🎯 **130+ translations** ready to use
- ✅ **Employee Table** updated as working example
- 📝 Follow the same pattern for all components
- 🔄 Language changes instantly without page reload
- 💾 Language preference persists across sessions

Start with your most-used components and gradually apply translations to the rest!
