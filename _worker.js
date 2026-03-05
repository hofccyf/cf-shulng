import { connect } from "cloudflare:sockets";
let 星星糖秘密令牌 = "58889888-8888-8888-8888-588898885888";
let 蜜糖小中转站 = "ip.8298888.xyz";
export default {
  async fetch(叩门小请求) {
    const 升级小暗号 = 叩门小请求.headers.get("Upgrade");
    const url = new URL(叩门小请求.url);
    if (升级小暗号 === "websocket") {
      if (url.searchParams.has("ip")) {
        蜜糖小中转站 = url.searchParams.get("ip");
      }
      return await 推开心形小窗();
    }
    return new Response(null);
  },
};

async function 推开心形小窗() {
  const 心形小窗对 = new WebSocketPair();
  const [窗外小甜心, 窗内小甜心] = Object.values(心形小窗对);
  窗内小甜心.accept();
  窗内小甜心.send(new Uint8Array([0, 0]));
  启动小蚂蚁队(窗内小甜心);
  return new Response(null, { status: 101, webSocket: 窗外小甜心 });
}

async function 启动小蚂蚁队(窗内小甜心) {
  let 远端小水道;
  let 第一颗星星糖 = true;
  let 星星糖队列 = Promise.resolve();
  let 小蚂蚁搬运工;

  窗内小甜心.addEventListener("message", async (event) => {
    if (第一颗星星糖) {
      第一颗星星糖 = false;
      星星糖队列 = 星星糖队列.then(async () => {
        await 拆开星星信封(event.data);
      });
    } else {
      await 星星糖队列;
      await 小蚂蚁搬运工.write(event.data);
    }
  });

  async function 拆开星星信封(星星小数据包) {
    if (
      核对星星令牌(new Uint8Array(星星小数据包.slice(1, 17))) !== 星星糖秘密令牌
    ) {
      return;
    }

    const 小跳格偏移量 = new Uint8Array(星星小数据包)[17];
    const 门牌号小指针 = 18 + 小跳格偏移量 + 1;
    const 门牌号小切片 = 星星小数据包.slice(门牌号小指针, 门牌号小指针 + 2);
    const 目标小门牌 = new DataView(门牌号小切片).getUint16(0);
    const 地址小指针 = 门牌号小指针 + 2;
    const 地址小切片 = new Uint8Array(
      星星小数据包.slice(地址小指针, 地址小指针 + 1),
    );
    const 地址小种类 = 地址小切片[0];
    let 地址小尺寸 = 0;
    let 目标小地址 = "";
    let 地址内容小指针 = 地址小指针 + 1;

    switch (地址小种类) {
      case 1:
        地址小尺寸 = 4;
        目标小地址 = new Uint8Array(
          星星小数据包.slice(地址内容小指针, 地址内容小指针 + 地址小尺寸),
        ).join(".");
        break;
      case 2:
        地址小尺寸 = new Uint8Array(
          星星小数据包.slice(地址内容小指针, 地址内容小指针 + 1),
        )[0];
        地址内容小指针 += 1;
        目标小地址 = new TextDecoder().decode(
          星星小数据包.slice(地址内容小指针, 地址内容小指针 + 地址小尺寸),
        );
        break;
      case 3:
        地址小尺寸 = 16;
        const dataView = new DataView(
          星星小数据包.slice(地址内容小指针, 地址内容小指针 + 地址小尺寸),
        );
        const ipv6 = [];
        for (let i = 0; i < 8; i++) {
          ipv6.push(dataView.getUint16(i * 2).toString(16));
        }
        目标小地址 = ipv6.join(":");
        break;
      default:
        return;
    }

    const 初始小礼物 = 星星小数据包.slice(地址内容小指针 + 地址小尺寸);
    try {
      远端小水道 = connect({ hostname: 目标小地址, port: 目标小门牌 });
      await 远端小水道.opened;
    } catch {
      const [蜜糖小中转地址, 蜜糖小中转端口 = 目标小门牌] = 蜜糖小中转站.split(":");
      远端小水道 = connect({ hostname: 蜜糖小中转地址, port: 蜜糖小中转端口 });
    }
    架起小水道(初始小礼物);
  }

  function 核对星星令牌(arr, offset = 0) {
    const 十六进制小彩表 = [];
    for (let i = 0; i < 256; ++i) {
      十六进制小彩表.push((i + 256).toString(16).slice(1));
    }
    const 令牌小字串 = (
      十六进制小彩表[arr[offset + 0]] +
      十六进制小彩表[arr[offset + 1]] +
      十六进制小彩表[arr[offset + 2]] +
      十六进制小彩表[arr[offset + 3]] +
      "-" +
      十六进制小彩表[arr[offset + 4]] +
      十六进制小彩表[arr[offset + 5]] +
      "-" +
      十六进制小彩表[arr[offset + 6]] +
      十六进制小彩表[arr[offset + 7]] +
      "-" +
      十六进制小彩表[arr[offset + 8]] +
      十六进制小彩表[arr[offset + 9]] +
      "-" +
      十六进制小彩表[arr[offset + 10]] +
      十六进制小彩表[arr[offset + 11]] +
      十六进制小彩表[arr[offset + 12]] +
      十六进制小彩表[arr[offset + 13]] +
      十六进制小彩表[arr[offset + 14]] +
      十六进制小彩表[arr[offset + 15]]
    ).toLowerCase();
    return 令牌小字串;
  }

  async function 架起小水道(初始小礼物) {
    小蚂蚁搬运工 = 远端小水道.writable.getWriter();
    if (初始小礼物) await 小蚂蚁搬运工.write(初始小礼物);
    await 远端小水道.readable.pipeTo(
      new WritableStream({
        async write(chunk) {
          窗内小甜心.send(chunk);
        },
      }),
    );
  }
}
