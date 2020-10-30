export function guid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const CARD__KIND_GRP = {
    time_card: '次卡',
    discount_card: '折扣卡',
    // recharge_card: '充值卡',
    service_kind: '服务种类',
    goods_kind: '商品种类',
    all_service: '所有服务',
    all_goods: '所有商品',
    all_time_card: '所有次卡',
    all_discount_card: '所有折扣卡',
};

export const CARD_STATUS_MAP = {
    1: '已失效',
    0: '使用中'
};

export function gettime(ms){
    //2020-06-01T04:24:43.230Z
    // 把时间的中的T和Z 替换成空字符串
    let date = ms.replace('T',' ');
    let data = date.replace('Z','');
    // 声明一个变量赋值给：日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数
    let datime = Date.parse(data)
    return datime;
}
