/**
 * Created by LC on 2018/2/28.
 */
export class  ArchivesListStatusMap{
  /**
   * 流水号
   */
  public  archivesNo?:string;
  /**
   * 车牌号
   */
  public plateNumber?:string;
  /**
   * 车管所流水号
   */
  public code?:string;

  public  cloudUser?:string;
  /**
   * 状态
   */
  public  status :{
    text?:string,
    css?:string,
  }
}
