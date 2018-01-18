export class Permissionmap {

        constructor(
            /* 市场 */
            public cloudUser : null,

            public id: string,
            /**
            * 许可名称
            */
            public label: string,
            public name: string,
            // public label: string,
            /**
             * 许可代码
             */
            public code: string,
            // 访问路径
            public path: string,

            // 图标
            public icon: string,

            public status: string,

            public seq: number,

            public subPermissons: Array<any>,

            public parent: {
               id?: string,
            },

        ) { }

    }

