type Client = {
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
  status: string;
  total: number;
  taxes: number;
  totalWithTaxes: number;
  storagePath: string;
};
