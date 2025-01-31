"use server";

export async function ProxyPOST(request_body) {
  console.log(request_body);
  const res = await fetch(
    `${process.env.TESTNET_MERCURY_ENDPOINT}/zephyr/execute`,
    {
      method: "POST",
      headers: {
        Authorization: ["Bearer", process.env.MERCURY_JWT].join(" "),
        "Content-Type": "application/json",
      },
      body: request_body,
    },
  );

  const resp = await res.json();
  return resp;
}

export async function fetchPools() {
  //await new Promise(resolve => setTimeout(resolve, 10000))

  const res = await fetch(
    `${process.env.TESTNET_MERCURY_ENDPOINT}/zephyr/execute`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: ["Bearer", process.env.MERCURY_JWT].join(" "),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: {
          Function: {
            fname: "get_pools",
            arguments: "{}",
          },
        },
      }),
    },
  );

  const json_res = await res.json();

  return json_res;
}
