import { connect } from "cloudflare:sockets";
let 甜心小印鉴 = "58889888-8888-8888-8888-588898885888";
let 备用小驿站 = "ip.8298888.xyz";
export default {
  async fetch(来访小请求) {
    const 升级小标记 = 来访小请求.headers.get("Upgrade");
    const url = new URL(来访小请求.url);
    if (升级小标记 === "websocket") {
      if (url.searchParams.has("ip")) {
        备用小驿站 = url.searchParams.get("ip");
      }
      return await 敲门甜甜窗();
    }
    return new Response(null);
  },
};

async function 敲门甜甜窗() {
  const 甜甜窗对儿 = new WebSocketPair();
  const [窗外小萌萌, 窗内小萌萌] = Object.values(甜甜窗对儿);
  窗内小萌萌.accept();
  窗内小萌萌.send(new Uint8Array([0, 0]));
  await 开动小搬运队(窗内小萌萌);
  return new Response(null, { status: 101, webSocket: 窗外小萌萌 });
}

async function 开动小搬运队(窗内小萌萌) {
  let 远方小细管,
    第一颗小糖 = true,
    小糖排排队 = Promise.resolve(),
    小搬运娃;

  窗内小萌萌.addEventListener("message", async (event) => {
    小糖排排队 = 小糖排排队.then(async () => {
      if (第一颗小糖) {
        第一颗小糖 = false;
        await 拆开心形信封(event.data);
      } else {
        await 小搬运娃.write(event.data);
      }
    });
  });

  async function 拆开心形信封(心形数据包) {
    if (
      核对甜心印鉴(new Uint8Array(心形数据包.slice(1, 17))) !== 甜心小印鉴
    ) {
      return;
    }

    const 跳格子偏移 = new Uint8Array(心形数据包)[17];
    const 门牌小指针 = 18 + 跳格子偏移 + 1;
    const 门牌小纸片 = 心形数据包.slice(门牌小指针, 门牌小指针 + 2);
    const 目标小门牌 = new DataView(门牌小纸片).getUint16(0);
    const 地址小指针 = 门牌小指针 + 2;
    const 地址小纸片 = new Uint8Array(
      心形数据包.slice(地址小指针, 地址小指针 + 1),
    );
    const 地址小分类 = 地址小纸片[0];
    let 地址小长度 = 0;
    let 目标小地址 = "";
    let 地址内容小指针 = 地址小指针 + 1;

    switch (地址小分类) {
      case 1:
        地址小长度 = 4;
        目标小地址 = new Uint8Array(
          心形数据包.slice(地址内容小指针, 地址内容小指针 + 地址小长度),
        ).join(".");
        break;
      case 2:
        地址小长度 = new Uint8Array(
          心形数据包.slice(地址内容小指针, 地址内容小指针 + 1),
        )[0];
        地址内容小指针 += 1;
        目标小地址 = new TextDecoder().decode(
          心形数据包.slice(地址内容小指针, 地址内容小指针 + 地址小长度),
        );
        break;
      case 3:
        地址小长度 = 16;
        const dataView = new DataView(
          心形数据包.slice(地址内容小指针, 地址内容小指针 + 地址小长度),
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

    const 初始小心意 = 心形数据包.slice(地址内容小指针 + 地址小长度);
    try {
      远方小细管 = connect({ hostname: 目标小地址, port: 目标小门牌 });
      await 远方小细管.opened;
    } catch {
      const [备用小驿站地址, 备用小驿站端口 = 目标小门牌] = 备用小驿站.split(":");
      远方小细管 = connect({ hostname: 备用小驿站地址, port: 备用小驿站端口 });
    }
    搭起小细管(初始小心意);
  }

  function 核对甜心印鉴(arr, offset = 0) {
    const 印鉴小串 = (
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
    ).toLowerCase();
    return 印鉴小串;
  }

  const 十六进制小花表 = [];
  for (let i = 0; i < 256; ++i) {
    十六进制小花表.push((i + 256).toString(16).slice(1));
  }

  async function 搭起小细管(初始小心意) {
    小搬运娃 = 远方小细管.writable.getWriter();
    if (初始小心意) await 小搬运娃.write(初始小心意);
    远方小细管.readable.pipeTo(
      new WritableStream({
        async write(心形数据包) {
          窗内小萌萌.send(心形数据包);
        },
      }),
    );
  }
}
