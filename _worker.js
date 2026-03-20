import { connect } from 'cloudflare:sockets';

const 变身密钥魔法数组 = Array.from({ length: 256 }, (_, i酱) => (i酱 + 256).toString(16).slice(1));
let 本宝宝的专属小秘密 = '58889888-8888-8888-8888-588898885888';
let 备用兜底小地址 = 'ip.8298888.xyz';

export default {
	async fetch(客官的请求酱) {
		const 偷看请求小帽子 = 客官的请求酱.headers.get('Upgrade');
		const 网址小精灵 = new URL(客官的请求酱.url);
		
		if (偷看请求小帽子 === 'websocket') {
			if (网址小精灵.searchParams.has('ip')) {
				备用兜底小地址 = 网址小精灵.searchParams.get('ip');
			}
			return await 进化成WS小超人();
		}
		return new Response(null);
	},
};

async function 进化成WS小超人() {
	const 孵化WS双胞胎 = new WebSocketPair();
	const [客户端主子, WS小管管] = Object.values(孵化WS双胞胎);
	
	WS小管管.accept();
	WS小管管.send(new Uint8Array([0, 0]));
	开启呼噜噜管道(WS小管管);
	
	return new Response(null, { status: 101, webSocket: 客户端主子 });
}

async function 开启呼噜噜管道(WS小管管) {
	let TCP小手手;
	let 是第一口饭饭吗 = true;
	let 嗷呜一口吃掉处理 = Promise.resolve();
	let 快递小哥;
	
	WS小管管.addEventListener('message', async (小事件) => {
		if (是第一口饭饭吗) {
			是第一口饭饭吗 = false;
			嗷呜一口吃掉处理 = 嗷呜一口吃掉处理.then(async () => {
				await 解开神秘小包裹头头(小事件.data);
			});
		} else {
			await 嗷呜一口吃掉处理;
			await 快递小哥.write(小事件.data);
		}
	});
	
	async function 解开神秘小包裹头头(神秘小包裹) {
		if (康康密码对不对(new Uint8Array(神秘小包裹.slice(1, 17))) !== 本宝宝的专属小秘密) {
			return;
		}
		
		const 找找数据藏哪啦 = new Uint8Array(神秘小包裹)[17];
		const 揪出端口小尾巴 = 18 + 找找数据藏哪啦 + 1;
		const 端口小床床 = 神秘小包裹.slice(揪出端口小尾巴, 揪出端口小尾巴 + 2);
		const 敲敲门端口 = new DataView(端口小床床).getUint16(0);
		
		const 揪出地址小尾巴 = 揪出端口小尾巴 + 2;
		const 地址小床床 = new Uint8Array(神秘小包裹.slice(揪出地址小尾巴, 揪出地址小尾巴 + 1));
		const 康康是什么地址捏 = 地址小床床[0];
		
		let 地址有多长吖 = 0;
		let 要去哪儿玩呀 = '';
		let 地址小书签 = 揪出地址小尾巴 + 1;
		
		switch (康康是什么地址捏) {
			case 1:
				地址有多长吖 = 4;
				要去哪儿玩呀 = new Uint8Array(神秘小包裹.slice(地址小书签, 地址小书签 + 地址有多长吖)).join('.');
				break;
			case 2:
				地址有多长吖 = new Uint8Array(神秘小包裹.slice(地址小书签, 地址小书签 + 1))[0];
				地址小书签 += 1;
				要去哪儿玩呀 = new TextDecoder().decode(神秘小包裹.slice(地址小书签, 地址小书签 + 地址有多长吖));
				break;
			case 3:
				地址有多长吖 = 16;
				const 数据透视镜 = new DataView(神秘小包裹.slice(地址小书签, 地址小书签 + 地址有多长吖));
				const 六代地址妹妹 = [];
				for (let i酱 = 0; i酱 < 8; i酱++) {
					六代地址妹妹.push(数据透视镜.getUint16(i酱 * 2).toString(16));
				}
				要去哪儿玩呀 = 六代地址妹妹.join(':');
				break;
			default:
				return;
		}
		
		const 喂第一口饭饭 = 神秘小包裹.slice(地址小书签 + 地址有多长吖);
		
		try {
			TCP小手手 = connect({ hostname: 要去哪儿玩呀, port: 敲敲门端口 });
			await TCP小手手.opened;
		} catch {
			const [备用IP小哥哥, 备用端口小姐姐 = 敲敲门端口] = 备用兜底小地址.split(':');
			TCP小手手 = connect({ hostname: 备用IP小哥哥, port: 备用端口小姐姐 });
		}
		搭起七彩小桥梁(喂第一口饭饭);
	}

	function 康康密码对不对(数组酱, 偏移小步子 = 0) {
		const 小钥匙串 = (变身密钥魔法数组[数组酱[偏移小步子 + 0]] + 变身密钥魔法数组[数组酱[偏移小步子 + 1]] + 变身密钥魔法数组[数组酱[偏移小步子 + 2]] + 变身密钥魔法数组[数组酱[偏移小步子 + 3]] + '-' + 变身密钥魔法数组[数组酱[偏移小步子 + 4]] + 变身密钥魔法数组[数组酱[偏移小步子 + 5]] + '-' + 变身密钥魔法数组[数组酱[偏移小步子 + 6]] + 变身密钥魔法数组[数组酱[偏移小步子 + 7]] + '-' + 变身密钥魔法数组[数组酱[偏移小步子 + 8]] + 变身密钥魔法数组[数组酱[偏移小步子 + 9]] + '-' + 变身密钥魔法数组[数组酱[偏移小步子 + 10]] + 变身密钥魔法数组[数组酱[偏移小步子 + 11]] + 变身密钥魔法数组[数组酱[偏移小步子 + 12]] + 变身密钥魔法数组[数组酱[偏移小步子 + 13]] + 变身密钥魔法数组[数组酱[偏移小步子 + 14]] + 变身密钥魔法数组[数组酱[偏移小步子 + 15]]).toLowerCase();
		return 小钥匙串;
	}
	
	async function 搭起七彩小桥梁(喂第一口饭饭) {
		快递小哥 = TCP小手手.writable.getWriter();
		if (喂第一口饭饭) await 快递小哥.write(喂第一口饭饭);
		
		await TCP小手手.readable.pipeTo(
			new WritableStream({
				async write(数据小肉肉) {
					WS小管管.send(数据小肉肉);
				},
			}),
		);
	}
}
