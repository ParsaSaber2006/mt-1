export default {
    admin: {
        title: "مدیر سیستم",
        role: "admin",
        actions: [
            {
                title: ' کاربران / مشاوران',
                icon: "mdi-account-group",
                subs: [
                    {
                        to: { name: "admin.categories" },
                        icon: "mdi-format-list-bulleted-type",
                        title: "دسته بندی مشاورین",
                    },
                    {
                        to: { name: "admin.users" },
                        icon: "mdi-account-multiple",
                        title: " کاربران",
                    },
                    {
                        to: { name: "admin.advisors" },
                        icon: "mdi-account-multiple-outline",
                        title: " مشاورین",
                    },
                ]
            },
            {
                title: 'محتوا',
                icon: "mdi-file-multiple",
                subs: [
                    {
                        to: { name: "admin.pages" },
                        icon: "mdi-file-multiple",
                        title: "صفحه ها",
                    },
                    {
                        to: { name: "admin.posts" },
                        icon: "mdi-file-multiple",
                        title: " مقالات",
                    },
                    {
                        to: { name: "admin.posts.categories" },
                        icon: "mdi-file-multiple",
                        title: "دسته بندی مقالات",
                    },
                    {
                        to: { name: "admin.comments.list" },
                        icon: "mdi-file-multiple",
                        title: "نظرات و کامنت ها",
                    },
                ]
            },
            {
                title: 'گزارشات',
                icon: 'mdi-file-excel',
                subs: [
                    {
                        to: { name: "admin.calls" },
                        icon: "mdi-phone-log",
                        title: "تماس ها",
                    },
                    {
                        to: { name: "admin.applyAsAdvisorRequests" },
                        icon: "mdi-file-multiple",
                        title: "درخواست های همکاری مشاورین",
                    },
                ]
            },

            {
                to: { name: "admin.options.template" },
                icon: "mdi-cog",
                title: "تنظیمات سیستم",
            },
        ],
    },
    advisor: {
        title: "مشاور",
        role: "advisor",
        actions: [
            {
                to: { name: "advisor.calls" },
                icon: "mdi-format-list-bulleted-type",
                title: "تماس های من",
            },
            {
                to: { name: "advisor.myContacts" },
                icon: "mdi-account-group",
                title: "مخاطبین من",
            },
            {
                to: { name: "advisor.callRequests" },
                icon: "mdi-clock-in",
                title: "تماس های رزرو شده",
            },
        ],
    },
    marketer: {
        title: "بازاریاب",
        role: "marketer",
        actions: [
            {
                to: "",
                icon: "mdi-chart-line",
                title: "آمار و اطلاعات",
            },
            {
                to: { name: "marketer.affiliatedUsers" },
                icon: "mdi-account-multiple-plus-outline",
                title: "کاربران ثبت نام شده",
            },
        ],
    },
    user: {
        title: "کاربر",
        role: 'user',
        actions: [
            {
                to: { name: "profile" },
                icon: "mdi-account-edit",
                title: "پروفایل کاربری",
            },
            {
                to: { name: "wallet" },
                icon: "mdi-wallet",
                title: "کیف پول",
            },
            {
                to: { name: "history" },
                icon: "mdi-phone-log",
                title: "تاریخچه تماس",
            },
            {
                to: "",
                icon: "mdi-clock-out",
                title: "تماس های رزرو شده",
            },
            {
                to: "",
                icon: "mdi-folder-account",
                title: "پرونده های من",
            },
        ],
    },
}