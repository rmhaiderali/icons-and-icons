const authorization =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

const regions = [
  {
    service: "amazon",
    url: "https://pv3glsad22klda3r2qmlmtrxf40qmdsr.lambda-url.ap-northeast-1.on.aws",
    accessKeyId: process.env.TBF_AMAZON_AP_NORTHEAST_1.split(":")[0],
    secretAccessKey: process.env.TBF_AMAZON_AP_NORTHEAST_1.split(":")[1],
    location: "JP",
  },
  {
    service: "amazon",
    url: "https://xvz2yjhq5vbfac4ekq52ovyam40xaemu.lambda-url.sa-east-1.on.aws",
    accessKeyId: process.env.TBF_AMAZON_SA_EAST_1.split(":")[0],
    secretAccessKey: process.env.TBF_AMAZON_SA_EAST_1.split(":")[1],
    location: "BR",
  },
  {
    service: "digitalocean",
    url: "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-f82589bf-1f38-4a6e-a863-f4d64be4d0b5/default/twitter-hashflags-api",
    whiskAuth: process.env.TBF_DIGITALOCEAN_US_NYC1,
    location: "US",
  },
  {
    service: "digitalocean",
    url: "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-da7afee5-f91f-4e22-8979-70a34e124cd5/default/twitter-hashflags-api",
    whiskAuth: process.env.TBF_DIGITALOCEAN_UK_LON1,
    location: "UK",
  },
  {
    service: "local",
    location: "SG",
  },
  //   {
  //     service: "proxy",
  //     host: "45.94.47.66",
  //     port: "8110",
  //     auth: process.env.TBF_PROXY,
  //     location: "SC",
  //   },
  //   {
  //     service: "test",
  //     location: "TEST",
  //   },
];

const order = ["US", "UK", "BR", "JP", "SG"].reverse();

const testData = [
  {
    hashtag: "んーふーすぎるギョーザ",
    starting_timestamp_ms: 1681570800000,
    ending_timestamp_ms: 1681657140000,
    animations: [
      {
        asset_url:
          "https://abs.twimg.com/hashflags/4503599730279419/a55876f1c26c4febde536a8d893c8fab3e93dc7447dd126bff93d096064929db_sakura_0.json",
        context: "Like",
        priority: 1,
      },
    ],
  },
  {
    hashtag: "020UP",
    starting_timestamp_ms: 1680332400000,
    ending_timestamp_ms: 1704063600000,
    asset_url:
      "https://abs.twimg.com/hashflags/OWL-Guangzhou_Charge_2023_Emoji/OWL-Guangzhou_Charge_2023_Emoji.png",
    is_hashfetti_enabled: true,
  },
];

const line = "───────────────────────";

export { authorization, regions, order, testData, line };
