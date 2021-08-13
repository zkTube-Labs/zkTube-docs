const path = require('path')
module.exports = {
    base: '/',
    themeConfig: {
        logo: '/logo.png',
        nav:[
            {
                text:'Docs',
                link:'/'
            },
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
            '/faq/': ['/faq/What address should I use for a donation',
                      '/faq/What is the donation link',
                      '/faq/Do we have official WeChat group',
                      '/faq/Where do I get my test coin',
                      '/faq/The balance problem which the deposit amount doesn’t show up means we cannot withdraw',
              ],
              '/connect/':[
                '/connect/'
              ],
              '/about/':[
                '/about/',
                '/about/Content of website',
                '/about/Website use & Copyright'
              ],
              '/': [
                  '/Introduction',      
              ],
            
        }

    },
    smoothScroll: true,
    configureWebpack: {
      resolve: {
        alias: {
          '@': resolve('/.vuepress/public')
        }
      }
    }
  }

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
