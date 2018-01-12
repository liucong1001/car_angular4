import {PersonModel} from './person.model';

/**
 * 买方对象实例
 * [过户业务时(创建)必须]
 */
export class BuyerForm {
  /**
   * 买方审核图片列表<map>
   */
  reviewPhotos: object;
  /**
   * 买方录入图片列表<map>
   */
  photos: object;
  /**
   * 受托人图片列表<map>
   */
  trusteePhotos: object;
  buyer: PersonModel;
}
