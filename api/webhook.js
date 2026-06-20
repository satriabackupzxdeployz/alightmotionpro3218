const axios = require("axios");

// ─── ENV ONLY ─────────────────────────────────────────────────────────────────
const BOT_TOKEN   = process.env.BOT_TOKEN;
const API_KEY     = process.env.THERESAV_APIKEY;
const OWNER_ID    = process.env.OWNER_ID || "8656325799";

if (!BOT_TOKEN) throw new Error("BOT_TOKEN env tidak di-set!");
if (!API_KEY)   throw new Error("THERESAV_APIKEY env tidak di-set!");

const TG       = `https://api.telegram.org/bot${BOT_TOKEN}`;
const THERESAV = "https://api.theresav.biz.id";

// ─── VALID DOMAINS ────────────────────────────────────────────────────────────
const VALID_DOMAINS = [
  "pipmmotube.store","1.lekeliusak.icu","1.ococugk.lat","11jac.com","120181311.xyz",
  "12bclass.us","1820mail.vip","24hhost.cc","2b9s.dev","5xu.vn","5yaochu.top",
  "67899vip.com","72p6.livetv.biz.id","816qs.com","917834.mailvip.net","91tanhua.top",
  "a2.kuro24in.lat","abis.patok.online","aboc.inboxku.site","adasd.cc","aecmedya.com",
  "afse-gh.top","ahre.tomoos.web.id","aiqoe.com","ajinimoto.me","akeey.biz.id",
  "akuadalah.dev","alog.vipportal.online","amazinggift.life","arlia.ink","arthiq.life",
  "aruf.melakoni.web.id","asistx.net","au1688x.us","automizelymail.info","autommo.net",
  "aw.ferd.live","awawawaw.me","b.capricornh.my.id","b5ve4j.sekeba.web.id","bb28.dev",
  "bbasky.us","beautyshine.club","bjork.wtf","bjorwi.cfd","blendlog.com","bn77fb.click",
  "bolor7x.natshomulam.online","bosakun.com","bossmanjack.xyz","bqaz.xyz",
  "brittneyus.biz.id","btcmod.com","buddyfly.top","c-newstv.ru","c-pkk.icu",
  "cangcutku.pro","capcut.digital","capcutgw.cfd","capcutku.cc","capcutmeflo.shop",
  "capcvt.es","casaderta.com","cba-1.top","cepo63.eu.org","chaocosen.com","chatech.site",
  "chatgptku.pro","checkback.vn","checkotpmail.com","chundage.help","clonetrust.com",
  "cloudserver.email","code.omeprone.biz.id","coffeepancakewafflebacon.com",
  "cogil.diypinnacademy.my.id","cryptoavalonsolhub.cloud","cuong.bid","cuongaquarium.com",
  "cyberdigital.site","cyjd.top","daemonixgames.com","datapinacle.com","dedisutardi.eu.org",
  "degar.xyz","dewacid.store","digitalcompany.web.id","digitecy.live","djiv.xyz","dmxs8.com",
  "docbao7.com","donusumekatil.com","dotos.dev","dracin.https443.net","dramamixio.icu",
  "drix.premiuw.top","ds4kojima.com","dtxinchao.name.vn","duosakhiy.com","duriancompany.us",
  "duyquyen.site","eastmm.cc","easygbd.cn","easygbd.com","edudingy.cfd","eelraodo.com",
  "ekot.xyz","eliksir.foo","emailmultimedia.com","enyashan.cfd","etisalat77.shop",
  "evrnext.com","fajskdlh.top","fazendabrasil1.com","feelmyheartwithsong.com",
  "feynorasu.dev","fitbuybid.com","gamersdady.com","gasolina.web.id",
  "gdbt.mailccconsequuntur.my.id","gdqoe.net","gen.getotp.live","getol.pro",
  "ghch.deegitalist.web.id","ghk55.us","giangholang.xyz","gima.my.id","gimail.cloud",
  "gmai1.kr","gmailot.com","gmali.my.id","goldenmagpies.com","goldinbox.net",
  "gomailgo.click","gtgstoreid.com","hahaha.vn","hanmama.zz.am","haodage.cc",
  "haoyunlaiba.cc","hdcroom.us","hddd54.shop","henrikoffice.us","herilev.top","hieu.in",
  "highstudios.net","higuruma.site","himkinet.ru","hitbase.net","hkvtop.us",
  "hotmail-us.top","hotmeil.net","hs-use.top","hvtlp.bekasi.me","iapermisul.ro",
  "idssh.net","inly.vn","isekai.web.id","ivqfo.kenma.online","jankolus.biz.id",
  "jasonpost.site","javaka.live","jeffrivod.my.id","jieluv.com","kantclass.com",
  "kapten.site","kayfilms.top","keepmail.dev","kelinganja.eu.org","kevidixjr.biz.id",
  "key2info.com","kia-sdn.me","killlove.site","kimbu.net","king.marc93.qpon",
  "kinggpt-g2g.biz.id","kitap.az","konterkulo.com","lamak.my.id","lellolidk.de",
  "likebaiviet.com","likevip.net","linkbm.one","live8.njesz.com","liveyoutube.my.id",
  "locmedia.asia","lookbek.cfd","luonglanhlung.com","luyeeisntyours.pro","mail.sedut.my",
  "mail.uinpalopo.my.id","mailcuatoi.click","maildy.site","mailhvd.lat","mailkryza.online",
  "mailllshop.website","maizystore.me","maxclone.vn","maxseeding.vn","meekuah.biz.id",
  "meevpo.site","mefp.xyz","meno.gajelaslu.biz.id","miisedapp.biz.id","mkda9884.top",
  "mlemmlem.asia","mobiarmy3.vn","mobilex.sbs","moga.portalespro.online",
  "morizamail.my.id","musiku.studio","my-mail.giize.com","mytempmail.org","nangspa.vn",
  "nautonk.com","naver-mail.com","ndut.pro","neosstudy.work","netflixollo.iya.my.id",
  "nevanata.com","nichely.sbs","nicoleir.biz.id","nightfood.studio","novaix.vn",
  "novaopcj.icu","nowtopzen.com","ntcapcut.biz.id","ntl.zyns.com","nyawitt.my.id",
  "obeg.sachtai.site","okmabuiyak.tech","onlyu.link","opelkun.net","ourl.me",
  "palcodovinho.com.br","penghuan.pro","phctool.com","phimteen.net","phpto.us","phubt.com",
  "piyo.my.id","pizzanow.sbs","potatocompany.us","poweradxas.online",
  "pqnej.entama.asia","pri.kse.skin","priasoloitulagi.my.id","prime-gaming.ru","promx.cc",
  "prosperidademail.com","putrimeilani.my.id","qavexo.site","qhsm.capcutkimak.tech",
  "quanpzo.click","r9ue.mailccomnis.my.id","raveqxon.site","registermc.online",
  "regvippro.site","renewable0.shop","riazra.bond","riko.my","risma.mom","riyadi.online",
  "sajutadollars.com","sanfnges.cc","saxlift.us","scatterteam.com","scire.sbs","scook.cfd",
  "sddrs-cdfs.shop","seci.risaon.biz.id","secondbrain.my.id","securebox01.click",
  "sekotong.store","selftrak.fit","semutireng.com","ses4services.net",
  "seti.jacobon.web.id","shanhaijuli.sbs","share.lopes.asia","ship79.com","shoha.cc",
  "shopcaunho.com","shopppy.shop","shopy.club","sinbox.asia","siroja.top",
  "sjgn.williamat.my.id","sjusngde.info","slcr.xyz","smakit.vn","small680.online",
  "softprimehub.store","sohu.scottor.web.id","sparkletoc.com","spidez.sbs","spoasta.me",
  "streamingku.live","sunnyblogexpress.com","svvdfeghdb.help","tako.skin","tamttts.com",
  "tastmemail.com","taymonera.de","telkomsel.web.id","tempmail247.top","termweave.life",
  "terseti.kro.kr","thoitrangquyco.vn","thxm3.pro","tip4today.com","tlcfbmt.online",
  "tmxttvmail.com","tokobibit.co","tokoriad.biz.id","trangiabao.click","trendzvibe.shopping",
  "trungtampccc.vn","tudiencongnghiep.com.vn","tuku26012023.xyz","uhshad.qelirapo.my.id",
  "ultrmigos.online","uniqueproducts.site","universitas.codes","us-pt.top",
  "vese.noobsie290.biz.id","vidco.eu.org","vilocom.vn","virginsrus.xyz","vitacimin.me",
  "voucherskuy.com","vremail.co","wangdandan-w.cc","waroengku.cc","we-ede.top","whybe.dev",
  "wiro.dergana.online","wochaojibang.sbs","wolaila.cc","wome.jemr27.christmas","xelio.sbs",
  "xmen.work","xomqirantel.site","xunapcompany.us","xxx-tower.net","yahesazo.me",
  "yang-gtens.pro","yangzhong-sfd.cc","ydah.me","yesmail.my.id","yl66.cfd",
  "ynagjie-66.cc","yqc7.mailccsequi.my.id","yujiehanjiao.cc","yuwe.kepkat.com",
  "yzrkive.cfd","zenbada.com","zenithlynow.com","zevionyx.com","zikzak.gq","zuldev.live",
  "zumy.dev"
];

// ─── STATE (in-memory, reload dari JSON kiriman owner) ────────────────────────
// whitelist: { users: Set<string>, owners: Set<string> }
// genLog: array of { userId, username, email, domain, duration, timestamp }
// onlyGbMode: boolean — jika true, bot hanya merespons di grup
let userWhitelist  = new Set(); // user biasa
let ownerList      = new Set(); // sub-owner (bisa pakai fitur owner)
let genLog         = [];        // log generate berhasil
let onlyGbMode     = false;     // mode hanya grup

// ─── ROLE HELPERS ─────────────────────────────────────────────────────────────
const isMainOwner  = (id) => String(id) === String(OWNER_ID);
const isOwner      = (id) => isMainOwner(id) || ownerList.has(String(id));
const isAllowed    = (id) => isOwner(id) || userWhitelist.has(String(id));
const isGroup      = (chat) => chat.type === "group" || chat.type === "supergroup";

// ─── TELEGRAM HELPERS ─────────────────────────────────────────────────────────
async function tg(method, body) {
  try {
    const { data } = await axios.post(`${TG}/${method}`, body);
    return data;
  } catch(e) {
    console.error(`[tg:${method}]`, e.response?.data || e.message);
    return null;
  }
}

async function sendMessage(chat_id, text, extra = {}) {
  return tg("sendMessage", { chat_id, text, parse_mode: "Markdown", ...extra });
}

async function editMessage(chat_id, message_id, text, extra = {}) {
  return tg("editMessageText", { chat_id, message_id, text, parse_mode: "Markdown", ...extra });
}

async function sendDocument(chat_id, filename, content, caption = "") {
  const FormData = require("form-data");
  const form = new FormData();
  form.append("chat_id", String(chat_id));
  form.append("caption", caption, { contentType: "text/plain" });
  form.append("document", Buffer.from(content, "utf-8"), { filename, contentType: "application/json" });
  return axios.post(`${TG}/sendDocument`, form, { headers: form.getHeaders() }).catch(e => {
    console.error("[sendDocument]", e.response?.data || e.message);
  });
}

async function sendReaction(chat_id, message_id, emoji) {
  return tg("setMessageReaction", {
    chat_id, message_id,
    reaction: [{ type: "emoji", emoji }]
  });
}

// ─── AUTO SET WEBHOOK ─────────────────────────────────────────────────────────
async function autoSetWebhook(req) {
  try {
    const host = req.headers["x-forwarded-host"] || req.headers.host || "";
    if (!host) return;
    const webhookUrl = `https://${host}/api/webhook`;
    const info = await tg("getWebhookInfo", {});
    // getWebhookInfo pakai GET bukan POST
    const { data: winfo } = await axios.get(`${TG}/getWebhookInfo`);
    if (winfo.result?.url === webhookUrl) return;
    await tg("setWebhook", { url: webhookUrl });
    console.log(`[AutoWebhook] ✅ ${webhookUrl}`);
  } catch (e) {
    console.error("[AutoWebhook]", e.message);
  }
}

// ─── WHITELIST JSON BUILDER ────────────────────────────────────────────────────
function buildWhitelistJson() {
  return JSON.stringify({
    users:  Array.from(userWhitelist),
    owners: Array.from(ownerList),
    updated: new Date().toISOString()
  }, null, 2);
}

// ─── KIRIM WHITELIST JSON KE SEMUA OWNER ─────────────────────────────────────
async function broadcastWhitelistJson(caption = "") {
  const content = buildWhitelistJson();
  // kirim ke main owner
  await sendDocument(OWNER_ID, "whitelist.json", content, caption);
  // kirim juga ke sub-owner
  for (const oid of ownerList) {
    await sendDocument(oid, "whitelist.json", content, caption).catch(() => {});
  }
}

// ─── NOTIF KE SEMUA OWNER ─────────────────────────────────────────────────────
async function notifyOwners(text) {
  await sendMessage(OWNER_ID, text);
  for (const oid of ownerList) {
    await sendMessage(oid, text).catch(() => {});
  }
}

// ─── THERESAV API ─────────────────────────────────────────────────────────────
async function theresav(path, params = {}) {
  const url = new URL(`${THERESAV}${path}`);
  url.searchParams.set("apikey", API_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const { data } = await axios.get(url.toString());
  return data;
}

// ─── /gtemp ───────────────────────────────────────────────────────────────────
async function handleGtemp(msg, domain) {
  const chat_id    = msg.chat.id;
  const message_id = msg.message_id;
  const user       = msg.from;

  const chosenDomain = domain || VALID_DOMAINS[Math.floor(Math.random() * VALID_DOMAINS.length)];

  await sendReaction(chat_id, message_id, "⏳");
  const statusMsg = await sendMessage(chat_id,
    `⚙️ *Auto AM Premium Dimulai...*\n\n` +
    `📧 Domain: \`${chosenDomain}\`\n` +
    `🔄 Step 1/4: Membuat email sementara...`
  );
  const sid = statusMsg?.result?.message_id;

  try {
    // Step 1: create email
    const createRes = await theresav("/tools/generator-email/create", { domain: chosenDomain });
    if (!createRes.status) throw new Error("Gagal buat email: " + (createRes.message || "Unknown"));
    const email = createRes.result.email;

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `🔄 Step 2/4: Mengirim request ke Alight Motion...`
    );

    // Step 2: send AM
    const sendRes = await theresav("/premium/alightmotion/send", { email });
    if (!sendRes.status) throw new Error("Gagal kirim AM: " + (sendRes.message || "Unknown"));

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `✅ Step 2/4: Request terkirim!\n` +
      `🔄 Step 3/4: Menunggu email verifikasi... _(maks 60 detik)_`
    );

    // Step 3: poll inbox
    let foundMsg = null;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 4000));
      const inboxRes = await theresav("/tools/generator-email/inbox", { email });
      if (inboxRes.status && inboxRes.result?.messages?.length > 0) {
        foundMsg = inboxRes.result.messages[0];
        break;
      }
    }

    if (!foundMsg) {
      await editMessage(chat_id, sid, `❌ *Timeout!* Email tidak masuk dalam 60 detik.\n_Coba domain lain._`);
      return sendReaction(chat_id, message_id, "❌");
    }

    const verifyLink = foundMsg.url || (foundMsg.urls && foundMsg.urls[0]);
    if (!verifyLink) {
      await editMessage(chat_id, sid, `❌ Email masuk tapi link verifikasi tidak ditemukan.\n_Coba domain lain._`);
      return sendReaction(chat_id, message_id, "❌");
    }

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `✅ Step 3/4: Email verifikasi diterima!\n` +
      `🔄 Step 4/4: Verifikasi ke server Alight Motion...`
    );

    // Step 4: verify
    const verifyRes = await theresav("/premium/alightmotion/verify", { email, link: verifyLink });
    if (!verifyRes.status) throw new Error("Gagal verifikasi: " + (verifyRes.message || "Unknown"));

    const rawDur    = verifyRes.data?.duration || verifyRes.data?.package_type || "";
    const durText   = rawDur === "1_year" ? "1 Tahun" : (rawDur.replace("_", " ") || "1 Bulan");
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const uname     = user.username ? `@${user.username}` : user.first_name;

    // Simpan ke genLog
    genLog.push({
      userId:    String(user.id),
      username:  uname,
      email,
      domain:    chosenDomain,
      duration:  durText,
      timestamp
    });

    // Hasil ke user
    await editMessage(chat_id, sid,
      `🎉 *───「 ＡＬＩＧＨＴ  ＭＯＴＩＯＮ  ＰＲＥＭＩＵＭ 」───*\n\n` +
      `⚡ _${verifyRes.message || "Verifikasi berhasil!"}_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      ` ◦ *Email:* \`${email}\`\n` +
      ` ◦ *Domain:* \`${chosenDomain}\`\n` +
      ` ◦ *Tipe:* \`${verifyRes.data?.type || "success"}\`\n` +
      ` ◦ *Durasi:* \`${durText}\` ⏳\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Login ke Alight Motion pakai email di atas!\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Engine System by Amane Ofc_`
    );
    await sendReaction(chat_id, message_id, "✅");

    // Notif ke owner
    await notifyOwners(
      `🔔 *[NOTIF GENERATE BERHASIL]*\n\n` +
      `👤 *User:* ${uname} (\`${user.id}\`)\n` +
      `💬 *Chat:* ${msg.chat.title || "Private"}\n` +
      `📧 *Email:* \`${email}\`\n` +
      `🌐 *Domain:* \`${chosenDomain}\`\n` +
      `⏳ *Durasi:* \`${durText}\`\n` +
      `🕐 *Waktu:* ${timestamp}`
    );

  } catch (e) {
    console.error("[gtemp]", e.message);
    if (sid) await editMessage(chat_id, sid, `❌ *Error:* ${e.message}`);
    await sendReaction(chat_id, message_id, "❌");
  }
}

// ─── /ampremium ───────────────────────────────────────────────────────────────
async function handleAmPremium(msg, email) {
  const chat_id    = msg.chat.id;
  const message_id = msg.message_id;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim()))
    return sendMessage(chat_id, "❌ *Error:* Format email tidak valid kak!");

  await sendReaction(chat_id, message_id, "⏳");
  try {
    const res = await theresav("/premium/alightmotion/send", { email: email.trim() });
    if (!res?.status) throw new Error(res?.message || "Gagal dari server.");

    await sendMessage(chat_id,
      `🎉 *───「 ＡＬＩＧＨＴ  ＭＯＴＩＯＮ 」───*\n` +
      `⚡ _${res.message || "Link verifikasi berhasil dikirim!"}_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      ` ◦ *Target Email:* \`${res.data?.email || email}\`\n` +
      ` ◦ *Tipe Akses:* \`${res.data?.type || "need_link"}\`\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *LANGKAH AKTIVASI:*\n\n` +
      `1️⃣ Buka Gmail → cek *Folder Spam* jika tidak ada di inbox\n` +
      `2️⃣ Klik tombol *"Login"* di email dari Alight Motion\n` +
      `3️⃣ Salin/copy seluruh URL di address bar browser\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💡 _Setelah dapat link, gunakan /amverify_\n` +
      `_Engine System by Amane Ofc_`
    );
    await sendReaction(chat_id, message_id, "✅");
  } catch (e) {
    await sendReaction(chat_id, message_id, "❌");
    await sendMessage(chat_id, `❌ *Gagal:* ${e.response?.data?.message || e.message}`);
  }
}

// ─── /amverify ────────────────────────────────────────────────────────────────
async function handleAmVerify(msg, args) {
  const chat_id    = msg.chat.id;
  const message_id = msg.message_id;

  if (!args || !args.includes("|"))
    return sendMessage(chat_id,
      `🔐 *Format Salah!*\n\nKetik: /amverify email | link\n\nContoh:\n/amverify email@gmail.com | https://alight-creative.firebaseapp.com/...`
    );

  const [email, link] = args.split("|").map(v => v.trim());
  if (!email || !link) return sendMessage(chat_id, "⚠️ Email dan link harus diisi semua.");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return sendMessage(chat_id, "❌ Format email tidak valid.");

  await sendReaction(chat_id, message_id, "⏳");
  try {
    const res = await theresav("/premium/alightmotion/verify", { email, link });
    if (!res?.status) throw new Error(res?.message || "Gagal dari server.");

    const rawDur  = res.data?.duration || "";
    const durText = rawDur === "1_year" ? "1 Tahun" : (rawDur.replace("_", " ") || "—");

    await sendMessage(chat_id,
      `🎉 *───「 ＡＭ  ＶＥＲＩＦＩＣＡＴＩＯＮ 」───*\n` +
      `⚡ _${res.message || "Verifikasi akun berhasil!"}_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      ` ◦ *Email:* \`${res.data?.email || email}\`\n` +
      ` ◦ *Tipe:* \`${res.data?.type || "success"}\`\n` +
      ` ◦ *Durasi:* \`${durText}\` ⏳\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Akun kamu sudah *PRO / PREMIUM*!\n` +
      `Buka Alight Motion & login pakai email di atas.\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Engine System by Amane Ofc_`
    );
    await sendReaction(chat_id, message_id, "✅");
  } catch (e) {
    await sendReaction(chat_id, message_id, "❌");
    await sendMessage(chat_id, `❌ *Verification Error:* ${e.response?.data?.message || e.message}`);
  }
}

// ─── /add ─────────────────────────────────────────────────────────────────────
async function handleAdd(msg, targetId) {
  const chat_id = msg.chat.id;
  if (!isOwner(msg.from.id)) return sendMessage(chat_id, "❌ Hanya owner yang bisa menggunakan perintah ini.");
  if (!targetId || isNaN(targetId)) return sendMessage(chat_id, "❌ Format: `/add 123456789`");

  const tid = String(targetId);
  if (userWhitelist.has(tid) || isOwner(tid)) {
    return sendMessage(chat_id, `⚠️ User \`${tid}\` sudah terdaftar.`);
  }

  userWhitelist.add(tid);
  const list    = Array.from(userWhitelist);
  const caption = `✅ User \`${tid}\` ditambahkan!\nTotal user: ${list.length}`;
  await broadcastWhitelistJson(caption);
  return sendMessage(chat_id, `${caption}\n\n📄 File whitelist.json dikirim ke semua owner.`);
}

// ─── /remove ──────────────────────────────────────────────────────────────────
async function handleRemove(msg, targetId) {
  const chat_id = msg.chat.id;
  if (!isOwner(msg.from.id)) return sendMessage(chat_id, "❌ Hanya owner.");
  if (!targetId || isNaN(targetId)) return sendMessage(chat_id, "❌ Format: `/remove 123456789`");

  const tid = String(targetId);
  if (!userWhitelist.has(tid)) return sendMessage(chat_id, `⚠️ User \`${tid}\` tidak ditemukan di whitelist.`);

  userWhitelist.delete(tid);
  const caption = `🗑️ User \`${tid}\` dihapus. Sisa: ${userWhitelist.size}`;
  await broadcastWhitelistJson(caption);
  return sendMessage(chat_id, caption);
}

// ─── /addowner ────────────────────────────────────────────────────────────────
async function handleAddOwner(msg, targetId) {
  const chat_id = msg.chat.id;
  if (!isMainOwner(msg.from.id)) return sendMessage(chat_id, "❌ Hanya main owner yang bisa menambah owner lain.");
  if (!targetId || isNaN(targetId)) return sendMessage(chat_id, "❌ Format: `/addowner 123456789`");

  const tid = String(targetId);
  if (isMainOwner(tid)) return sendMessage(chat_id, "⚠️ ID ini adalah main owner.");
  if (ownerList.has(tid)) return sendMessage(chat_id, `⚠️ \`${tid}\` sudah menjadi owner.`);

  ownerList.add(tid);
  const caption = `👑 \`${tid}\` ditambahkan sebagai *Sub-Owner*!`;
  await broadcastWhitelistJson(caption);
  return sendMessage(chat_id, caption);
}

// ─── /removeowner ─────────────────────────────────────────────────────────────
async function handleRemoveOwner(msg, targetId) {
  const chat_id = msg.chat.id;
  if (!isMainOwner(msg.from.id)) return sendMessage(chat_id, "❌ Hanya main owner.");
  if (!targetId || isNaN(targetId)) return sendMessage(chat_id, "❌ Format: `/removeowner 123456789`");

  const tid = String(targetId);
  if (!ownerList.has(tid)) return sendMessage(chat_id, `⚠️ \`${tid}\` bukan sub-owner.`);

  ownerList.delete(tid);
  const caption = `🗑️ \`${tid}\` dicopot dari posisi Sub-Owner.`;
  await broadcastWhitelistJson(caption);
  return sendMessage(chat_id, caption);
}

// ─── /onlygb ──────────────────────────────────────────────────────────────────
async function handleOnlyGb(msg) {
  const chat_id = msg.chat.id;
  if (!isOwner(msg.from.id)) return sendMessage(chat_id, "❌ Hanya owner.");

  onlyGbMode = !onlyGbMode;
  return sendMessage(chat_id,
    onlyGbMode
      ? `🏘️ *Mode Hanya Grup* diaktifkan!\n\nBot sekarang hanya akan merespons pesan dari *grup*.\nChat pribadi akan diabaikan.`
      : `💬 *Mode Hanya Grup* dinonaktifkan!\n\nBot kembali merespons semua chat (grup & pribadi).`
  );
}

// ─── /listgen ─────────────────────────────────────────────────────────────────
async function handleListGen(msg) {
  const chat_id = msg.chat.id;
  if (!isOwner(msg.from.id)) return; // silent — ini menu secret

  if (genLog.length === 0)
    return sendMessage(chat_id, `📋 *Log Generate*\n\n_Belum ada akun yang berhasil digenerate._`);

  const lines = genLog.map((g, i) =>
    `${i + 1}. ${g.username} (\`${g.userId}\`)\n   📧 \`${g.email}\`\n   🌐 ${g.domain} | ⏳ ${g.duration}\n   🕐 ${g.timestamp}`
  ).join("\n\n");

  const text = `📋 *Log Generate AM* (${genLog.length} akun)\n\n${lines}`;

  // Kalau terlalu panjang, kirim sebagai file
  if (text.length > 3500) {
    const content = genLog.map((g, i) =>
      `[${i+1}] ${g.username} (${g.userId})\nEmail: ${g.email}\nDomain: ${g.domain}\nDurasi: ${g.duration}\nWaktu: ${g.timestamp}\n`
    ).join("\n");
    return sendDocument(chat_id, "genlog.txt", content, `📋 Log Generate AM — ${genLog.length} akun`);
  }

  return sendMessage(chat_id, text);
}

// ─── Load whitelist dari JSON yang dikirim owner ──────────────────────────────
async function handleDocument(msg) {
  if (!isOwner(msg.from?.id)) return;

  const doc = msg.document;
  if (!doc || !doc.file_name?.endsWith(".json")) return;

  try {
    const fileInfo = await tg("getFile", { file_id: doc.file_id });
    const filePath = fileInfo?.result?.file_path;
    if (!filePath) throw new Error("Tidak bisa ambil path file");

    const { data: fileContent } = await axios.get(
      `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`,
      { responseType: "text" }
    );

    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed.users)) {
      userWhitelist = new Set(parsed.users.map(String));
    }
    if (Array.isArray(parsed.owners)) {
      ownerList = new Set(parsed.owners.map(String).filter(id => !isMainOwner(id)));
    }

    await sendMessage(msg.chat.id,
      `✅ *Whitelist berhasil dimuat!*\n\n` +
      `👥 User: *${userWhitelist.size}*\n` +
      `👑 Sub-Owner: *${ownerList.size}*`
    );
  } catch (e) {
    await sendMessage(msg.chat.id, `❌ Gagal membaca JSON: ${e.message}`);
  }
}

// ─── /start ───────────────────────────────────────────────────────────────────
async function handleStart(msg) {
  const chat_id = msg.chat.id;
  const name    = msg.from?.first_name || "Kak";
  const uid     = msg.from?.id;

  await tg("sendMessage", {
    chat_id,
    text:
      `👋 Halo *${name}*! Selamat datang di *AM Premium Bot* 🎬\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Pilih menu di bawah untuk mulai:`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🚀 Auto AM Premium", callback_data: "menu_gtemp"     },
          { text: "📧 Send Email AM",   callback_data: "menu_ampremium" }
        ],
        [
          { text: "✅ Verifikasi AM",   callback_data: "menu_amverify"  },
          { text: "❓ Bantuan",         callback_data: "menu_help"       }
        ],
        ...(isOwner(uid) ? [[{ text: "👑 Panel Owner", callback_data: "menu_owner" }]] : [])
      ]
    }
  });
}

async function sendHelp(chat_id, uid) {
  const ownerSection = isOwner(uid)
    ? `\n\n👑 *OWNER COMMANDS:*\n` +
      `/add \`<id>\` — Tambah user\n` +
      `/remove \`<id>\` — Hapus user\n` +
      `/addowner \`<id>\` — Jadikan sub-owner\n` +
      `/removeowner \`<id>\` — Copot sub-owner\n` +
      `/onlygb — Toggle mode hanya grup\n` +
      `/listuser — Lihat semua user\n` +
      `📎 _Kirim whitelist.json ke bot untuk reload._`
    : "";

  await sendMessage(chat_id,
    `📋 *DAFTAR COMMAND:*\n\n` +
    `🔹 /gtemp \`[domain]\` — Auto generate email & AM Premium\n` +
    `🔹 /ampremium \`<email>\` — Kirim link verifikasi ke email kamu\n` +
    `🔹 /amverify \`<email> | <link>\` — Verifikasi setelah dapat link` +
    ownerSection
  );
}

// ─── CALLBACK (button menu) ───────────────────────────────────────────────────
async function handleCallback(cb) {
  const chat_id = cb.message.chat.id;
  const uid     = cb.from.id;
  const data    = cb.data;

  await tg("answerCallbackQuery", { callback_query_id: cb.id });

  if (data === "menu_help") return sendHelp(chat_id, uid);

  if (data === "menu_owner") {
    if (!isOwner(uid)) return sendMessage(chat_id, "❌ Bukan owner.");
    return sendMessage(chat_id,
      `👑 *PANEL OWNER*\n\n` +
      `👥 User terdaftar: *${userWhitelist.size}*\n` +
      `👑 Sub-Owner: *${ownerList.size}*\n` +
      `🏘️ Mode Hanya Grup: *${onlyGbMode ? "ON" : "OFF"}*\n\n` +
      `/add \`<id>\` — Tambah user\n` +
      `/remove \`<id>\` — Hapus user\n` +
      `/addowner \`<id>\` — Jadikan sub-owner _(main owner only)_\n` +
      `/removeowner \`<id>\` — Copot sub-owner _(main owner only)_\n` +
      `/onlygb — Toggle mode hanya grup\n` +
      `/listuser — Lihat semua user\n` +
      `📎 _Kirim whitelist.json ke bot untuk reload._`
    );
  }

  // Cek akses untuk menu fitur
  if (!isAllowed(uid)) {
    return sendMessage(chat_id,
      `🔒 *Akses Ditolak*\n\nKamu belum di-add sama Satria.\nHubungi owner untuk mendapatkan akses.`
    );
  }

  if (data === "menu_gtemp") {
    return sendMessage(chat_id,
      `🚀 *Auto AM Premium*\n\n` +
      `Kirim perintah:\n` +
      `/gtemp — domain random\n` +
      `/gtemp maildy.site — domain pilihan`
    );
  }
  if (data === "menu_ampremium") {
    return sendMessage(chat_id,
      `📧 *Send Email AM*\n\nFormat: /ampremium <email>\n\nContoh:\n/ampremium emailkamu@gmail.com`
    );
  }
  if (data === "menu_amverify") {
    return sendMessage(chat_id,
      `✅ *Verifikasi AM*\n\nFormat: /amverify <email> | <link>\n\nContoh:\n/amverify email@gmail.com | https://alight-creative.firebaseapp.com/...`
    );
  }
}

// ─── ROUTER UTAMA ─────────────────────────────────────────────────────────────
async function processUpdate(update) {
  if (update.callback_query) return handleCallback(update.callback_query);

  const msg = update.message || update.channel_post;
  if (!msg) return;

  // Handle dokumen JSON dari owner
  if (msg.document) return handleDocument(msg);

  if (!msg.text) return;

  const chat    = msg.chat;
  const uid     = msg.from?.id;
  const text    = msg.text.trim();
  const [rawCmd, ...rest] = text.split(" ");
  const cmd     = rawCmd.split("@")[0].toLowerCase();
  const args    = rest.join(" ");

  // Mode hanya grup: abaikan private chat (kecuali owner)
  if (onlyGbMode && !isGroup(chat) && !isOwner(uid)) return;

  // Anggota baru bergabung di grup — tidak perlu dibalas, skip
  // (new_chat_members ditangani otomatis karena !msg.text → return di atas)

  // /start dan /help tidak perlu whitelist
  if (cmd === "/start" || cmd === "/help") return handleStart(msg);

  // Cek whitelist
  if (!isAllowed(uid)) {
    // Di grup: hanya balas jika mereka mention bot atau kirim command
    if (isGroup(chat)) {
      return sendMessage(chat.id,
        `🔒 Hei ${msg.from?.first_name || "kak"}, kamu belum di-add sama *Satria*.\nHubungi owner untuk mendapatkan akses.`
      );
    }
    return sendMessage(chat.id,
      `🔒 *Akses Ditolak*\n\nKamu belum di-add sama *Satria*.\nHubungi owner untuk mendapatkan akses.`
    );
  }

  // Owner-only
  if (cmd === "/onlygb")      return handleOnlyGb(msg);
  if (cmd === "/add")         return handleAdd(msg, args.trim());
  if (cmd === "/remove")      return handleRemove(msg, args.trim());
  if (cmd === "/addowner")    return handleAddOwner(msg, args.trim());
  if (cmd === "/removeowner") return handleRemoveOwner(msg, args.trim());
  if (cmd === "/listgen")     return handleListGen(msg); // secret
  if (cmd === "/listuser") {
    if (!isOwner(uid)) return;
    const ulist = Array.from(userWhitelist);
    const olist = Array.from(ownerList);
    return sendMessage(chat.id,
      `👥 *User Whitelist* (${ulist.length})\n` +
      (ulist.length ? ulist.map((id, i) => `${i+1}. \`${id}\``).join("\n") : "_Kosong_") +
      `\n\n👑 *Sub-Owner* (${olist.length})\n` +
      (olist.length ? olist.map((id, i) => `${i+1}. \`${id}\``).join("\n") : "_Kosong_")
    );
  }

  // User commands
  if (cmd === "/gtemp") return handleGtemp(msg, args.trim() || null);

  if (["/ampremium", "/sendam", "/alightpremium", "/alightmotion"].includes(cmd)) {
    if (!args) return sendMessage(chat.id, `📧 *Format:* /ampremium <email>\n\nContoh:\n/ampremium emailkamu@gmail.com`);
    return handleAmPremium(msg, args);
  }

  if (["/amverify", "/alightverify", "/viam", "/verifyam"].includes(cmd)) {
    return handleAmVerify(msg, args);
  }
}

// ─── VERCEL EXPORT ────────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method === "GET") {
    await autoSetWebhook(req);
    return res.status(200).send("AM Premium Bot is running! 🚀\nWebhook auto-configured ✅");
  }
  if (req.method === "POST") {
    autoSetWebhook(req).catch(() => {});
    try { await processUpdate(req.body); } catch (err) { console.error(err); }
    return res.status(200).json({ ok: true });
  }
  res.status(405).send("Method Not Allowed");
};
