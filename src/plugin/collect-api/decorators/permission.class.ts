import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PERMISSION_CLASS } from '../constants/collect';

/**
 * @Author: Hower
 * @Date: 2022-08-13 15:06:46
 *
 * @Description: 使用在类上的装饰器
 * @param {string} name
 * @return {*}
 */
export const PermissionClass = (name: string): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(PERMISSION_CLASS, name));
};
