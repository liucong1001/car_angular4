```
  照片证件类型接口
  地址：/rest/sys/market/photo/config/photo/ POST
  参数：marketphoto
  {
    isApp  0 0:pc
    business  业务类型  01 预审  02 过户
    certificateCode  证件类型代码集
    formName  表单名称
  }
  
  车辆检查接口(检查是否可录可操作)
  地址：/rest/business/trade/check GET
  参数：plateNumber
        filingInfoId 代办人唯一标识 filingInfoId
  
  返回：true则正常通过，否则异常，拍卖fillinfo，price


  创建预审车辆
  地址：/rest/business/trade/prejudication	post     clouduser  seller卖方对象实例  PreVehicle对象实例
  增加预审车辆	/rest/business/trade/prejudication/{id}	post   clouduser  PreVehicle对象实例
  预审审核		/rest/business/trade/prejudication	put
  
  创建过户车辆	/rest/business/trade/transfer  post       clouduser   buyer买方对象实例   TransferVehicle对象实例   archiveNo 车辆流水号
  增加过户车辆	/rest/business/trade/transfer/{id}	post
  过户审核		/rest/business/trade/transfer	put
  
  创建直接过户车辆	/rest/business/trade/trade  post   clouduser  seller卖方对象实例  PreVehicle对象实例  buyer买方对象实例  TransferVehicle对象实例
  增加直接过户车辆	/rest/business/trade/trade/{id}	post
  双方审核			/rest/business/trade/trade	put
  
  修改交易车辆信息	/rest/business/trade  put (可修改所有交易信息，，手机端录入也是这个接口)
  查询交易车辆信息	/rest/business/trade?archiveNo={number}  get (可查询交易所有信息)
  
  流水号是二维码
  
  
  交易查询页面功能
  
  手机端录入，分页查询 待续：  得到  tradeform 包含trade 照片， 接口 同 交易查询页面
  
  手机端录入打回原因查询    /rest/business/trade/back?archiveNo={number}  get  ()
      [查询]
      
  
  手机端录入打回            /rest/business/trade/back  put  ()
          archiveNo 车辆流水号
          reason 打回原因
          photoCodes 退回照片类型代码表
              <string>  eg:'01,03,05'照片类型01的照片被打回

```
