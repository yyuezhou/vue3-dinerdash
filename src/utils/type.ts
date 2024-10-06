/**
 * @desc 枚举转数组
 * @param enumObject
 * @returns
 */
export function enumToObjArray(enumObject: object): any[] {
  return Object.keys(enumObject).map(key => ({
    label: enumObject[key],
    value: key
  }));
}

/**
 * @desc 分类
 */
export enum FoodCategory {
  "hot" = "热菜",
  "cold" = "凉菜",
  "mian" = "主食",
  "drink" = "饮料",
  "sweet" = "甜品",
  "necessary" = "必需品"
}

/**
 * @desc 菜品状态
 */
export enum FoodStatus {
  "normal" = "正常",
  "sold" = "售罄"
}

/**
 * @desc 角色
 */
export enum Role {
  "管理员",
  "老板",
  "经理",
  "员工"
}

/**
 * @desc 支付方式
 */
export enum PayWay {
  "微信支付",
  "支付宝",
  "现金",
  "余额",
  "银联卡"
}

export function getEnumKey(obj, value) {
  const list = enumToObjArray(obj);
  let i = list.find(i => i.value === value).label;
  return i;
}
