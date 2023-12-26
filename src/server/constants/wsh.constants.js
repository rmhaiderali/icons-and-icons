// prettier-ignore
const allCountries = [
  "US", "GB", "CA", "AU", "NZ", "IN", "PK", "AD", "AE", "AF", "AG", "AI",
  "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AW", "AX", "AZ", "BA", "BB",
  "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ",
  "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CC", "CD", "CF", "CG", "CH",
  "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY",
  "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER",
  "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GD", "GE", "GF",
  "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU",
  "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM",
  "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH",
  "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI",
  "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF",
  "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT",
  "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI",
  "NL", "NO", "NP", "NR", "NU", "OM", "PA", "PE", "PF", "PG", "PH", "PL",
  "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU",
  "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL",
  "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD",
  "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV",
  "TW", "TZ", "UA", "UG", "UM", "UY", "UZ", "VA", "VC", "VE", "VG", "VI",
  "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
];

// prettier-ignore
const order = [
  "PK", "US", "GB", "CA", "AU", "IN", "BR", "DE", "ES", "FR", "IT", "MX",
  "PT", "CN", "JP", "KR"
].reverse();

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Cortana 1.14.7.19041; 10.0.0.0.19045.2251) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19045";

export { allCountries, order, userAgent };
