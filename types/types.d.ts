type CustomClient = {
  _id: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  taxId: string;
};

type Invoice = {
  _id: string;
  title: string;
  nr: string;
  client: string;
  project: string;
  date: Date;
  performancePeriodStart: Date;
  performancePeriodEnd: Date;
  items: string;
  status: string;
  total: number;
  taxes: number;
  contact?: string;
  totalWithTaxes: number;
  storagePath: string;
  user: string;
  isReverseChargeInvoice: boolean;
};

type InvoicePosition = {
  position: number;
  description: string;
  hours: number;
  factor: number;
  total: number;
  isSubtotal: boolean;
};

type InvoiceTemplate = {
  _id: string;
  title: string;
  template: string;
};

type Project = {
  _id: string;
  title: string;
  client: string;
  description: string;
};

type Contact = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};
