const axios = require('axios');
const json2csv = require('json2csv')
const fs = require('fs')
const path = require('path');
const { promisify } = require('util');

const { Parser } = json2csv

const Utils = {
  toCsv(name, list) {
    const parser = new Parser();
    const csv = parser.parse(list);
    promisify(fs.writeFile)(path.resolve(__dirname, './files', `${name}.csv`), csv)
  }
}

const API = {
  async getIncreasingTopShopList(size = 20) {
    const response = await axios.post(
      'https://ixspy.com/shopify-store-rank',
      {
        'rank_type': 'new_inc',
        'time': '2022-10-31',
        'dayType': 'month',
        'page': 1,
        'size': size,
        'orderBy': 'rank_num',
        'orderType': 'asc',
        'shop_domain': '',
        'shop_id': '',
        'category_id': '',
        'category_nodes': [],
        'avg_price_start': 0,
        'avg_price_end': 0,
        'sales_inc_start': 0,
        'sales_inc_end': 0
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          'Cookie': 'user_mouse=20221217195834_bst9ousim; language=zh; _ga=GA1.2.1217134321.1671278316; email=; sidebarStatus=1; _fbp=fb.1.1671278353742.1972416513; ext_url=; AliexpressSession=S2WBxqYsrHHohwuxd8isccW8xAcORaVCRtbuXn9W; _gid=GA1.2.853226555.1671893330; favtedProductIds=; favtedShopIds=; is_w_tip=1; login_session=vOmpWJaP70e4P9IaSnhry4lHHU76QfMGqHZkj1Zj; user_id=41437; level=undefined; ad_login_token=b8748077a6f9c89b3ffcc03cf5f4446f',
          'Origin': 'https://ixspy.com',
          'Pragma': 'no-cache',
          'Referer': 'https://ixspy.com/data',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
          'currpagePath': '/shopify-store/new-inc',
          'page': 'shopify_store_new_inc',
          'prevpagePath': '/',
          'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'siteId': '7'
        }
      }
    );
    return response.data.data.list;
  },
  getNewHotSaleShopList: async function getNewHotSaleShopList(size = 20) {

    const response = await axios.post(
      'https://ixspy.com/shopify-store-rank',
      {
        'rank_type': 'new_hot',
        'time': '2022-10-31',
        'dayType': 'month',
        'page': 1,
        'size': size,
        'orderBy': 'rank_num',
        'orderType': 'asc',
        'shop_domain': '',
        'shop_id': '',
        'category_id': '',
        'category_nodes': [],
        'avg_price_start': 0,
        'avg_price_end': 0,
        'sales_count_start': 0,
        'sales_count_end': 0
      },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          'Cookie': 'user_mouse=20221217195834_bst9ousim; language=zh; _ga=GA1.2.1217134321.1671278316; email=; sidebarStatus=1; _fbp=fb.1.1671278353742.1972416513; ext_url=; AliexpressSession=S2WBxqYsrHHohwuxd8isccW8xAcORaVCRtbuXn9W; _gid=GA1.2.853226555.1671893330; favtedProductIds=; favtedShopIds=; is_w_tip=1; login_session=vOmpWJaP70e4P9IaSnhry4lHHU76QfMGqHZkj1Zj; _gat_gtag_UA_161819767_1=1; user_id=41437; level=undefined; ad_login_token=b8748077a6f9c89b3ffcc03cf5f4446f',
          'Origin': 'https://ixspy.com',
          'Pragma': 'no-cache',
          'Referer': 'https://ixspy.com/data',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
          'currpagePath': '/shopify-store/new-hot',
          'page': 'shopify_store_new_hot',
          'prevpagePath': '/loginsuc',
          'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'siteId': '7'
        }
      }
    );

    return response.data.data.list;
  },
  async getTopFromSites(site) {
    const response = await axios.get('https://pro.similarweb.com/widgetApi/WebsiteOverviewDesktop/TopReferrals/Table', {
      params: {
        'country': '999',
        'from': '2022|09|01',
        'includeSubDomains': 'true',
        'isWindow': 'false',
        'keys': site,
        'timeGranularity': 'Monthly',
        'to': '2022|11|30',
        'pageSize': '5',
        'webSource': 'Desktop',
        'orderBy': 'TotalShare desc'
      },
      headers: {
        'authority': 'pro.similarweb.com',
        'accept': 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=utf-8',
        'cookie': 'locale=zh-cn; _vwo_uuid=JE60CE3C718A4D08BD91B225D4F7D4439; _vwo_ds=3%241669044699%3A46.20804803%3A%3A; _vwo_uuid_v2=DBAF69DE68D6A8461C1FF05CEACBA0411|e1111a804ca9cfcc866a5457c51536be; _gcl_au=1.1.1575723977.1669044701; sgID=44616dde-5529-8594-1cfd-2c5383695b81; _wingify_pc_uuid=7fa778fd77f84f618cf2ac3962abb973; _ga=GA1.2.22276165.1669044702; _fbp=fb.1.1669044702543.1406622732; __qca=P0-2103151448-1669044702014; sw_extension_installed=1671026714284; _vis_opt_s=2%7C; _vis_opt_test_cookie=1; .SGTOKEN.SIMILARWEB.COM=JofW9FQeKhn5UzTUZGc7PNH_iOkFFZ9cYur-RnwQu83NwceD3Y514ftymChgxc_YfQ9lDMuwutfVEiojYhagxo02ZlkGFGv8XGJdzZtdQFoCFA7hSWYe96SQXvZkQGOIkHj_J_NycXc6qpyGORaSB0XWTBkJ486bPcahYQBAmBg0q6Y0lpaGRZywr6ZAev2h3j99L5cKAe5uKPFQjbEpcSsEARPdHsbYnXayDf-qPOznSmR0Fb_tBGPEw2lw1KNJVXdxuPxmQEhYDuMtX4zUfx5seIPU0w0m0dfX5w8simf8MMPyhhLowFzlnVNffKr3G0kb_mjY8dzVZ9xQvYdBGiYI1F7egEf8q08fV_5AcNI; registrationpersona_15343799=similarweb.com; _uetvid=995a52b069b111edb123492de049a898; _BEAMER_USER_ID_zBwGJEbQ32550=15ac59f3-058a-4881-a53e-9648b53adf83; _BEAMER_FIRST_VISIT_zBwGJEbQ32550=2022-12-18T06:58:37.838Z; fs_uid=#ND4K8#4794388637372416:6500529070231552:::#39c3d50c#/1702882716; _abck=5338F7B2852526E8BBE5FE89D0D3C284~0~YAAQGishF8S41BSFAQAA1viYRAmo0SZqe9P6jxxPBey7SE01iEzZYhtrRtact8pYsRjod1RVRg4lLNp05hDNq2n9wVHvgTNXCV4bPhfoO1PysBypuyJV/vUgpBK56cfRV/3tEJo1lzQLHptai1lzHB2vfArtggoMTtQWuhQgKgmQa6yxG5cwDgwmE2RBRyfOr68mITm/9ydyZrw4dGXFDeNWdDcpX86c2hbMeDmqgbKKiePelW4wCv0eyF0AmTlA5hKBK1gBXp6QRlJ8VCvaxsI/SXI2MGAytfk+FaiMGAl2PORHLcPKq6Pciw8peOqnWxqGQIwhGl0ywo6XxUX+rQLE/YVYbzn0/+FYJZGJf9AR1fWJuwzV0CsTGXvNpusdvRIFdACvNHwI4D6hNm5CYegL3MeYRjRX4PffBw==~-1~-1~-1; ak_bmsc=6B2C1B359E644F244829E94FFFBAE603~000000000000000000000000000000~YAAQGishF8W41BSFAQAA1viYRBIFnqI/r8hVbQRNsMujdl4tSI5iq4N3WOQ2tIIfmASnoJfH6G2YiIXs48x1+GRjz1yScdYvHWCeQj0n/4HKbJcz6caK8kzB1rN8g0cVcxdS6M9BHx8F/VeDDqDq8ZGCjqF/aoHQIswSI/dvbuIv+qWGmGolYwCUIivyRVPTFlQhUhiGC/lJBnrQlEKqIc/qyxQarKrsu8vg3817KCXPmY4G1k5tABa1bC/bNu0qBWo7HQy7xT8bYnPYKfLKqKmzBseu66f3BozAmpvMD591HMBw3rYCCAN5oMgo26yA675N6eclme2272lTIr3PIkik4BDwUMFBDMA4xM0igJaZh/QzNexru9tjblhB5OignyjVVIrL0gIvWA3LOA==; bm_sz=B25761719544FCC22A56A55119CB2A13~YAAQGishF8a41BSFAQAA1viYRBLdR+WjKGs57O7TwxZeCVWUWLot1yrkcFWi8s4X8xoz8O2uN5QIZGL/uHKD0PBUMuZ7uH58gvFzw6V1aaH1F6CZ7Axoo11wodb7x4RVhFyUR/wpFWrUwqBWsLA8Uo3AbMkVLAb76QJIL0zAjfu0O6L4vmMmKgC4igZ1nRfN9wXmFyS6GkzHADVrEdBDMhWwplMPkdPkJbmzeOaJC+KibhkYDMsU0MhNF61bx8NmVfWr7j5NLN6NR4oWG45W1YzpOoDtHLe7bmvrsMYaqQxgzZ2A4tr6~3551797~3684152; _pk_ref.1.fd33=%5B%22%22%2C%22%22%2C1671893155%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; fsrndidpro=true; _gid=GA1.2.2051371701.1671893157; ln_or=eyIzNjUwNCI6ImQifQ%3D%3D; _BEAMER_FILTER_BY_URL_zBwGJEbQ32550=true; __q_state_9u7uiM39FyWVMWQF=eyJ1dWlkIjoiNTM1MGZiMjItNDc0MC00OWFlLTg2MGEtYzVhYmE0MmJlYzJiIiwiY29va2llRG9tYWluIjoic2ltaWxhcndlYi5jb20iLCJtZXNzZW5nZXJFeHBhbmRlZCI6ZmFsc2UsInByb21wdERpc21pc3NlZCI6dHJ1ZSwiY29udmVyc2F0aW9uSWQiOiIxMDM3MzQ2MTA1NDIyNTIxNTIwIn0=; _pk_ses.1.fd33=1; mp_7ccb86f5c2939026a4b5de83b5971ed9_mixpanel=%7B%22distinct_id%22%3A%20%2215343799%22%2C%22%24device_id%22%3A%20%221849ad10cb7e91-00d75b77e4741d-18525635-13c680-1849ad10cb8e71%22%2C%22sgId%22%3A%20%2244616dde-5529-8594-1cfd-2c5383695b81%22%2C%22site_type%22%3A%20%22Pro%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22session_id%22%3A%20%22269393eb-5e3a-49be-a775-948834b46080%22%2C%22session_first_event_time%22%3A%20%222022-12-24T14%3A46%3A13.332Z%22%2C%22url%22%3A%20%22https%3A%2F%2Fpro.similarweb.com%2F%23%2Fdigitalsuite%2Fwebsiteanalysis%2Foverview%2Fwebsite-performance%2F*%2F999%2F3m%3FwebSource%3DTotal%26key%3Dbuypeel.com%22%2C%22is_sw_user%22%3A%20false%2C%22language%22%3A%20%22en-us%22%2C%22sw_extention%22%3A%20false%2C%22first_time_visitor%22%3A%20false%2C%22last_event_time%22%3A%201671893422742%2C%22page_id%22%3A%20%22Competitive%20Research-Website%20Analysis%2FOverview-websitePerformance%22%2C%22email%22%3A%20%22iveoname%40gmail.com%22%2C%22%24user_id%22%3A%20%2215343799%22%2C%22ui_generation%22%3A%20%2220221223.40649.66218d3%22%2C%22FullStory%20Session%22%3A%20%22https%3A%2F%2Fapp.fullstory.com%2Fui%2FND4K8%2Fsession%2F4794388637372416%253A6500529070231552%3Fintegration_src%3Dmixpanel%22%2C%22subscription_id%22%3A%20%2247529692%22%2C%22base_product%22%3A%20%22Digital%20Marketing%20Intelligence%20Trial%22%2C%22user_id%22%3A%2015343799%2C%22account_id%22%3A%2010000041%2C%22Fullstory%20Session%22%3A%20null%2C%22section%22%3A%20%22Competitive%20Research%22%2C%22sub_section%22%3A%20%22Website%20Analysis%2FOverview%22%2C%22sub_sub_section%22%3A%20%22websitePerformance%22%2C%22country%22%3A%20999%2C%22date_range%22%3A%20%223m%22%2C%22entity_id%22%3A%20%22buypeel.com%22%2C%22entity_name%22%3A%20%22buypeel.com%22%2C%22web_source%22%3A%20%22TOTAL%22%2C%22domain_type%22%3A%20%22WITH_SUBDOMAINS%22%2C%22main_category%22%3A%20%22Lifestyle%22%2C%22sub_category%22%3A%20%22Fashion%20and%20Apparel%22%2C%22custom_category_id%22%3A%20null%2C%22ab_test_name%22%3A%20%22VWO-1079%22%2C%22ab_test_value%22%3A%20%22Control%22%7D; bm_sv=FD06D08A0459E339C0D34CED98AA9C7E~YAAQGishF+i41BSFAQAAr+qgRBLHZbHBPIdrFqhWRQuPfA82s5A6/CZBORx6EVIOnuXpvxRaf299e8I6vBqBRiG7ClsIkoZzOKi8daSgYNpf8ADk1TR2ZrAWbZ1i84BehTHDNXyg9icSTBd9BCSxrZmaHZsorfXrX5+tR0xOkKDXRe7ZUfdWjhAVFO/+3wYPksAoytdbb8J2M2dn8R/19qhuAOlDTunR2fLR1wms1DbUIIbv1j4mlJtK2/AJ8N4QylPaFA==~1; _pk_id.1.fd33=95a534ec15f3a1b2.1669044701..1671893676.undefined.',
        'pragma': 'no-cache',
        'referer': 'https://pro.similarweb.com/',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'x-sw-page': 'https://pro.similarweb.com/#/digitalsuite/websiteanalysis/overview/website-performance/*/999/3m?webSource=Total&key=buypeel.com',
        'x-sw-page-view-id': '9bac7f63-de7e-42ae-8e74-f28a744390c6'
      }
    });

    return response.data
  }
}


async function main() {
  // const data = await API.getNewHotSaleShopList(1000)
  const data = await API.getIncreasingTopShopList(1000)
  console.log(Utils.toCsv('increase_list', data))
}

main()
