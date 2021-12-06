import Send from '@/pages/my-page/offers/Send.vue'
import Receive from '@/pages/my-page/offers/Receive.vue'
import Asset from '@/pages/my-page/Asset.vue'
import BattleResult from '@/pages/my-page/BattleResult.vue'
import MintNFT from '@/pages/my-page/MintNFT.vue'
import auth from '@/middleware/auth';
export default [
    {
      path: '/mypage/offers/send',
      component: Send,
      name: 'mypage.offers.send',
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/mypage/offers/receive',
      component: Receive,
      name: 'mypage.offers.receive',
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/mypage/asset',
      component: Asset,
      name: 'mypage.asset',
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/mypage/battle-result',
      component: BattleResult,
      name: 'mypage.battle.result',
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/mypage/mint-nft',
      component: MintNFT,
      name: 'mypage.mint.nft',
      meta: {
        middleware: [auth]
      }
    },
]