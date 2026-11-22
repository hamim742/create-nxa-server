import config from "../../config";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const endpoints: Array<{ method: string; path: string; label: string }> = [
  { method: "GET", path: "/health", label: "Health check" },
  { method: "POST", path: "/api/v1/auth/register", label: "Register" },
  { method: "POST", path: "/api/v1/auth/login", label: "Login" },
  { method: "GET", path: "/api/v1/user/me", label: "My profile" },
];

export const renderHomePage = () => {
  const name = escapeHtml(config.project_name);
  const env = escapeHtml(config.NODE_ENV);
  const initial = name.charAt(0).toUpperCase() || "S";
  const startedAt = Date.now() - Math.floor(process.uptime() * 1000);

  const endpointRows = endpoints
    .map(
      (e, i) => `
        <li class="endpoint" style="--d:${0.55 + i * 0.08}s">
          <span class="method method-${e.method.toLowerCase()}">${e.method}</span>
          <code>${e.path}</code>
          <span class="endpoint-label">${e.label}</span>
        </li>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${name} · API</title>
<style>
  :root {
    --bg: #070a13;
    --card: rgba(17, 22, 37, 0.72);
    --border: rgba(148, 163, 184, 0.14);
    --text: #e6e9f2;
    --muted: #8b93a7;
    --accent: #7c5cff;
    --accent-2: #22d3ee;
    --ok: #22c55e;
    --bad: #ef4444;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    display: grid;
    place-items: center;
    padding: 24px 16px;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Animated background */
  .bg { position: fixed; inset: 0; z-index: -1; overflow: hidden; }
  .grid {
    position: absolute; inset: -50%;
    background-image:
      linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, #000 20%, transparent 65%);
    animation: drift 30s linear infinite;
  }
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .55; }
  .orb-1 { width: 460px; height: 460px; background: var(--accent); top: -140px; left: -120px; animation: float 16s ease-in-out infinite; }
  .orb-2 { width: 420px; height: 420px; background: var(--accent-2); bottom: -160px; right: -120px; animation: float 20s ease-in-out infinite reverse; opacity: .35; }
  @keyframes drift { to { transform: translate(48px, 48px); } }
  @keyframes float { 50% { transform: translate(60px, 40px) scale(1.08); } }

  /* Card */
  .card {
    width: 100%; max-width: 680px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 30px 80px -20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04);
    animation: rise .7s cubic-bezier(.2,.8,.2,1) both;
  }
  @keyframes rise { from { opacity: 0; transform: translateY(24px) scale(.98); } }
  .reveal { animation: fade .6s ease both; animation-delay: var(--d, 0s); }
  @keyframes fade { from { opacity: 0; transform: translateY(10px); } }

  header { display: flex; align-items: center; gap: 16px; }
  .logo {
    width: 56px; height: 56px; flex: none;
    display: grid; place-items: center;
    border-radius: 16px;
    font-size: 24px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 10px 30px -8px var(--accent);
    position: relative;
  }
  .logo::after {
    content: ""; position: absolute; inset: -4px; border-radius: 20px;
    border: 1px solid rgba(124,92,255,.5);
    animation: ring 2.4s ease-out infinite;
  }
  @keyframes ring { from { transform: scale(.9); opacity: 1; } to { transform: scale(1.25); opacity: 0; } }
  h1 {
    font-size: clamp(22px, 5vw, 30px); font-weight: 700; letter-spacing: -.02em;
    background: linear-gradient(90deg, #fff, #c4b5fd 50%, #67e8f9);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text; color: transparent;
    animation: shine 6s linear infinite;
    word-break: break-word;
  }
  @keyframes shine { to { background-position: 200% center; } }
  .subtitle { color: var(--muted); font-size: 14px; margin-top: 4px; }

  .status {
    margin-top: 28px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    padding: 14px 16px;
    border: 1px solid rgba(34,197,94,.25);
    background: rgba(34,197,94,.07);
    border-radius: 14px;
    transition: border-color .3s, background .3s;
  }
  .status.down { border-color: rgba(239,68,68,.3); background: rgba(239,68,68,.08); }
  .status-left { display: flex; align-items: center; gap: 12px; font-weight: 600; }
  .dot { position: relative; width: 10px; height: 10px; border-radius: 50%; background: var(--ok); }
  .dot::before {
    content: ""; position: absolute; inset: 0; border-radius: 50%; background: inherit;
    animation: ping 1.6s cubic-bezier(0,0,.2,1) infinite;
  }
  .down .dot { background: var(--bad); }
  @keyframes ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }
  .latency { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }

  .stats { margin-top: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .stat {
    padding: 14px 16px; border-radius: 14px;
    border: 1px solid var(--border); background: rgba(255,255,255,.02);
    transition: transform .25s, border-color .25s;
  }
  .stat:hover { transform: translateY(-2px); border-color: rgba(124,92,255,.4); }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
  .stat-value { margin-top: 6px; font-size: 18px; font-weight: 600; font-variant-numeric: tabular-nums; }

  h2 { margin-top: 28px; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); font-weight: 600; }
  .endpoints { list-style: none; margin-top: 12px; display: grid; gap: 8px; }
  .endpoint {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; border-radius: 12px;
    border: 1px solid var(--border); background: rgba(255,255,255,.02);
    animation: fade .5s ease both; animation-delay: var(--d);
    transition: background .2s, transform .2s;
  }
  .endpoint:hover { background: rgba(124,92,255,.08); transform: translateX(4px); }
  .method { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; min-width: 48px; text-align: center; }
  .method-get { color: #4ade80; background: rgba(74,222,128,.12); }
  .method-post { color: #60a5fa; background: rgba(96,165,250,.12); }
  .method-patch { color: #fbbf24; background: rgba(251,191,36,.12); }
  .method-delete { color: #f87171; background: rgba(248,113,113,.12); }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; overflow-wrap: anywhere; }
  .endpoint-label { margin-left: auto; color: var(--muted); font-size: 13px; white-space: nowrap; }

  footer {
    margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    color: var(--muted); font-size: 12px;
  }

  @media (max-width: 560px) {
    .card { padding: 24px 18px; }
    .stats { grid-template-columns: 1fr 1fr; }
    .endpoint-label { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
</style>
</head>
<body>
  <div class="bg" aria-hidden="true">
    <div class="grid"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
  </div>

  <main class="card">
    <header class="reveal" style="--d:.1s">
      <div class="logo">${initial}</div>
      <div>
        <h1>${name}</h1>
        <p class="subtitle">Express · Prisma · MongoDB · TypeScript</p>
      </div>
    </header>

    <div id="status" class="status reveal" style="--d:.2s" role="status" aria-live="polite">
      <div class="status-left"><span class="dot"></span><span id="status-text">All systems operational</span></div>
      <span id="latency" class="latency">checking…</span>
    </div>

    <section class="stats">
      <div class="stat reveal" style="--d:.3s">
        <div class="stat-label">Uptime</div>
        <div id="uptime" class="stat-value">—</div>
      </div>
      <div class="stat reveal" style="--d:.36s">
        <div class="stat-label">Environment</div>
        <div class="stat-value">${env}</div>
      </div>
      <div class="stat reveal" style="--d:.42s">
        <div class="stat-label">Node.js</div>
        <div class="stat-value">${escapeHtml(process.version)}</div>
      </div>
    </section>

    <h2 class="reveal" style="--d:.5s">Endpoints</h2>
    <ul class="endpoints">${endpointRows}
    </ul>

    <footer class="reveal" style="--d:.9s">
      <span>Base URL: <code>/api/v1</code></span>
      <span id="clock"></span>
    </footer>
  </main>

<script>
  (function () {
    var startedAt = ${startedAt};
    var uptimeEl = document.getElementById("uptime");
    var clockEl = document.getElementById("clock");
    var statusEl = document.getElementById("status");
    var statusText = document.getElementById("status-text");
    var latencyEl = document.getElementById("latency");

    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function formatUptime(ms) {
      var s = Math.max(0, Math.floor(ms / 1000));
      var d = Math.floor(s / 86400); s %= 86400;
      var h = Math.floor(s / 3600); s %= 3600;
      var m = Math.floor(s / 60); s %= 60;
      return (d ? d + "d " : "") + pad(h) + ":" + pad(m) + ":" + pad(s);
    }
    function tick() {
      uptimeEl.textContent = formatUptime(Date.now() - startedAt);
      clockEl.textContent = new Date().toLocaleTimeString();
    }
    function check() {
      var t0 = performance.now();
      fetch("/health", { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(function (data) {
          statusEl.classList.remove("down");
          statusText.textContent = "All systems operational";
          latencyEl.textContent = Math.round(performance.now() - t0) + " ms";
          if (data && typeof data.uptime === "number") startedAt = Date.now() - data.uptime * 1000;
        })
        .catch(function () {
          statusEl.classList.add("down");
          statusText.textContent = "Server unreachable";
          latencyEl.textContent = "retrying…";
        });
    }
    tick(); check();
    setInterval(tick, 1000);
    setInterval(check, 10000);
  })();
</script>
</body>
</html>`;
};
