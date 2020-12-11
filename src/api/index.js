import request from '../utils/request';

export const login = query => {
    return request({
        url: `/admin/common/login`,
        method: 'post',
        data: query
    });
};

//获取店铺信息
export const shopInfo = query => {
    return request({
        url: `/admin/shop/info`,
        method: 'get',
        params: query
    });
};

// 10.4.获取首页信息
export const homeIndex = query => {
    return request({
        url: `/admin/home/index`,
        method: 'post',
        data: query
    });
};

// 获取店铺负责人
export const shopManagerInfo = query => {
    return request({
        url: `/admin/shop/managerInfo`,
        method: 'get',
        params: query
    });
};
// 编辑店铺负责人信息
export const shopSaveManager = query => {
    return request({
        url: `/admin/shop/saveManager`,
        method: 'post',
        data: query
    });
};

// 编辑店铺信息
export const shopSave = query => {
    return request({
        url: `/admin/shop/save`,
        method: 'post',
        data: query
    });
};

// 获取员工列表
export const staffList = query => {
    return request({
        url: `/admin/staff/list`,
        method: 'get',
        params: query
    });
};
// 2.3.5.获取禁用账号列表
export const staffDisableList = query => {
    return request({
        url: `/admin/staff/disableList`,
        method: 'get',
        params: query
    });
};

// 2.3.5.获取禁用账号列表
export const staffSetDisable = query => {
    return request({
        url: `/admin/staff/setDisable`,
        method: 'post',
        data: query
    });
};


// 2.1.2.添加（编辑）职位
export const positionSave = query => {
    return request({
        url: `/admin/position/save`,
        method: 'post',
        data: query
    });
};

// 添加（编辑）员工
export const staffSave = query => {
    return request({
        url: `/admin/staff/save`,
        method: 'post',
        data: query
    });
};

// 获取职位列表
export const positionList = query => {
    return request({
        url: `/admin/position/list`,
        method: 'get',
        params: query
    });
};
// 删除职位
export const positionDelete = query => {
    return request({
        url: `/admin/position/delete`,
        method: 'post',
        data: query
    });
};
// 获取角色列表
export const roleList = query => {
    return request({
        url: `/admin/role/list`,
        method: 'get',
        params: query
    });
};
// 获取角色列表
export const roleAathList = query => {
    return request({
        url: `/admin/role/authList`,
        method: 'get',
        params: query
    });
};
// 2.2.4.获取角色详情
export const roleDetail = query => {
    return request({
        url: `/admin/role/detail`,
        method: 'get',
        params: query
    });
};

// 2.2.2.添加（编辑）角色
export const roleSave = query => {
    return request({
        url: `/admin/role/save`,
        method: 'post',
        data: query
    });
};

// 获取班次列表
export const worktimeList = query => {
    return request({
        url: `/admin/worktime/list`,
        method: 'get',
        params: query
    });
};
// 获取员工排班列表
export const worktimeStaffList = query => {
    return request({
        url: `/admin/worktime/staffList`,
        method: 'get',
        params: query
    });
};
// 2.4.7 获取复制员工上一周的排班信息
export const worktimeCopylast = query => {
    return request({
        url: `/admin/worktime/copylast`,
        method: 'get',
        params: query
    });
};

// 添加（编辑）班次
export const worktimeSave = query => {
    return request({
        url: `/admin/worktime/save`,
        method: 'post',
        data: query
    });
};
// 获取职位列表
export const positionSelectList = query => {
    return request({
        url: `/admin/position/selectList`,
        method: 'get',
        params: query
    });
};

// .获取角色列表
export const roleSelectList = query => {
    return request({
        url: `/admin/role/selectList`,
        method: 'get',
        params: query
    });
};

// .11.4.服务列表（开单页面）
export const serviceSelectList = query => {
    return request({
        url: `/admin/service/selectList`,
        method: 'get',
        params: query
    });
};

// 7.10.开单页面用户列表搜索
export const worktableMemberInfo = query => {
    return request({
        url: `/admin/worktable/memberInfo`,
        method: 'get',
        params: query
    });
};

// 3.1.4.获取服务分类列表
export const serviceKind = query => {
    return request({
        url: `/admin/service/kind`,
        method: 'get',
        params: query
    });
};
// 7.4.常用服务列表
export const worktableCommonService = query => {
    return request({
        url: `/admin/worktable/commonService`,
        method: 'get',
        params: query
    });
};

// 7.3.取单列表
export const worktableOrderList = query => {
    return request({
        url: `/admin/worktable/orderList`,
        method: 'get',
        params: query
    });
};
// 7.6.获取用户的所有充值卡
export const worktableMemberAllRechargeCard = query => {
    return request({
        url: `/admin/worktable/memberAllRechargeCard`,
        method: 'get',
        params: query
    });
};

// 11.21.获取技师下拉列表
export const staffTechnicianSelect = query => {
    return request({
        url: `/admin/staff/technicianSelect`,
        method: 'get',
        params: query
    });
};
// 11.22.获取用户消费时可选权益
export const worktableRightSelect = query => {
    return request({
        url: `/admin/worktable/rightSelect`,
        method: 'get',
        params: query
    });
};
// 11.7.获取包厢列表
export const boxSelectList = query => {
    return request({
        url: `/admin/box/selectList`,
        method: 'get',
        params: query
    });
};
// 5.1.8. 所有卡项
export const memberAllCard = query => {
    return request({
        url: `/mp/member/allCard`,
        method: 'get',
        params: query
    });
};
// 9.2.2.4.等级信息
export const memberLevelDetail = query => {
    return request({
        url: `/admin/memberLevel/detail`,
        method: 'get',
        params: query
    });
};

// 9.4.1.开单设置列表（收款方式）
export const paymentList = query => {
    return request({
        url: `/admin/payment/list`,
        method: 'get',
        params: query
    });
};


// 11.3.会员等级列表
export const memberLevelList = query => {
    return request({
        url: `/admin/memberLevel/selectList`,
        method: 'get',
        params: query
    });
};

//4.2.5.获取会员列表
export const memberList = query => {
    return request({
        url: `/admin/member/list`,
        method: 'get',
        params: query
    });
};

//11.10.获取健康管理师下来列表
export const hmSelectList = query => {
    return request({
        url: `/admin/hm/selectList`,
        method: 'get',
        params: query
    });
};


//11.19  获取卡列表（不分页版）
export const listNoPage = query => {
    return request({
        url: `/admin/card/listNoPage`,
        method: 'get',
        params: query
    });
};

//3.2.5.获取卡项列表（分页）
export const cardList = query => {
    return request({
        url: `/admin/card/list`,
        method: 'get',
        params: query
    });
};


//3.2.5.获取卡项列表（分页）
export const rechargeRight = query => {
    return request({
        url: `/admin/card/recharge/right`,
        method: 'get',
        params: query
    });
};


//4.3.7.添加（编辑）会员
export const memberSave = query => {
    return request({
        url: `/admin/member/save`,
        method: 'post',
        data: query
    });
};

//4.3.3.会员详情
export const memberDetail= query => {
    return request({
        url: `/admin/member/detail`,
        method: 'get',
        params: query
    });
};

//4.3.5.会员详情-增减积分
export const memberIntegralOption= query => {
    return request({
        url: `/admin/member/integralOption`,
        method: 'post',
        data: query
    });
};



//9.2.1.3.添加（编辑）会员标签
export const memberTagSave= query => {
    return request({
        url: `/admin/memberTag/save`,
        method: 'post',
        data: query
    });
};


//9.2.1.1.标签列表
export const memberTagList= query => {
    return request({
        url: `/admin/memberTag/list`,
        method: 'get',
        params: query
    });
};

//6.8 获取预约列表未读状态
export const bookingReadState = query => {
    return request({
        url: `/admin/booking/readState`,
        method: 'get',
        params: query
    });
};
//4.3.4.会员详情-卡项列表
export const memberCard = query => {
    return request({
        url: `/admin/member/card`,
        method: 'get',
        params: query
    });
};
// 4.3.6.会员详情-积分明细
export const memberIntegralList = query => {
    return request({
        url: `/admin/member/integralList`,
        method: 'get',
        params: query
    });
};


// 4.3.6.会员详情-积分明细
export const orderList = query => {
    return request({
        url: `/admin/order/list`,
        method: 'get',
        params: query
    });
};



//4.3.1.会员详情-赠送权益
export const memberGiveService = query => {
    return request({
        url: `/admin/member/giveService`,
        method: 'get',
        params: query
    });
};


//4.3.9.会员-交易记录
export const memberOrder = query => {
    return request({
        url: `/admin/member/order`,
        method: 'get',
        params: query
    });
};

//4.3.10.会员-评价记录
export const memberRate = query => {
    return request({
        url: `/admin/member/rate`,
        method: 'get',
        params: query
    });
};

// 4.3.14.会员详情-积分梗概
export const memberPointInfo = query => {
    return request({
        url: `/admin/member/pointInfo`,
        method: 'get',
        params: query
    });
};

// 4.1.2.3.获取妈妈档案基本信息
export const archivesBase = query => {
    return request({
        url: `/admin/archives/base`,
        method: 'get',
        params: query
    });
};
// 4.1.1.2.获取宝宝档案基本信息
export const archivesBabyBase = query => {
    return request({
        url: `/admin/archives/babyBase`,
        method: 'get',
        params: query
    });
};
// 4.1.2.4.获取妈妈档案记录
export const archivesRecord = query => {
    return request({
        url: `/admin/archives/record`,
        method: 'get',
        params: query
    });
};

// 4.1.1.1.获取宝宝档案记录
export const archivesBabyRecord = query => {
    return request({
        url: `/admin/archives/babyRecord`,
        method: 'get',
        params: query
    });
};


// 4.1.1.查看档案查询扫码授权状态
    export const archivesQueryAuth = query => {
    return request({
        url: `/admin/archives/queryAuth`,
        method: 'get',
        params: query
    });
};


// 4.1.2.获取授权二维码
    export const archivesAuthQr = query => {
    return request({
        url: `/admin/archives/authQr`,
        method: 'get',
        params: query
    });
};

// 4.1.2.1.添加（编辑）妈妈档案记录
    export const archivesSaveRecord = query => {
    return request({
        url: `/admin/archives/saveRecord`,
        method: 'post',
        data: query
    });
};

// 4.1.2.2.添加（编辑）妈妈档案
    export const archivesSaveBase = query => {
    return request({
        url: `/admin/archives/saveBase`,
        method: 'post',
        data: query
    });
};

// 4.1.1.4.添加（编辑）宝宝档案
    export const archivessaveBabyBase = query => {
    return request({
        url: `/admin/archives/saveBabyBase`,
        method: 'post',
        data: query
    });
};

// 4.2.4.更改健康管理师
    export const memberBindHm = query => {
    return request({
        url: `/admin/member/bindHm`,
        method: 'post',
        data: query
    });
};

// 4.2.2.删除会员
    export const memberDelete = query => {
    return request({
        url: `/admin/member/delete`,
        method: 'post',
        data: query
    });
};


// 4.3.15 设置会员的标签（可批量）
    export const memberEditTag = query => {
    return request({
        url: `/admin/member/editTag`,
        method: 'post',
        data: query
    });
};


// 4.3.12.会员标签-获取所有标签
    export const memberAllTag = query => {
    return request({
        url: `/admin/member/allTag`,
        method: 'get',
        params: query
    });
};


// 4.3.8.获取快速注册二维码
    export const memberRegQr= query => {
    return request({
        url: `/admin/member/regQr`,
        method: 'get',
        params: query
    });
};

// 4.1.1.5 获取所有宝宝的档案信息和档案记录
    export const allBabyArchives= query => {
    return request({
        url: `/admin/archives/allBabyArchives`,
        method: 'get',
        params: query
    });
};

// 11.1.获取班次列表
    export const worktimeSelectList= query => {
    return request({
        url: `/admin/worktime/selectList`,
        method: 'get',
        params: query
    });
};


// 2.4.6.调整员工某一天班次
    export const worktimeStaffChange = query => {
    return request({
        url: `/admin/worktime/staffChange`,
        method: 'post',
        data: query
    });
};


// 4.1.1.3.添加（编辑）宝宝档案记录
    export const archivesSaveBabyRecord = query => {
    return request({
        url: `/admin/archives/saveBabyRecord`,
        method: 'post',
        data: query
    });
};



// 2.3.6.获取绑定微信二维码
    export const staffBind= query => {
    return request({
        url: `/admin/staff/bind`,
        method: 'get',
        params: query
    });
};




// 2.4.4.设置排班
    export const worktimeStaffEdit= query => {
    return request({
        url: `/admin/worktime/staffEdit`,
        method: 'post',
        data: query
    });
};



// 7.11.创建订单--服务
    export const worktableHangService= query => {
    return request({
        url: `/admin/worktable/hangService`,
        method: 'post',
        data: query
    });
};
// 7.12.创建订单--充值操作
    export const worktableHangRecharge = query => {
    return request({
        url: `/admin/worktable/hangRecharge`,
        method: 'post',
        data: query
    });
};

// 7.5.创建订单--开卡
    export const worktableHangCard = query => {
    return request({
        url: `/admin/worktable/hangCard`,
        method: 'post',
        data: query
    });
};

// 7.8.订单-服务确认收款
    export const worktableConfirmService = query => {
    return request({
        url: `/admin/worktable/confirmService`,
        method: 'post',
        data: query
    });
};


// 10.1.发送验证码
    export const sendCode = query => {
    return request({
        url: `/admin/common/sendCode`,
        method: 'post',
        data: query
    });
};
