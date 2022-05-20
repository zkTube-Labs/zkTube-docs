const footnote_plugin = require("markdown-it-footnote/dist/markdown-it-footnote.min.js");
const path = require("path");
module.exports = {
  base: "/",
  markdown: {
    extendMarkdown: (md) => {
      md.use(footnote_plugin);
    },
    toc: { includeLevel: [1, 2, 3] },
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      {
        text: "Docs",
        link: "/sdk/",
      },
      //{
      // text:'Witepaper',
      // link:'/Witepaper/'
      // },
      // {
      //     text:'Tutorials',
      //     link:'/Tutorials/'
      // },
      // {
      //     text:'PayTube docs',
      //     link:'/PayTube docs/'
      // },
      // {
      //     text:'PayTube Tutorials',
      //     link:'/PayTube Tutorials/'
      // },
      {
        text: "FAQ",
        link: "/faq/",
      },
      {
        text: "Connect",
        link: "/connect/",
      },
      {
        text: "About",
        link: "/about/",
      },
      // {
      //   text: "Version",
      //   link: "/Version/",
      // },
    ],
    sidebar: {
      "/PayTube docs/": ["/PayTube docs/", "/PayTube docs/PRIVACY POLICY"],
      "/PayTube Tutorials/": [
        "/PayTube Tutorials/",
        "/PayTube Tutorials/ZKTR Mapping to ZKT Process",
      ],
      "/Whitepaper/": ["/Whitepaper/"],
      "/Tutorials/": ["/Tutorials/"],
      "/faq/": [
        {
          path: "/faq/",
          title: "What address should I use for a donation",
        },
        // '/faq/What address should I use for a donation',
        "/faq/Do we have official WeChat group",
        "/faq/Where do I get my test coin",
        "/faq/What is zktube",
        "/faq/When can I know if I’m on the whitelist",
        "/faq/Who can I contact to propose an AMA session and collaboration",
        "/faq/Does the private ZKT coin need lock position",
        "/faq/Does zktube have a miner",
        "/faq/A total of 100000 pieces can be subscribed",
        "/faq/Prover",
        "/faq/Version",
      ],
      "/connect/": ["/connect/"],
      "/about/": ["/about/", "/about/PRIVACY POLICY"],
      "/zkTube Mining Tutorials/": ["/zkTube Mining Tutorials/"],
      "/ZKTC and ZKTT Swap to ZKTR Tutorial/": [
        "/ZKTC and ZKTT Swap to ZKTR Tutorial/",
      ],
      "/sdk/": [
        {
          title: "JavaScript SDK",
          path: "/sdk/",
          collapsable: true, // optional, defaults to true
          sidebarDepth: 2, // optional, defaults to 1
          children: [
            "/sdk/tutorial",
            "/sdk/providers",
            "/sdk/accounts",
            "/sdk/utils",
            "/sdk/nfts",
            "/sdk/types",
            "/sdk/browser-bundled",
          ],
        },
        "/sdk/dart",
      ],
      // "/Version/": [
      //   "/Version/",
      // {
      //   path: "/Version/",
      //   title: "Version Introduction",
      // },
      // {
      //   path: "/Version/011",
      //   title: "0.1.1",
      // },
      // {
      //   path: "/Version/abc",
      //   title: "0.1.1",
      // },
      // ],
      // '/': [
      //     '/Introduction',
      // ],
    },
  },
  smoothScroll: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("/.vuepress/public"),
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    [
      "script",
      {},
      `
      const logoClick = setInterval(function() {
        const homeEles = document.getElementsByClassName("home-link");
        if(homeEles && homeEles.length > 0) {
          const homeEl = homeEles[0];
          homeEl.setAttribute("href", "https://zktube.io");
          homeEl.setAttribute("onclick", "document.location='https://zktube.io';return false;");
          clearInterval(logoClick);
        }

        //Actual logo image
        const logoEles = document.getElementsByClassName("logo")
        if(logoEles && logoEles.length > 0) {
          const logoEl = logoEles[0]
          logoEl.setAttribute("onclick", "document.location='https://zktube.io';return false;");
          clearInterval(logoClick);
        }
      }, 1000)`,
    ],
  ],
};

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
