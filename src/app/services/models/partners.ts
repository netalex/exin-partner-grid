export interface Partners extends Array<Partner> {
  partner_levels: Partnerlevel[];
  partners: Partner[];
}

export interface Partner {
  id: number;
  name: string;
  partner_level_id: number;
  partner_level_name: string;
  partner_level_color: string;
  partner_budget: string;
  logo_id: number;
  partner_events_invoiced: string;
  partner_events_not_invoiced?: string;
  logo_url: Logourl;
}

export interface Logourl {
  src: string;
  srcset: string;
}

export interface Partnerlevel {
  id: number;
  name: string;
  color: string;
  order: number;
}
