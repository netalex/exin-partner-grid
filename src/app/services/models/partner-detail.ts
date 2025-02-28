export interface PartnerDetail {
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  logo_url: Logourl;
  partner_level_budgets: Partnerlevelbudget[];
}

export interface Partnerlevelbudget {
  id: number;
  budget_tax_not_included: string;
  budget_tax_included: string;
  reference_year: number;
  partner_level: Partnerlevel;
}

export interface Partnerlevel {
  id: number;
  name: string;
  color: string;
}

export interface Logourl {
  src: string;
  srcset: string;
}
