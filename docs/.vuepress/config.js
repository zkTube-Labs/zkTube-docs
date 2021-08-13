const path = require('path')
module.exports = {
    base: '/',
    themeConfig: {
        logo: '/logo.png',
        nav:[
            // {
            //     text:'Docs',
            //     link:'/'
            // },
            {
                text:'FAQ',
                link:'/faq/'
            },
            {
              text:'Connect',
              link:'/connect/'
            },
            {
              text:'About',
              link:'/about/'
            },
        ],
        sidebar:{
            '/faq/': [
                {
                path:'/faq',
                    title:'What address should I use for a donation'
                },
                // '/faq/What address should I use for a donation',
                      '/faq/What is the donation link',
                      '/faq/Do we have official WeChat group',
                      '/faq/Where do I get my test coin',
                      '/faq/What is zktube',
                      '/faq/When can I know if I’m on the whitelist',
                      '/faq/Who can I contact to propose an AMA session and collaboration',
                      '/faq/Does the private ZKT coin need lock position',
                      '/faq/Does zktube have a miner',
                      '/faq/A total of 100000 pieces can be subscribed',
              ],
              '/connect/':[
                '/connect/'
              ],
              '/about/':[
                '/about/',
                '/about/Content of website',
                '/about/Website use & Copyright'
              ],
              // '/': [
              //     '/Introduction',      
              // ],
            
        }

    },
    smoothScroll: true,
    configureWebpack: {
      resolve: {
        alias: {
          '@': resolve('/.vuepress/public')
        }
      }
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.png' }],
      ['script',
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
      }, 1000)`
      ]
    ],
  }

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
