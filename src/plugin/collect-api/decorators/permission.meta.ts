import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PERMISSION_META } from '../constants/collect';

/**
 * @Author: Hower
 * @Date: 2022-08-13 15:06:10
 *
 * @Description: 使用在方法上的装饰器
 * @param {string} name
 * @return {*}
 */
export const PermissionMeta = (name: string): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(PERMISSION_META, name));
};
