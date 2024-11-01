type SuppliersApiColumnsType = {
  id: number;
  company_name: string;
  contact_person: string;
  supplier_code: string;
  number: string;
  supplier_tin: string;
  email: string;
  invoice_type: "local" | "foreign";
  payment_period: number;
  active: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
};

export default SuppliersApiColumnsType;
