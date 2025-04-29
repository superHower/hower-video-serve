import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class AccountVo extends QueryVo {
  readonly username!: string; // 账号
  readonly accountType!: number; // 账号类型:0普通账号,1是主账号,2是超管
  readonly nickname!: string; // 昵称
  readonly avatar!: string; // 头像
  readonly info!: string; // 简介
  readonly gender!: number; // 性别:0女,1男
  readonly age!: number; // 年龄

  readonly parentId!: number; // 自关联主键id
  readonly parentName!: number; // 自关联主键id

  readonly sort!: number; // 排序
  readonly status!: number; // 状态0是正常,1是禁用
}

export class AccountPageVo extends QueryListVo {
  readonly data!: AccountVo[];
}
