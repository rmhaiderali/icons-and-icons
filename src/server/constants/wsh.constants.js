// prettier-ignore
const allCountries = [
  "AF", "AL", "AQ", "DZ", "AS", "AD", "AO", "AG", "AZ", "AR", "AU", "AT",
  "BS", "BH", "BD", "AM", "BB", "BE", "BM", "BT", "BO", "BA", "BW", "BV",
  "BR", "BZ", "IO", "SB", "VG", "BN", "BG", "MM", "BI", "BY", "KH", "CM",
  "CA", "CV", "KY", "CF", "LK", "TD", "CL", "CN", "TW", "CX", "CC", "CO",
  "KM", "YT", "CG", "CD", "CK", "CR", "HR", "CU", "CY", "CZ", "BJ", "DK",
  "DM", "DO", "EC", "SV", "GQ", "ET", "ER", "EE", "FO", "FK", "GS", "FJ",
  "FI", "AX", "FR", "GF", "PF", "TF", "DJ", "GA", "GE", "GM", "PS", "DE",
  "GH", "GI", "KI", "GR", "GL", "GD", "GP", "GU", "GT", "GN", "GY", "HT",
  "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL",
  "IT", "CI", "JM", "JP", "KZ", "JO", "KE", "KP", "KR", "KW", "KG", "LA",
  "LB", "LS", "LV", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY",
  "MV", "ML", "MT", "MQ", "MR", "MU", "MX", "MC", "MN", "MD", "ME", "MS",
  "MA", "MZ", "OM", "NA", "NR", "NP", "NL", "CW", "AW", "SX", "BQ", "NC",
  "VU", "NZ", "NI", "NE", "NG", "NU", "NF", "NO", "MP", "UM", "FM", "MH",
  "PW", "PK", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "GW", "TL",
  "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "AI", "LC", "MF",
  "PM", "VC", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "VN",
  "SI", "SO", "ZA", "ZW", "ES", "SS", "SD", "EH", "SR", "SJ", "SZ", "SE",
  "CH", "SY", "TJ", "TH", "TG", "TK", "TO", "TT", "AE", "TN", "TR", "TM",
  "TC", "TV", "UG", "UA", "MK", "EG", "GB", "GG", "JE", "IM", "TZ", "US",
  "VI", "BF", "UY", "UZ", "VE", "WF", "WS", "YE", "ZM"
];

// prettier-ignore
const order = [
  "PK", "US", "GB", "CA", "AU", "IN", "BR", "DE", "ES", "FR", "IT", "MX",
  "PT", "CN", "JP", "KR"
].reverse();

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Cortana 1.14.7.19041; 10.0.0.0.19045.2251) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19045";

export { allCountries, order, userAgent };
