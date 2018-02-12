/**
 * 返点报表模型
 */

export  class RebateForm{
 /*汇总方式*/
  public  collectType:string;
/*
日方式查询
 */
  public dayDate?:Date;
/*
   月方式查询
 */
  public monthDate?:Date;
/*
开始时间
 */
  public startDate?:Date;
/*
结束时间
 */
  public endDate?:Date;
}
