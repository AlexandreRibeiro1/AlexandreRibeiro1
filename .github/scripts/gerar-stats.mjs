// Gera os cards do GitHub Stats como SVG, usando o código do fork
// AlexandreRibeiro1/github-readme-stats (clonado em ./grs pelo workflow).
//
// Por que não usar a instância na Vercel: ela depende de um token pessoal
// (PAT_1) que expira; quando expira, o card mostra "Downtime due to GitHub API
// rate limiting". Aqui o token é o GITHUB_TOKEN do próprio workflow, que é
// gerado a cada execução e nunca vence.
import { mkdir, writeFile } from "node:fs/promises";

import { renderStatsCard } from "../../grs/src/cards/stats.js";
import { renderTopLanguages } from "../../grs/src/cards/top-languages.js";
import { fetchStats } from "../../grs/src/fetchers/stats.js";
import { fetchTopLanguages } from "../../grs/src/fetchers/top-languages.js";

const USUARIO = "AlexandreRibeiro1";
const TEMA = { theme: "tokyonight", hide_border: true };

const stats = await fetchStats(USUARIO);
const linguagens = await fetchTopLanguages(USUARIO);

await mkdir("stats", { recursive: true });
await writeFile("stats/stats.svg", renderStatsCard(stats, { ...TEMA, show_icons: true }));
await writeFile("stats/top-langs.svg", renderTopLanguages(linguagens, { ...TEMA, layout: "compact" }));

console.log(`Stats: ${stats.totalCommits} commits, ${stats.totalStars} estrelas, rank ${stats.rank.level}`);
console.log(`Linguagens: ${Object.keys(linguagens).join(", ")}`);
