export class  commonAutionCar {

      public projectId :string;

      public  saleCar:commonAutionSaleCar;
}

export  class commonAutionSaleCar{

     public  id?:string;

     public plateNumber:string;
    /**
     * 协议费用
     */
     public fee:number;
    /**
     * 优惠金额
     */
     public discount:number;

}
