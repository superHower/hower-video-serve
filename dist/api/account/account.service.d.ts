import { AccountEntity } from './entities/account.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import { ICurrentUserType } from '@src/decorators';
import { ToolsService } from '@src/plugin/tools/tools.service';
import { AccountPageVo, AccountVo } from './vo/account.vo';
import { QueryAccountDto } from './dto/account.query';
export declare class AccountService {
    private readonly accountRepository;
    private readonly toolsService;
    constructor(accountRepository: Repository<AccountEntity>, toolsService: ToolsService);
    createAccountApi(req: AccountDto): Promise<string>;
    deleteAccountByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyAccountStatusByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyAccountByIdApi(id: number, req: AccountDto): Promise<string>;
    getAccountPageApi(queryOption: QueryAccountDto, currentInfo: ICurrentUserType): Promise<AccountPageVo>;
    getAccountListApi(currentInfo: ICurrentUserType, status: number): Promise<Pick<AccountEntity, 'id' | 'username' | 'parentId'>[]>;
    getAccountByIdApi(id: number): Promise<AccountVo | undefined>;
    batchDeleteAccountByIdListApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
    batchModifyAccountStatusByIdApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
    get queryAccountBuilder(): SelectQueryBuilder<AccountEntity>;
}
