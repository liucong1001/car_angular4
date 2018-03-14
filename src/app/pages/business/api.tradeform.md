```
  tradeform
    clouduser	 [所有情况必须]
    archiveNo				车辆流水号    [预审后的过户操作必须][修改必须]
    prejudication			预审业务对象  [不需要]
      id
      business 	预审业务
        id
        businessType 业务类型代码值 预审 01 过户 02(后面可能要统一到代码集)
        archiveNo 	  业务流水号(预审批次号)
        invalid 	  是否有效 0 有效 1 无效
        ownerId 	  业务所有者标识 (目前仅预审业务含值，标识直接过户)
      formFlage 	来源标记 0 pc 1 app
      invalid		是否有效 0 有效 1 无效
    prejudicationStatus		预审业务对象状态   0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回; [修改操作时必须]
    seller					卖方对象实例  [预审和直接过户时(创建)必须]
      reviewPhotos  		卖方审核图片列表<map> [审核时]
      photos 				卖方录入图片列表<map> [创建时]
      trusteePhotos 		受托人图片列表<map>   [可选]
      seller
        id
        certType			
        certCode			
        Name			
        EndDate			
        Phone			
        FilingInfo	备案人对象实例{id}
        TrusteeType			
        Flag			
        Address			
        Trustee	卖方委托人对象实例	name	
          EndDate	
          Phone	
          FilingInfo卖方受托人的备案人实例{id}	
    preVehicle				预审车辆对象实例	   [预审和直接过户时(创建和增加)必须]
      photos 				卖方录入图片列表<map>
      preVehicle 			<obj>
        FilingInfo	备案人对象实例	id
        LabelCode	厂牌型号名称	
        VehicleType	车辆类型代码	
        PlateNumber	车牌号	
        FrameNumber	车架号	
        Registratio	登记证书号	
        RegistrationDate	行驶证注册日期	
        UseCharacter	使用性质代码	
        UseNature	车辆性质	
        Displacement	设置排量	
        Range	排量区间代码	
        Size	车辆大小代码	
        Mileage	行驶里程 number	
        OtherConditions	其它状况说明	
        Origin	车辆产地	
        Fee	手续费 number
      newCarsPrice 		新车价格 number  [录入时必须]
    transfer 				过户业务对象实例（结构同prejudication）[不需要]
      id
      business 	过户业务
        id
        businessType 业务类型代码值 预审 01 过户 02(后面可能要统一到代码集)
        archiveNo 	  业务流水号(过户批次号)
        invalid 	  是否有效 0 有效 1 无效
        ownerId 	  业务所有者标识 (不用)
      formFlage 	来源标记 0 pc 1 app
      invalid		是否有效 0 有效 1 无效
    transferStatus			过户业务对象状态   0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回;  [修改时必须]
    buyer 					买方对象实例	     [过户业务时(创建)必须]
      reviewPhotos  		买方审核图片列表<map>
      photos 				买方录入图片列表<map>  指纹头像，证件
      trusteePhotos 		受托人图片列表<map>
      buyer
        id
        certType			
        certCode			
        Name			
        EndDate			
        Phone			
        FilingInfo	备案人对象实例	id	
        TrusteeType			
        Flag			
        Address			
        Trustee	卖方委托人对象实例	name	
          EndDate	
          Phone	
          FilingInfo卖方受托人的备案人实例	id
    TransferVehicle			过户车辆对象实例	    [过户时(创建和增加)必须]
      photos 				买录入图片列表<map>  与车相关的图片可能有； 增值税发票，消费税发票，委托书(一车一委托，委托人的委托书)，代办证明(海南的一车一委托)
      TransferVehicle 			<obj>
        id
        FilingInfo	备案人对象实例	id  过户的代办员的Id，
        merchant    商户 {}
        vehicleManagement  车管所 {}
        billMemo    发表备注
        evaluatePrice	评估价格 number	
        bargainPrice	成交价格 number	
        fee	手续费 number	
        review 审核状态 0 - 未审核 1 - 已审核
        invalid 业务状态
      preVehicleId 		预审车辆标识     preVehicle.preVehicle.id
```