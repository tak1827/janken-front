import homeRoute from './pages/home'
import bitNftRoute from './pages/bit-nft'
import bitTokenRoute from './pages/bit-token'
import mypageRoute from './pages/my-page'
import AppLayout from '@/layouts/AppLayout.vue'
import MyPageLayout from '@/layouts/MyPageLayout.vue'
export default [
    {
        path: '/bit',
        component: AppLayout,
        redirect: '/bit/nft',
        children: [
          ...bitNftRoute,
          ...bitTokenRoute,
        ],
    },
    {
      path: '/mypage',
      component: MyPageLayout,
      redirect: '/mypage/asset',
      children: [
        ...mypageRoute
      ],
    },
    ...homeRoute,
  ]