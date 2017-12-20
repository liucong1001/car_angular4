export class Areamap {
    constructor(
        /* 市场 */
        public cloudUser: null,

        public id: string,
        /*    地区名称 */
        public label: string,

        public name: string,
        /* 地区代码 */
        public code: string,
        /* 车牌前缀 */
        public plateNumberPrefix: string,

        public zipCode: null,
        /*  地区子集 */
        public childrens: Array<any>,

        public parent: object,
    ) { }

    }
