type ObjectType = Record<string, number | string | boolean>;
/**
 * @Author: Hower
 * @Date: 2021-03-26 14:35:21
 *
 * @Description: 将map转换为对象
 * @param {Map} map
 * @param {*} any
 * @return {*}
 */
export const mapToObj = (map: Map<string, any>): ObjectType => {
  const obj: ObjectType = {};
  for (const [k, v] of map) {
    obj[k] = v;
  }
  return obj;
};
