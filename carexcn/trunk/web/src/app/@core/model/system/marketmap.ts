/**
 * 市场配置模型
 */
export class Marketmap {

   public id: string;
    /**
     * 市场名称
     */
    public name: string;

    public cloudUser : string;

    public code:string;
    /*   市场代码 */
    public number: string;
    /*   地区 */
    // id,clouder,name code,
    public area = {
      id: '',
      name: '',
    };
    /* 市场备注 */
    public memo: string;

}
