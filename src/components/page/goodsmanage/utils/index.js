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
    recharge_card: '充值卡'
};

export const CARD_STATUS_MAP = {
    1: '已失效',
    0: '使用中'
};
