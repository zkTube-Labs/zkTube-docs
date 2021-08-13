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
            '/faq/': [
              ],
              '/connect/':[
                '/connect/'
              ],
              '/about/':[
                '/about/',
                '/about/Content of website'
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
