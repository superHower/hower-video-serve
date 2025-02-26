import { ICurrentUserType } from '@src/decorators';
import { MenusService } from './menus.service';
import { ApiVo, MenusVo } from './vo/menus.vo';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    getAllMenusApi(userInfo: ICurrentUserType): Promise<MenusVo[]>;
    getBtnByMenusUrlApi(userInfo: ICurrentUserType, urlName: string): Promise<ApiVo[]>;
}
