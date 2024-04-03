// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Courses',
    icon: 'tabler:book-2',
    children: [
      {
        path: '/course/manage-courses/list',
        title: 'Manage Courses',
        icon: 'tabler:file-settings'
      },
      {
        path: '/course/manage-courses/form',
        title: 'Add New Course',
        icon: 'tabler:file-plus'
      },
      {
        path: '/course/category',
        title: 'Course Category',
        icon: 'tabler:grid'
      },
      {
        path: '/course/manage-courses/section',
        title: 'Section',
        icon: 'tabler:tag'
      }
    ]
  },
  {
    title: 'Users',
    icon: 'tabler:users',
    children: [
      {
        path: '/users/admin-user',
        title: 'Admin',
        icon: 'tabler:shield-minus'
      },
      {
        path: '/users/instructor-user',
        title: 'Instructor',
        icon: 'tabler:medal-2'
      },
      {
        path: '/users/student-user',
        title: 'Student',
        icon: 'tabler:user-circle'
      }
    ]
  },
  {
    title: 'Enrolment',
    icon: 'tabler:infinity',
    children: [
      {
        path: '/enrolment/course-enrolment',
        title: 'Course Enrolment',
        icon: 'tabler:file-plus'
      },
      {
        path: '/enrolment/history',
        title: 'Enrolment History',
        icon: 'tabler:server-bolt'
      }
    ]
  },
  {
    title: 'Report',
    icon: 'tabler:file-check',
    children: [
      {
        path: '/reports/admin',
        title: 'Admin Report',
        icon: 'tabler:file-list'
      },

      // {
      //   path: '/reports/instructor',
      //   title: 'Instructor Report',
      //   icon: 'tabler:file-list'
      // },
      {
        path: '/report/overall-report',
        title: 'Overall Report',
        icon: 'tabler:file-list'
      }
    ]
  },

  // {
  //   title: 'Affiliate',
  //   icon: 'tabler:link',
  //   children: [
  //     {
  //       path: '/affiliate/affiliate-list',
  //       title: 'Affiliate List',
  //       icon: 'tabler:file-list'
  //     },
  //     {
  //       path: '/affiliate/payouts',
  //       title: 'Payouts',
  //       icon: 'tabler:file-list'
  //     },
  //     {
  //       path: '/affiliate/affiliate-history',
  //       title: 'Affiliate History',
  //       icon: 'tabler:file-list'
  //     }
  //   ]
  // },
  {
    title: 'E-Books',
    icon: 'tabler:book',
    children: [
      {
        path: '/ebooks/ebook-list',
        title: 'E-Books List',
        icon: 'tabler:file-list'
      }
    ]
  },

  // {
  //   title: 'Permissions',
  //   icon: 'tabler:key',
  //   children: [
  //     {
  //       path: '/permissions/admin-permission',
  //       title: 'Admin Permission',
  //       icon: 'tabler:file-list'
  //     },
  //     {
  //       path: '/permissions/instructor-permission',
  //       title: 'Instructor Permission',
  //       icon: 'tabler:file-list'
  //     }
  //   ]
  // },
  {
    title: 'Model Test',
    icon: 'tabler:file-check',
    children: [
      {
        path: '/model-test/list',
        title: 'Model Test List',
        icon: 'tabler:file-list'
      }
    ]
  },
  {
    title: 'Comments',
    path: '/comments',
    icon: 'tabler:address-book'
  },

  // {
  //   title: 'Live',
  //   path: '/live',
  //   icon: 'tabler:play'
  // },
  // {
  //   title: 'Settings',
  //   icon: 'tabler:settings',
  //   children: [
  //     {
  //       path: '/settings/payment-settings',
  //       title: 'Payment Settings',
  //       icon: 'tabler:file-list'
  //     },
  //     {
  //       path: '/settings/certificate-settings',
  //       title: 'Certificate Settings',
  //       icon: 'tabler:file-list'
  //     }
  //   ]
  // }
]

export default navigation
