import { connect } from 'cloudflare:sockets';

const 小魔法颜色表 = Array.from({ length: 256 }, (_, i) => (i + 256).toString(16).slice(1));
const 小可爱文字解码器 = new TextDecoder();

const 我的小甜甜身份证 = '58889888-8888-8888-8888-588898885888';
const 默认备用小可爱地址 = 'ip.8298888.xyz';

// ═══════════════════════════════════════════════════
// 🚀 高吞吐参数（两套预设，按需切换注释）
// ═══════════════════════════════════════════════════

// ── 预设A：高吞吐模式（大文件/下载优先，默认）──
// const 合包最大字节 = 512 * 1024;  // 512KB：单包更大，吞吐更高
// const 合包刷新阈值 = 384 * 1024;  // 384KB = 512KB × 75%，紧急刷新阈值
// const 合包最大等待 = 20;           // 20ms：等待时间更长，合包更充分

// ── 预设B：低延迟模式（直播/实时游戏优先，当前启用）──
// 规则：合包刷新阈值 = 合包最大字节 × 75%，三值必须联动修改
const 合包最大字节 = 128 * 1024;  // 128KB：包更小，发送更及时
const 合包刷新阈值 = 96 * 1024;   // 96KB = 128KB × 75%，紧急刷新阈值
const 合包最大等待 = 5;            // 5ms：超时极短，延迟优先

// ── 与合包无关，两套预设均无需修改 ──
const 桥梁缓冲水位 = 2 * 1024 * 1024;  // 2MB，流控层，与合包参数无关
const 直连超时毫秒 = 5000;              // 5s 直连超时

export default {
  async fetch(来自外面的请求) {
    const 握手头 = 来自外面的请求.headers.get('Upgrade');
    const 网址 = new URL(来自外面的请求.url);

    // 支持：?ip=1.2.3.4  |  /ip=1.2.3.4  |  不传则用默认备用地址
    if (握手头 && 握手头.toLowerCase() === 'websocket') {
      let 候选地址 = 默认备用小可爱地址;

      if (网址.searchParams.has('ip')) {
        // 路线A：query 参数传参 ?ip=xxx
        候选地址 = 网址.searchParams.get('ip');
      } else {
        // 路线B：path 传参 /ip=xxx（完整保留）
        const 提取路径IP = 网址.pathname.match(/^\/ip=([^&\/]+)/);
        if (提取路径IP) {
          候选地址 = decodeURIComponent(提取路径IP[1]);
        }
        // 路线C：两者都没有 → 使用默认备用小可爱地址（已在初始化时赋值）
      }
      if (候选地址.length > 253 || !/^[a-zA-Z0-9._\-:[\]]+$/.test(候选地址)) {
        候选地址 = 默认备用小可爱地址;
      }

      return await 升级成小可爱通道(候选地址);
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function 升级成小可爱通道(当前备用地址) {
  const 泡泡对 = new WebSocketPair();
  const [小甜甜端, 服务端] = Object.values(泡泡对);
  服务端.accept();
  服务端.send(new Uint8Array([0, 0]));
  开启数据小火车(服务端, 当前备用地址).catch((e) => { console.error("[小火车]", e); });
  return new Response(null, { status: 101, webSocket: 小甜甜端 });
}

async function 开启数据小火车(服务端, 当前备用地址) {
  let 小火车TCP通道;
  let 是第一个糖果包 = true;
  let 已经关门了 = false;

  let 正在处理消息 = false;
  const 消息待办队列 = [];

  const ts桥梁 = new TransformStream(
    {},
    new ByteLengthQueuingStrategy({ highWaterMark: 桥梁缓冲水位 }),
    new ByteLengthQueuingStrategy({ highWaterMark: 桥梁缓冲水位 }),
  );
  const 桥梁写入端 = ts桥梁.writable.getWriter();

  function 关门谢客(代码 = 1011, 原因 = '再见啦', WS已先关闭 = false) {
    if (已经关门了) return;
    已经关门了 = true;
    if (!WS已先关闭) {
      try { 服务端.close(代码, 原因); } catch {}
    }
    桥梁写入端.close().catch(() => {});
    try { 小火车TCP通道?.close?.(); } catch {}
  }

  async function 带超时的连接(主机, 端口) {
    let 炸弹定时器;
    const 通道 = connect({ hostname: 主机, port: 端口 });
    const 超时炸弹 = new Promise((_, reject) => {
      炸弹定时器 = setTimeout(() => reject(new Error('连接超时')), 直连超时毫秒);
    });
    try {
      await Promise.race([通道.opened, 超时炸弹]);
      return 通道;
    } catch (错误) {
      try { 通道.close(); } catch {}
      throw 错误;
    } finally {
      clearTimeout(炸弹定时器);
    }
  }

  服务端.addEventListener('close', () => 关门谢客(1000, '客户端挥手再见', true));
  服务端.addEventListener('error', () => 关门谢客(1011, 'WS出错啦', true));

  服务端.addEventListener('message', (事件) => {
    if (已经关门了) return;
    消息待办队列.push(事件.data);
    if (!正在处理消息) {
      正在处理消息 = true;
      (async () => {
        while (消息待办队列.length > 0) {
          if (已经关门了) break;
          const 当前数据 = 消息待办队列.shift();
          try {
            if (是第一个糖果包) {
              是第一个糖果包 = false;
              await 解读第一个糖果包(当前数据);
            } else {
              if (typeof 当前数据 === 'string') { 关门谢客(1008, '不支持文本帧'); break; }
              await 桥梁写入端.write(当前数据);
            }
          } catch {
            关门谢客(1011, '糖果包处理失败');
            break;
          }
        }
        正在处理消息 = false;
      })().catch(() => {
        正在处理消息 = false;
        关门谢客(1011, '消息队列崩溃');
      });
    }
  });

  async function 解读第一个糖果包(糖果数据) {
    if (typeof 糖果数据 === 'string') { 关门谢客(1008, '不支持文本帧'); return; }
    const 视图 = new DataView(糖果数据);
    if (糖果数据.byteLength < 22) {
      关门谢客(1008, '糖果包太短了');
      return;
    }

    if (把字节变成身份证号(视图, 1) !== 我的小甜甜身份证) {
      关门谢客(1008, '身份证不对哦');
      return;
    }

    const 附加长度 = 视图.getUint8(17);
    const 端口起始位 = 18 + 附加长度 + 1;
    if (端口起始位 + 2 > 糖果数据.byteLength) { 关门谢客(1008, '糖果包太短了'); return; }
    const 目标端口 = 视图.getUint16(端口起始位);
    if (目标端口 === 0) {
      关门谢客(1008, '端口不合法');
      return;
    }
    const 地址类型起始位 = 端口起始位 + 2;
    const 地址类型 = 视图.getUint8(地址类型起始位);

    let 地址字节长度 = 0;
    let 目标地址 = '';
    let 地址数据起始位 = 地址类型起始位 + 1;

    switch (地址类型) {
      case 1:
        地址字节长度 = 4;
        目标地址 = `${视图.getUint8(地址数据起始位)}.${视图.getUint8(地址数据起始位+1)}.${视图.getUint8(地址数据起始位+2)}.${视图.getUint8(地址数据起始位+3)}`;
        break;
      case 2:
        地址字节长度 = 视图.getUint8(地址数据起始位);
        if (地址字节长度 === 0) { 关门谢客(1008, '地址为空'); return; }
        地址数据起始位 += 1;
        目标地址 = 小可爱文字解码器.decode(new Uint8Array(糖果数据, 地址数据起始位, 地址字节长度));
        break;
      case 3:
        地址字节长度 = 16;
        目标地址 = Array.from(
          { length: 8 },
          (_, i) => 视图.getUint16(地址数据起始位 + i * 2).toString(16)
        ).join(':');
        break;
      default:
        关门谢客(1008, '不认识的地址类型');
        return;
    }

    const 首包剩余数据 = 糖果数据.slice(地址数据起始位 + 地址字节长度);

    try {
      小火车TCP通道 = await 带超时的连接(目标地址, 目标端口);
    } catch {
      try {
        const { 备用主机, 备用端口 } = 拆分地址和端口(当前备用地址, 目标端口);
        小火车TCP通道 = await 带超时的连接(备用主机, 备用端口);
      } catch {
        关门谢客(1011, '所有路都堵死啦');
        return;
      }
    }

    连上之后开始传数据(首包剩余数据).catch((e) => { console.error("[传数据]", e); });
  }

  async function 连上之后开始传数据(首包剩余数据) {
    if (!已经关门了 && 首包剩余数据?.byteLength > 0) {
      await 桥梁写入端.write(首包剩余数据);
    }
    await Promise.all([
      ts桥梁.readable.pipeTo(小火车TCP通道.writable).catch(() => {
        关门谢客(1011, '桥梁→TCP中断');
      }),
      小火车TCP通道.readable.pipeTo(
        合包发送流(服务端, 合包最大字节, 合包刷新阈值, 合包最大等待)
      ).catch(() => {
        关门谢客(1011, 'TCP→WS异常');
      }),
    ]);
  }
}

function 合包发送流(服务端, 最大字节, 刷新阈值, 最大等待ms) {
  let 积累缓冲 = [];
  let 积累字节数 = 0;
  let 定时器 = null;
  let 发送中 = false;
  const 发送待办 = [];

  function 立刻发出去() {
    if (定时器) { clearTimeout(定时器); 定时器 = null; }
    if (积累缓冲.length === 0) return;
    if (服务端.readyState !== 1) {
      积累缓冲 = [];
      积累字节数 = 0;
      return;
    }
    const 合并包 = new Uint8Array(积累字节数);
    let 写入位置 = 0;
    for (const 块 of 积累缓冲) {
      const 视图块 = ArrayBuffer.isView(块)
        ? new Uint8Array(块.buffer, 块.byteOffset, 块.byteLength)
        : new Uint8Array(块);
      合并包.set(视图块, 写入位置);
      写入位置 += 视图块.byteLength;
    }
    积累缓冲 = [];
    积累字节数 = 0;
    服务端.send(合并包);
  }

  function 启动发送循环() {
    if (发送中) return;
    发送中 = true;
    (async () => {
      while (发送待办.length > 0) {
        const { chunk: 块, resolve: 完成 } = 发送待办.shift();
        if (块.byteLength === 0) { 立刻发出去(); 完成(); continue; }
        积累缓冲.push(块);
        积累字节数 += 块.byteLength;
        if (积累字节数 >= 刷新阈值) {
          立刻发出去();
        } else if (!定时器) {
          定时器 = setTimeout(立刻发出去, 最大等待ms);
        }
        完成();
      }
      发送中 = false;
    })().catch(() => { 发送中 = false; });
  }

  return new WritableStream(
    {
      write(chunk) {
        return new Promise((resolve, reject) => {
          发送待办.push({ chunk, resolve, reject });
          启动发送循环();
        });
      },
      flush() {
        return new Promise((resolve) => {
          发送待办.push({
            chunk: new Uint8Array(0),
            resolve: () => { 立刻发出去(); resolve(); },
            reject: resolve,
          });
          启动发送循环();
        });
      },
      abort() {
        if (定时器) { clearTimeout(定时器); 定时器 = null; }
        积累缓冲 = [];
        积累字节数 = 0;
        发送待办.length = 0;
        发送中 = false;
      },
    },
    new ByteLengthQueuingStrategy({ highWaterMark: 合包最大字节 }),
  );
}

function 拆分地址和端口(地址字符串, 默认端口) {
  function 校验端口(端口) {
    return Number.isInteger(端口) && 端口 >= 1 && 端口 <= 65535 ? 端口 : 默认端口;
  }
  if (地址字符串.startsWith('[')) {
    const 括号结束 = 地址字符串.indexOf(']');
    if (括号结束 === -1) return { 备用主机: 地址字符串, 备用端口: 默认端口 };
    const 备用主机 = 地址字符串.slice(0, 括号结束 + 1);
    const 后缀 = 地址字符串.slice(括号结束 + 1);
    return {
      备用主机,
      备用端口: 校验端口(后缀.startsWith(':') ? Number(后缀.slice(1)) : 默认端口),
    };
  }
  const 冒号位 = 地址字符串.lastIndexOf(':');
  if (冒号位 === -1) return { 备用主机: 地址字符串, 备用端口: 默认端口 };
  if (地址字符串.indexOf(':') !== 冒号位) return { 备用主机: 地址字符串, 备用端口: 默认端口 };
  return {
    备用主机: 地址字符串.slice(0, 冒号位),
    备用端口: 校验端口(Number(地址字符串.slice(冒号位 + 1))),
  };
}

function 把字节变成身份证号(视图, offset = 0) {
  const h = 小魔法颜色表;
  return (
    h[视图.getUint8(offset)]    + h[视图.getUint8(offset+1)]  +
    h[视图.getUint8(offset+2)]  + h[视图.getUint8(offset+3)]  + '-' +
    h[视图.getUint8(offset+4)]  + h[视图.getUint8(offset+5)]  + '-' +
    h[视图.getUint8(offset+6)]  + h[视图.getUint8(offset+7)]  + '-' +
    h[视图.getUint8(offset+8)]  + h[视图.getUint8(offset+9)]  + '-' +
    h[视图.getUint8(offset+10)] + h[视图.getUint8(offset+11)] +
    h[视图.getUint8(offset+12)] + h[视图.getUint8(offset+13)] +
    h[视图.getUint8(offset+14)] + h[视图.getUint8(offset+15)]
  ).toLowerCase();
}
