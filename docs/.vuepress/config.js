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
        ],
        sidebar:{
            '/faq/': ['/faq/What address should I use for a donation',
                      '/faq/What is the donation link',
                      '/faq/Do we have official WeChat group',
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
