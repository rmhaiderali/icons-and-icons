// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import aws4 from "aws4";
import got from "got";
import { httpsOverHttp } from "tunnel";
import { authorization, testData } from "../constants/tbf.constants.js";

async function amazon(token, info) {
  let resp = await fetch(
    info.url + "/?token=" + token,
    aws4.sign(
      {
        service: "lambda",
        host: info.url.slice(8),
        region: info.url.split(".")[2],
        path: "/?token=" + token,
      },
      {
        accessKeyId: info.accessKeyId,
        secretAccessKey: info.secretAccessKey,
      }
    )
  );
  resp = await resp.json();
  return JSON.parse(resp.body ? resp.body : resp);
}

async function digitalocean(token, info) {
  const resp = await fetch(info.url + "/?" + token, {
    headers: {
      "X-Require-Whisk-Auth": info.whiskAuth,
    },
  });
  return await resp.json();
}

async function proxy(token, info) {
  const hashflags = await got("https://api.twitter.com/1.1/hashflags.json", {
    agent: {
      https: httpsOverHttp({
        proxy: {
          host: info.host,
          port: info.port,
          proxyAuth: info.auth,
        },
      }),
    },
    headers: {
      authorization: authorization,
      "x-guest-token": token,
    },
  });
  return JSON.parse(hashflags.body);
}

async function local(token) {
  const hashflags = await fetch("https://api.twitter.com/1.1/hashflags.json", {
    headers: {
      authorization: authorization,
      "x-guest-token": token,
    },
  });
  return await hashflags.json();
}

async function test() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return testData;
}

export default { amazon, digitalocean, proxy, local, test };
