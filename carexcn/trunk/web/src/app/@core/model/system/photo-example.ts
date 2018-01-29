/**
 * 照片示例
 */
export class PhotoExampleModel {


  public  photoExample:{
    /**
     * 照片类型
     */
    photoType:string;
    /**
     * 长宽比
     */
    scale: string;

    id:string;
  };
  public photos?:{
    photoExample:[{
      id:string,
      fileType:string,
      filePath:string,
      objectId:string,
      objectType:string,
    }]
  }


}
