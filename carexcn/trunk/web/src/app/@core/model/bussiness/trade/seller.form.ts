import {PersonModel} from './person.model';

/**
 * 卖方对象实例
 * [预审和直接过户时(创建)必须]
 */
export class SellerForm {
  /**
   * 卖方审核图片列表<map> [审核时]
   */
  reviewPhotos: object;
  /**
   * 卖方录入图片列表<map> [创建时]
   */
  photos: object;
  /**
   * 受托人图片列表<map>   [可选]
   */
  trusteePhotos: object;
  seller: PersonModel;
}
