import BitNft from '@/pages/bit-nft/Index.vue'
import BitNftDetail from '@/pages/bit-nft/Detail.vue'
export default [
    {
      path: '/bet/nft',
      component: BitNft,
      name: 'bet.nft',
    },
    {
      path: '/bet/nft/:id',
      component: BitNftDetail,
      name: 'bit.nft.detail',
    },
  ]