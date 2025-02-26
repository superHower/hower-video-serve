import { URL } from 'url';
/**
 * @Author: Hower
 * @Date: 2021-07-16 16:47:27
 *
 * @Description: 根据key从一段url中获取query值
 * @param urlPath {String} url地址
 * @param key {String} 获取单独的一个key
 * @return {*}
 */
export const getUrlQuery = (urlPath: string, key: string): string | null => {
  const url = new URL(urlPath, 'https://www.');
  const params = new URLSearchParams(url.search.substring(1));
  return params.get(key);
};

// 获取文件后缀
export function getFileSuffixByName(extname: string): string {
  // 定义一个正则表达式，用于匹配点号后面的所有字符
  const regex = /\.([^.]+)$/;
  const match = extname.match(regex);
  if (match) {
    return match[1];
  }
  // 如果没有匹配到，返回原字符串
  return extname;
}
