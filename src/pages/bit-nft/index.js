import BitNft from '@/pages/bit-nft/Index.vue'
import BitNftDetail from '@/pages/bit-nft/Detail.vue'
export default [
    {
      path: '/bit/nft',
      component: BitNft,
      name: 'bit.nft',
    },
    {
      path: '/bit/nft/:id',
      component: BitNftDetail,
      name: 'bit.nft.detail',
    },
  ]