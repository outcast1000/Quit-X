# Block Twitter and X.com Chrome Extension

This Chrome extension blocks access to Twitter and X.com by redirecting users to a custom `blocked.html` page. It also blocks various resources from these domains to ensure a comprehensive block.

## Features

- Redirects main frame navigations to Twitter and X.com to a custom `blocked.html` page.
- Blocks various resources (scripts, images, stylesheets, etc.) from Twitter and X.com.
- Provides a popup interface to test the blocking functionality and refresh rules.

## Build

Some permissions are needed only for debug. In order to avoid asking them in the release version I have added this node.js script. You may need to run

```bash
npm install
```

For production run:

```bash
npm run build:prod
```

For debug:

```bash
npm run build:debug
```

## TODO

- Create the same for firefox
- build js script to create also the icons form a src image
- build js script to create all the zips for firefox & chrome at the same time
- Test it on pages with embedded tweets. eg https://www.capital.gr/diethni/3904538/starmer-den-mporoume-na-dextoume-mia-adunami-sumfonia-opos-tou-minsk-diamorfonoume-mia-summaxia-ton-prothumon-gia-tin-oukrania/
- Add an option to enable / disable embedded tweets
- Add an option to enable / disable the main apps
- Create a different icon

