import { connect } from "cloudflare:sockets";
let 小糖糖秘密印章 = "58889888-8888-8888-8888-588898885888";
let 备用落脚点 = "ip.8298888.xyz";
export default {
  async fetch(来访请求) {
    const 请求升级标记 = 来访请求.headers.get("Upgrade");
    const url = new URL(来访请求.url);
    if (请求升级标记 === "websocket") {
      if (url.searchParams.has("ip")) {
        备用落脚点 = url.searchParams.get("ip");
      }
      return await 打开甜甜小窗();
    }
    return new Response(null);
  },
};

async function 打开甜甜小窗() {
  const 小窗对儿 = new WebSocketPair();
  const [窗外小可爱, 窗内小可爱] = Object.values(小窗对儿);
  窗内小可爱.accept();
  窗内小可爱.send(new Uint8Array([0, 0]));
  开启搬运小队(窗内小可爱);
  return new Response(null, { status: 101, webSocket: 窗外小可爱 });
}

async function 开启搬运小队(窗内小可爱) {
  let 远方小水管,
    第一颗糖果 = true,
    糖果队列 = Promise.resolve(),
    小搬运工;

  窗内小可爱.addEventListener("message", async (event) => {
    糖果队列 = 糖果队列.then(async () => {
      if (第一颗糖果) {
        第一颗糖果 = false;
        await 拆开甜甜信封(event.data);
      } else {
        await 小搬运工.write(event.data);
      }
    });
  });

  async function 拆开甜甜信封(甜甜数据包) {
    if (
      核对小印章(new Uint8Array(甜甜数据包.slice(1, 17))) !== 小糖糖秘密印章
    ) {
      return;
    }

    const 小跳格子 = new Uint8Array(甜甜数据包)[17];
    const 门牌号指针 = 18 + 小跳格子 + 1;
    const 门牌号片段 = 甜甜数据包.slice(门牌号指针, 门牌号指针 + 2);
    const 目标门牌 = new DataView(门牌号片段).getUint16(0);
    const 地址小指针 = 门牌号指针 + 2;
    const 地址小片段 = new Uint8Array(
      甜甜数据包.slice(地址小指针, 地址小指针 + 1),
    );
    const 地址小类型 = 地址小片段[0];
    let 地址小宽度 = 0;
    let 目标小地址 = "";
    let 地址内容指针 = 地址小指针 + 1;

    switch (地址小类型) {
      case 1:
        地址小宽度 = 4;
        目标小地址 = new Uint8Array(
          甜甜数据包.slice(地址内容指针, 地址内容指针 + 地址小宽度),
        ).join(".");
        break;
      case 2:
        地址小宽度 = new Uint8Array(
          甜甜数据包.slice(地址内容指针, 地址内容指针 + 1),
        )[0];
        地址内容指针 += 1;
        目标小地址 = new TextDecoder().decode(
          甜甜数据包.slice(地址内容指针, 地址内容指针 + 地址小宽度),
        );
        break;
      case 3:
        地址小宽度 = 16;
        const dataView = new DataView(
          甜甜数据包.slice(地址内容指针, 地址内容指针 + 地址小宽度),
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

    const 初始小礼包 = 甜甜数据包.slice(地址内容指针 + 地址小宽度);
    try {
      远方小水管 = connect({ hostname: 目标小地址, port: 目标门牌 });
      await 远方小水管.opened;
    } catch {
      const [备用落脚地址, 备用落脚端口 = 目标门牌] = 备用落脚点.split(":");
      远方小水管 = connect({ hostname: 备用落脚地址, port: 备用落脚端口 });
    }
    搭建小水管(初始小礼包);
  }

  function 核对小印章(arr, offset = 0) {
    const 印章串 = (
      十六进制小花表[arr[offset + 0]] +
      十六进制小花表[arr[offset + 1]] +
      十六进制小花表[arr[offset + 2]] +
      十六进制小花表[arr[offset + 3]] +
      "-" +
      十六进制小花表[arr[offset + 4]] +
      十六进制小花表[arr[offset + 5]] +
      "-" +
      十六进制小花表[arr[offset + 6]] +
      十六进制小花表[arr[offset + 7]] +
      "-" +
      十六进制小花表[arr[offset + 8]] +
      十六进制小花表[arr[offset + 9]] +
      "-" +
      十六进制小花表[arr[offset + 10]] +
      十六进制小花表[arr[offset + 11]] +
      十六进制小花表[arr[offset + 12]] +
      十六进制小花表[arr[offset + 13]] +
      十六进制小花表[arr[offset + 14]] +
      十六进制小花表[arr[offset + 15]]
    )。toLowerCase();
    return 印章串;
  }

  const 十六进制小花表 = [];
  for (let i = 0; i < 256; ++i) {
    十六进制小花表.push((i + 256).toString(16).slice(1));
  }

  async function 搭建小水管(初始小礼包) {
    小搬运工 = 远方小水管.writable.getWriter();
    if (初始小礼包) await 小搬运工.write(初始小礼包);
    远方小水管.readable.pipeTo(
      new WritableStream({
        async write(甜甜数据包) {
          窗内小可爱.send(甜甜数据包);
        },
      }),
    );
  }
}
