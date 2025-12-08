export type Language = 'bn' | 'en';

export interface Translations {
    // Common Actions
    notifications: string;
    profile: string;
    logout: string;
    login: string;
    dashboard: string;
    settings: string;
    search: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    submit: string;
    loading: string;
    error: string;
    success: string;
    create: string;
    update: string;
    view: string;
    close: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;

    // Navigation & Menu
    managerList: string;
    sellProduct: string;
    purchaseProduct: string;
    employees: string;
    salesman: string;
    production: string;
    accounting: string;
    bank: string;
    expense: string;
    customer: string;
    supplier: string;
    sell: string;
    purchase: string;
    employeeWork: string;
    salesmanWork: string;

    // Dashboard Types
    salesDashboard: string;
    factoryDashboard: string;
    employeeDashboard: string;
    salesExecutiveDashboard: string;
    factoryManagerDashboard: string;
    companyOwnerDashboard: string;

    // Actions
    goToDashboard: string;

    // User Management
    userManagement: string;
    company: string;
    factory: string;

    // Table Headers & Lists
    employeeList: string;
    salesmanList: string;
    customerList: string;
    supplierList: string;
    productList: string;
    factoryList: string;
    companyList: string;
    managerListTitle: string;

    // Table Columns
    name: string;
    contactInfo: string;
    status: string;
    role: string;
    action: string;
    factoryName: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    date: string;
    quantity: string;
    price: string;
    total: string;
    description: string;

    // Form Labels
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    selectFactory: string;
    selectCompany: string;
    selectRole: string;

    // Status Values
    active: string;
    inactive: string;
    pending: string;
    approved: string;
    rejected: string;

    // Messages
    noData: string;
    loadingData: string;
    deleteConfirmation: string;
    successMessage: string;
    errorMessage: string;

    // Invoice & Documents
    invoice: string;
    invoiceId: string;
    invoiceDate: string;
    customerDetails: string;
    itemList: string;
    subtotal: string;
    discount: string;
    paid: string;
    due: string;
    totalAmount: string;

    // Product Related
    product: string;
    productName: string;
    unitPrice: string;
    totalPrice: string;
    seller: string;
    buyer: string;

    // Common Terms
    type: string;
    note: string;
    manager: string;
    employee: string;

    // Dashboard Cards
    salesAmount: string;
    purchaseAmount: string;
    bankBalance: string;
    totalExpense: string;
    cashBalance: string;
    totalProfitLoss: string;
    totalInvoices: string;
    totalCustomers: string;
    today: string;
    allBankAmount: string;
    availableUnits: string;
    todaysTotalSalesAmount: string;
    todaysTotalPurchaseAmount: string;
    todaysTotalProfitLoss: string;
    numberOfInvoicesCreated: string;
    totalActiveRanks: string;

    // Sell/Purchase/Product Tables
    invoiceNo: string;
    customerName: string;
    paymentMethod: string;
    buyPrice: string;
    sellPrice: string;
    sellsList: string;
    purchaseList: string;
    selectStatus: string;
    totalSale: string;

    // Production Table
    batchNo: string;
    totalProductionCost: string;
    totalWeight: string;
    addProduction: string;
    searchProduction: string;
    productionToProduct: string;

    // Supplier/Customer/Bank Tables
    bankList: string;
    accountNo: string;
    branchAddress: string;
    totalDueAmount: string;
    balance: string;

    // Expense Page
    expenseList: string;
    title: string;
    category: string;
    amount: string;
    fullTransactionHistory: string;
    topExpenses: string;
    cash: string;

    // Common Buttons & Placeholders
    createEmployee: string;
    createManager: string;
    createSalesman: string;
    createFactory: string;
    createProduct: string;
    addProduct: string;
    createCustomer: string;
    createSupplier: string;
    addBank: string;
    addExpense: string;
    updateRecord: string;
    deleteRecord: string;
    seeMore: string;
    remove: string;
    addItem: string;
    submitProduction: string;
}

export const translations: Record<Language, Translations> = {
    bn: {
        // Common Actions
        notifications: 'বিজ্ঞপ্তি',
        profile: 'প্রোফাইল',
        logout: 'লগআউট',
        login: 'লগইন',
        dashboard: 'ড্যাশবোর্ড',
        settings: 'সেটিংস',
        search: 'অনুসন্ধান',
        save: 'সংরক্ষণ',
        cancel: 'বাতিল',
        delete: 'মুছুন',
        edit: 'সম্পাদনা',
        add: 'যোগ করুন',
        submit: 'জমা দিন',
        loading: 'লোড হচ্ছে...',
        error: 'ত্রুটি',
        success: 'সফল',
        create: 'তৈরি করুন',
        update: 'আপডেট করুন',
        view: 'দেখুন',
        close: 'বন্ধ করুন',
        confirm: 'নিশ্চিত করুন',
        back: 'পিছনে',
        next: 'পরবর্তী',
        previous: 'পূর্ববর্তী',

        // Navigation & Menu
        managerList: 'ম্যানেজার তালিকা',
        sellProduct: 'পণ্য বিক্রয়',
        purchaseProduct: 'পণ্য ক্রয়',
        employees: 'কর্মচারী',
        salesman: 'বিক্রয়কর্মী',
        production: 'উৎপাদন',
        accounting: 'হিসাবরক্ষণ',
        bank: 'ব্যাংক',
        expense: 'ব্যয়',
        customer: 'গ্রাহক',
        supplier: 'সরবরাহকারী',
        sell: 'বিক্রয়',
        purchase: 'ক্রয়',
        employeeWork: 'কর্মচারীর কাজ',
        salesmanWork: 'বিক্রয়কর্মীর কাজ',

        // Dashboard Types
        salesDashboard: 'বিক্রয় ড্যাশবোর্ড',
        factoryDashboard: 'কারখানা ড্যাশবোর্ড',
        employeeDashboard: 'কর্মচারী ড্যাশবোর্ড',
        salesExecutiveDashboard: 'বিক্রয় নির্বাহী ড্যাশবোর্ড',
        factoryManagerDashboard: 'কারখানা ম্যানেজার ড্যাশবোর্ড',
        companyOwnerDashboard: 'কোম্পানি মালিক ড্যাশবোর্ড',

        // Actions
        goToDashboard: 'ড্যাশবোর্ডে যান',

        // User Management
        userManagement: 'ব্যবহারকারী ব্যবস্থাপনা',
        company: 'কোম্পানি',
        factory: 'কারখানা',

        // Table Headers & Lists
        employeeList: 'কর্মচারী তালিকা',
        salesmanList: 'বিক্রয়কর্মী তালিকা',
        customerList: 'গ্রাহক তালিকা',
        supplierList: 'সরবরাহকারী তালিকা',
        productList: 'পণ্য তালিকা',
        factoryList: 'কারখানা তালিকা',
        companyList: 'কোম্পানি তালিকা',
        managerListTitle: 'ম্যানেজার তালিকা',

        // Table Columns
        name: 'নাম',
        contactInfo: 'যোগাযোগের তথ্য',
        status: 'অবস্থা',
        role: 'ভূমিকা',
        action: 'কার্যক্রম',
        factoryName: 'কারখানার নাম',
        companyName: 'কোম্পানির নাম',
        phone: 'ফোন',
        email: 'ইমেইল',
        address: 'ঠিকানা',
        date: 'তারিখ',
        quantity: 'পরিমাণ',
        price: 'মূল্য',
        total: 'মোট',
        description: 'বিবরণ',

        // Form Labels
        firstName: 'প্রথম নাম',
        lastName: 'শেষ নাম',
        password: 'পাসওয়ার্ড',
        confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
        selectFactory: 'কারখানা নির্বাচন করুন',
        selectCompany: 'কোম্পানি নির্বাচন করুন',
        selectRole: 'ভূমিকা নির্বাচন করুন',

        // Status Values
        active: 'সক্রিয়',
        inactive: 'নিষ্ক্রিয়',
        pending: 'অপেক্ষমাণ',
        approved: 'অনুমোদিত',
        rejected: 'প্রত্যাখ্যাত',

        // Messages
        noData: 'কোন তথ্য নেই',
        loadingData: 'তথ্য লোড হচ্ছে...',
        deleteConfirmation: 'আপনি কি নিশ্চিত যে আপনি এটি মুছতে চান?',
        successMessage: 'সফলভাবে সম্পন্ন হয়েছে',
        errorMessage: 'একটি ত্রুটি ঘটেছে',

        // Invoice & Documents
        invoice: 'চালান',
        invoiceId: 'চালান আইডি',
        invoiceDate: 'চালানের তারিখ',
        customerDetails: 'গ্রাহকের বিবরণ',
        itemList: 'পণ্যের তালিকা',
        subtotal: 'উপমোট',
        discount: 'ছাড়',
        paid: 'পরিশোধিত',
        due: 'বকেয়া',
        totalAmount: 'মোট পরিমাণ',

        // Product Related
        product: 'পণ্য',
        productName: 'পণ্যের নাম',
        unitPrice: 'একক মূল্য',
        totalPrice: 'মোট মূল্য',
        seller: 'বিক্রেতা',
        buyer: 'ক্রেতা',

        // Common Terms
        type: 'ধরন',
        note: 'নোট',
        manager: 'ম্যানেজার',
        employee: 'কর্মচারী',

        // Dashboard Cards
        salesAmount: 'বিক্রয়ের পরিমাণ',
        purchaseAmount: 'ক্রয়ের পরিমাণ',
        bankBalance: 'ব্যাংক ব্যালেন্স',
        totalExpense: 'মোট ব্যয়',
        cashBalance: 'নগদ ব্যালেন্স',
        totalProfitLoss: 'মোট লাভ / ক্ষতি',
        totalInvoices: 'মোট চালান',
        totalCustomers: 'মোট গ্রাহক',
        today: 'আজ',
        allBankAmount: 'সমস্ত ব্যাংক পরিমাণ',
        availableUnits: 'উপলব্ধ ইউনিট',
        todaysTotalSalesAmount: 'আজকের মোট বিক্রয় পরিমাণ',
        todaysTotalPurchaseAmount: 'আজকের মোট ক্রয় পরিমাণ',
        todaysTotalProfitLoss: 'আজকের মোট লাভ / ক্ষতি',
        numberOfInvoicesCreated: 'তৈরি চালানের সংখ্যা',
        totalActiveRanks: 'মোট সক্রিয় র্যাঙ্ক',

        // Sell/Purchase/Product Tables
        invoiceNo: 'চালান নং',
        customerName: 'গ্রাহকের নাম',
        paymentMethod: 'পেমেন্ট পদ্ধতি',
        buyPrice: 'ক্রয় মূল্য',
        sellPrice: 'বিক্রয় মূল্য',
        sellsList: 'বিক্রয় তালিকা',
        purchaseList: 'ক্রয় তালিকা',
        selectStatus: 'অবস্থা নির্বাচন করুন',
        totalSale: 'মোট বিক্রয়',

        // Production Table
        batchNo: 'ব্যাচ নং',
        totalProductionCost: 'মোট উৎপাদন খরচ',
        totalWeight: 'মোট ওজন',
        addProduction: 'উৎপাদন যোগ করুন',
        searchProduction: 'উৎপাদন অনুসন্ধান',
        productionToProduct: 'উৎপাদন থেকে পণ্য',

        // Supplier/Customer/Bank Tables
        bankList: 'ব্যাংক তালিকা',
        accountNo: 'অ্যাকাউন্ট নং',
        branchAddress: 'শাখার ঠিকানা',
        totalDueAmount: 'মোট বকেয়া পরিমাণ',
        balance: 'ব্যালেন্স',

        // Expense Page
        expenseList: 'ব্যয় তালিকা',
        title: 'শিরোনাম',
        category: 'বিভাগ',
        amount: 'পরিমাণ',
        fullTransactionHistory: 'সম্পূর্ণ লেনদেন ইতিহাস',
        topExpenses: 'শীর্ষ ৫ ব্যয়',
        cash: 'নগদ',

        // Common Buttons & Placeholders
        createEmployee: 'কর্মচারী তৈরি করুন',
        createManager: 'ম্যানেজার তৈরি করুন',
        createSalesman: 'বিক্রয়কর্মী তৈরি করুন',
        createFactory: 'কারখানা তৈরি করুন',
        createProduct: 'পণ্য তৈরি করুন',
        addProduct: 'পণ্য যোগ করুন',
        createCustomer: 'গ্রাহক তৈরি করুন',
        createSupplier: 'সরবরাহকারী তৈরি করুন',
        addBank: 'ব্যাংক যোগ করুন',
        addExpense: 'ব্যয় যোগ করুন',
        updateRecord: 'আপডেট করুন',
        deleteRecord: 'মুছে ফেলুন',
        seeMore: 'আরও দেখুন',
        remove: 'সরান',
        addItem: 'আইটেম যোগ করুন',
        submitProduction: 'উৎপাদন জমা দিন',
    },
    en: {
        // Common Actions
        notifications: 'Notifications',
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        dashboard: 'Dashboard',
        settings: 'Settings',
        search: 'Search',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        submit: 'Submit',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        create: 'Create',
        update: 'Update',
        view: 'View',
        close: 'Close',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',

        // Navigation & Menu
        managerList: 'Manager List',
        sellProduct: 'Sell Product',
        purchaseProduct: 'Purchase Product',
        employees: 'Employees',
        salesman: 'Salesman',
        production: 'Production',
        accounting: 'Accounting',
        bank: 'Bank',
        expense: 'Expense',
        customer: 'Customer',
        supplier: 'Supplier',
        sell: 'Sell',
        purchase: 'Purchase',
        employeeWork: 'Employee Work',
        salesmanWork: 'Salesman Work',

        // Dashboard Types
        salesDashboard: 'Sales Dashboard',
        factoryDashboard: 'Factory Dashboard',
        employeeDashboard: 'Employee Dashboard',
        salesExecutiveDashboard: 'Sales Executive Dashboard',
        factoryManagerDashboard: 'Factory Manager Dashboard',
        companyOwnerDashboard: 'Company Owner Dashboard',

        // Actions
        goToDashboard: 'Go to Dashboard',

        // User Management
        userManagement: 'User Management',
        company: 'Company',
        factory: 'Factory',

        // Table Headers & Lists
        employeeList: 'Employee List',
        salesmanList: 'Salesman List',
        customerList: 'Customer List',
        supplierList: 'Supplier List',
        productList: 'Product List',
        factoryList: 'Factory List',
        companyList: 'Company List',
        managerListTitle: 'Manager List',

        // Table Columns
        name: 'Name',
        contactInfo: 'Contact Info',
        status: 'Status',
        role: 'Role',
        action: 'Action',
        factoryName: 'Factory Name',
        companyName: 'Company Name',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        date: 'Date',
        quantity: 'Quantity',
        price: 'Price',
        total: 'Total',
        description: 'Description',

        // Form Labels
        firstName: 'First Name',
        lastName: 'Last Name',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        selectFactory: 'Select Factory',
        selectCompany: 'Select Company',
        selectRole: 'Select Role',

        // Status Values
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',

        // Messages
        noData: 'No Data Available',
        loadingData: 'Loading Data...',
        deleteConfirmation: 'Are you sure you want to delete this?',
        successMessage: 'Operation completed successfully',
        errorMessage: 'An error occurred',

        // Invoice & Documents
        invoice: 'Invoice',
        invoiceId: 'Invoice ID',
        invoiceDate: 'Invoice Date',
        customerDetails: 'Customer Details',
        itemList: 'Item List',
        subtotal: 'Subtotal',
        discount: 'Discount',
        paid: 'Paid',
        due: 'Due',
        totalAmount: 'Total Amount',

        // Product Related
        product: 'Product',
        productName: 'Product Name',
        unitPrice: 'Unit Price',
        totalPrice: 'Total Price',
        seller: 'Seller',
        buyer: 'Buyer',

        // Common Terms
        type: 'Type',
        note: 'Note',
        manager: 'Manager',
        employee: 'Employee',

        // Dashboard Cards
        salesAmount: 'Sales Amount',
        purchaseAmount: 'Purchase Amount',
        bankBalance: 'Bank Balance',
        totalExpense: 'Total Expense',
        cashBalance: 'Cash Balance',
        totalProfitLoss: 'Total Profit / Loss',
        totalInvoices: 'Total Invoices',
        totalCustomers: 'Total Customers',
        today: 'TODAY',
        allBankAmount: 'All Bank Amount',
        availableUnits: 'Available Units',
        todaysTotalSalesAmount: "TODAY's Total Sales Amount",
        todaysTotalPurchaseAmount: "TODAY's Total Purchase Amount",
        todaysTotalProfitLoss: "TODAY's Total Profit / Loss",
        numberOfInvoicesCreated: 'Number Of Invoices Created',
        totalActiveRanks: 'Total Active Ranks',

        // Sell/Purchase/Product Tables
        invoiceNo: 'Invoice No',
        customerName: 'Customer Name',
        paymentMethod: 'Payment Method',
        buyPrice: 'Buy Price',
        sellPrice: 'Sell Price',
        sellsList: 'Sells List',
        purchaseList: 'Purchase List',
        selectStatus: 'Select Status',
        totalSale: 'Total Sale',

        // Production Table
        batchNo: 'Batch No',
        totalProductionCost: 'Total Production Cost',
        totalWeight: 'Total Weight',
        addProduction: 'Add Production',
        searchProduction: 'Search Production',
        productionToProduct: 'Production to Product',

        // Supplier/Customer/Bank Tables
        bankList: 'Bank List',
        accountNo: 'Account No',
        branchAddress: 'Branch Address',
        totalDueAmount: 'Total Due Amount',
        balance: 'Balance',

        // Expense Page
        expenseList: 'Expense List',
        title: 'Title',
        category: 'Category',
        amount: 'Amount',
        fullTransactionHistory: 'Full Transaction History',
        topExpenses: 'Top 5 Expenses',
        cash: 'Cash',

        // Common Buttons & Placeholders
        createEmployee: 'Create Employee',
        createManager: 'Create Manager',
        createSalesman: 'Create Salesman',
        createFactory: 'Create Factory',
        createProduct: 'Create Product',
        addProduct: 'Add Product',
        createCustomer: 'Create Customer',
        createSupplier: 'Create Supplier',
        addBank: 'Add Bank',
        addExpense: 'Add Expense',
        updateRecord: 'Update',
        deleteRecord: 'Delete',
        seeMore: 'See More',
        remove: 'Remove',
        addItem: 'Add Item',
        submitProduction: 'Submit Production',
    },
};

export const languageNames: Record<Language, string> = {
    bn: 'বাংলা (BN)',
    en: 'English (EN)',
};
