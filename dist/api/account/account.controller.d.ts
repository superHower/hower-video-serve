import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { ICurrentUserType } from '@src/decorators';
import { AccountPageVo, AccountVo } from './vo/account.vo';
import { QueryAccountDto } from './dto/account.query';
import { AccountEntity } from './entities/account.entity';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    createAccountApi(req: AccountDto): Promise<string>;
    deleteAccountByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyAccountStatusByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyAccountByIdApi(id: number, req: AccountDto): Promise<string>;
    getAccountPageApi(queryOption: QueryAccountDto, currentInfo: ICurrentUserType): Promise<AccountPageVo>;
    getAccountListApi(currentInfo: ICurrentUserType, status: number): Promise<Pick<AccountEntity, 'id' | 'username' | 'parentId'>[]>;
    getAccountByIdApi(id: number): Promise<AccountVo | undefined>;
    batchDeleteAccountByIdListApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
    batchModifyAccountStatusByIdApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
}
