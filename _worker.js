
import { connect } from "cloudflare:sockets";

const 哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒 = Array.from({ length: 256 }, (_, i) => (i + 256).toString(16).slice(1));
let 人家的小粉红魔法心心钥匙钥匙超级秘密哦 = "58889888-8888-8888-8888-588898885888";
let 小星星默认连接窝窝酱酱 = "ip.8298888.xyz";
const 超级大缓冲魔法池池大小大小 = 256 * 1024; // 千兆专用256KB，下载飞起直播稳稳~

export default {
  async fetch(粉粉小请求糖果包包) {
    const 小偷偷请求头头头头 = 粉粉小请求糖果包包.headers.get("Upgrade");
    const url = new URL(粉粉小请求糖果包包.url);
    if (小偷偷请求头头头头 === "websocket") {
      if (url.searchParams.has("host")) {
        小星星默认连接窝窝酱酱 = url.searchParams.get("host");
      }
      if (url.searchParams.has("buf")) {
        const bufSize = parseInt(url.searchParams.get("buf"));
        if (bufSize > 0 && bufSize <= 512 * 1024) 超级大缓冲魔法池池大小大小 = bufSize;
      }
      return await 升级升级小粉红连接通道通道();
    }
    return new Response(null);
  },
};

async function 升级升级小粉红连接通道通道() {
  const 超级粉嫩嫩WS双双小宝贝宝贝 = new WebSocketPair();
  const [客户端小星星星, WS超级接口萌酱酱] = Object.values(超级粉嫩嫩WS双双小宝贝宝贝);
  WS超级接口萌酱酱.accept();
  WS超级接口萌酱酱.send(new Uint8Array([0, 0]));
  启动启动超级无敌传输魔法传送门门(WS超级接口萌酱酱);
  return new Response(null, { status: 101, webSocket: 客户端小星星星 });
}

async function 启动启动超级无敌传输魔法传送门门(WS超级接口萌酱酱) {
  let TCP小窝窝连接酱酱;
  let 是不是人家超级首首小包包呀呀 = true;
  let 小排排魔法等待糖果队列队队 = Promise.resolve();
  let 写入写入小流流可爱宝贝贝;
  let 已已关闭关闭小铃铃铛铛 = false;
  let 超级大缓冲魔法池池 = new Uint8Array(0);

  WS超级接口萌酱酱.addEventListener("close", () => { 已已关闭关闭小铃铃铛铛 = true; });
  WS超级接口萌酱酱.addEventListener("error", () => { 已已关闭关闭小铃铃铛铛 = true; });

  WS超级接口萌酱酱.addEventListener("message", (event) => {
    if (已已关闭关闭小铃铃铛铛) return;
    小排排魔法等待糖果队列队队 = 小排排魔法等待糖果队列队队.then(async () => {
      try {
        const 小数据块块 = new Uint8Array(event.data);
        if (是不是人家超级首首小包包呀呀) {
          是不是人家超级首首小包包呀呀 = false;
          await 超级超级可爱解析解析协议协议小头头头(event.data, WS超级接口萌酱酱);
        } else {
          超级大缓冲魔法池池 = concatBuffers(超级大缓冲魔法池池, 小数据块块);
          if (超级大缓冲魔法池池.length >= 超级大缓冲魔法池池大小大小 && 写入写入小流流可爱宝贝贝 && !写入写入小流流可爱宝贝贝.closed) {
            await 写入写入小流流可爱宝贝贝.write(超级大缓冲魔法池池);
            超级大缓冲魔法池池 = new Uint8Array(0);
          }
        }
      } catch (e) {
        console.error("小呜呜错误错误:", e);
        已已关闭关闭小铃铃铛铛 = true;
      }
    });
  });

  async function 超级超级可爱解析解析协议协议小头头头(数据数据小包包包, WS超级接口萌酱酱) {
    const 数据数据小数组酱酱 = new Uint8Array(数据数据小包包包);
    if (数据数据小数组酱酱.length < 19) {
      WS超级接口萌酱酱.close(1002, "头头太短短小呜呜~");
      return;
    }

    if (超级超级验证验证魔法魔法小钥匙钥匙(new Uint8Array(数据数据小包包包.slice(1, 17))) !== 人家的小粉红魔法心心钥匙钥匙超级秘密哦) {
      WS超级接口萌酱酱.close(1003, "魔法魔法不对不对哦哦~");
      return;
    }

    const 数据数据小位置位位 = 数据数据小数组酱酱[17];
    const 端口端口开始开始小位置位位 = 18 + 数据数据小位置位位 + 1;
    if (端口端口开始开始小位置位位 + 2 > 数据数据小数组酱酱.length) {
      WS超级接口萌酱酱.close(1002, "端口端口小信息信息不足不足~");
      return;
    }
    const 端口端口数据数据 = 数据数据小包包包.slice(端口端口开始开始小位置位位, 端口端口开始开始小位置位位 + 2);
    const 目标目标小端口端口 = new DataView(端口端口数据数据).getUint16(0);

    const 地址地址开始开始小位置位位 = 端口端口开始开始小位置位位 + 2;
    const 地址地址类型类型数据数据 = new Uint8Array(数据数据小包包包.slice(地址地址开始开始小位置位位, 地址地址开始开始小位置位位 + 1));
    const 地址地址类型类型 = 地址地址类型类型数据数据[0];
    let 地址地址小长度度度 = 0;
    let 目标目标地址地址酱酱 = "";
    let 地址地址位置位置 = 地址地址开始开始小位置位位 + 1;

    switch (地址地址类型类型) {
      case 1:
        地址地址小长度度度 = 4;
        if (地址地址位置位置 + 地址地址小长度度度 > 数据数据小数组酱酱.length) {
          WS超级接口萌酱酱.close(1002, "地址地址数据数据不足不足~");
          return;
        }
        目标目标地址地址酱酱 = new Uint8Array(数据数据小包包包.slice(地址地址位置位置, 地址地址位置位置 + 地址地址小长度度度)).join(".");
        break;
      case 2:
        if (地址地址位置位置 + 1 > 数据数据小数组酱酱.length) {
          WS超级接口萌酱酱.close(1002, "长度长度小信息信息不足不足~");
          return;
        }
        地址地址小长度度度 = new Uint8Array(数据数据小包包包.slice(地址地址位置位置, 地址地址位置位置 + 1))[0];
        地址地址位置位置 += 1;
        if (地址地址位置位置 + 地址地址小长度度度 > 数据数据小数组酱酱.length) {
          WS超级接口萌酱酱.close(1002, "地址地址超超长长长~");
          return;
        }
        目标目标地址地址酱酱 = new TextDecoder().decode(数据数据小包包包.slice(地址地址位置位置, 地址地址位置位置 + 地址地址小长度度度));
        break;
      case 3:
        地址地址小长度度度 = 16;
        if (地址地址位置位置 + 地址地址小长度度度 > 数据数据小数组酱酱.length) {
          WS超级接口萌酱酱.close(1002, "IPv6小地址地址不足不足~");
          return;
        }
        const dv = new DataView(数据数据小包包包.slice(地址地址位置位置, 地址地址位置位置 + 地址地址小长度度度));
        const ipv6小部分部分 = [];
        for (let i = 0; i < 8; i++) {
          ipv6小部分部分.push(dv.getUint16(i * 2).toString(16));
        }
        目标目标地址地址酱酱 = ipv6小部分部分.join(":");
        break;
      default:
        WS超级接口萌酱酱.close(1002, "不支持支持小类型类型哦哦~");
        return;
    }

    const 剩余剩余小数据数据 = 数据数据小包包包.slice(地址地址位置位置 + 地址地址小长度度度);
    if (剩余剩余小数据数据.byteLength === 0) 剩余剩余小数据数据 = undefined;

    try {
      TCP小窝窝连接酱酱 = connect({ hostname: 目标目标地址地址酱酱, port: 目标目标小端口端口 });
      await TCP小窝窝连接酱酱.opened;
    } catch (e) {
      console.warn("主主连接连接小失败失败，用用备用备小窝窝:", e);
      const [备用备小主机机机, 备用备小端口口口 = 目标目标小端口端口] = 小星星默认连接窝窝酱酱.split(":");
      TCP小窝窝连接酱酱 = connect({ hostname: 备用备小主机机机, port: parseInt(备用备小端口口口) || 目标目标小端口端口 });
      await TCP小窝窝连接酱酱.opened;
    }

    建立建立超级双双向向传输传输魔法管道道道(剩余剩余小数据数据);
  }

  function 超级超级验证验证魔法魔法小钥匙钥匙(arr, offset = 0) {
    const 钥匙钥匙小串串串 = (
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 0]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 1]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 2]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 3]] +
      "-" +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 4]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 5]] +
      "-" +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 6]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 7]] +
      "-" +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 8]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 9]] +
      "-" +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 10]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 11]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 12]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 13]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 14]] +
      哇塞超级无敌可爱的小魔法数字转换萌萌盒子盒盒[arr[offset + 15]]
    ).toLowerCase();
    return 钥匙钥匙小串串串;
  }

  function concatBuffers(oldBuf, newBuf) {
    const 总总大小大小 = oldBuf.length + newBuf.length;
    const 新新缓冲缓冲 = new Uint8Array(总总大小大小);
    新新缓冲缓冲.set(oldBuf);
    新新缓冲缓冲.set(newBuf, oldBuf.length);
    return 新新缓冲缓冲;
  }

  async function 建立建立超级双双向向传输传输魔法管道道道(初始初始小数据数据) {
    try {
      写入写入小流流可爱宝贝贝 = TCP小窝窝连接酱酱.writable.getWriter();
      if (初始初始小数据数据) {
        await 写入写入小流流可爱宝贝贝.write(初始初始小数据数据);
      }
      if (超级大缓冲魔法池池.length > 0) {
        await 写入写入小流流可爱宝贝贝.write(超级大缓冲魔法池池);
      }
      await TCP小窝窝连接酱酱.readable.pipeTo(
        new WritableStream({
          async write(chunk) {
            if (已已关闭关闭小铃铃铛铛) return;
            WS超级接口萌酱酱.send(chunk);
          },
          close() {
            已已关闭关闭小铃铃铛铛 = true;
          },
        }),
      );
    } catch (e) {
      console.error("传送门门小故障障:", e);
      已已关闭关闭小铃铃铛铛 = true;
    }
  }
}
