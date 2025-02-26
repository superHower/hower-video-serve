import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { LoginVo } from './vo/login.vo';
import * as svgCaptcha from 'svg-captcha';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    loginApi(req: LoginDto): Promise<LoginVo>;
    refreshTokenApi(token: string): Promise<LoginVo>;
    getCaptchaApi(): svgCaptcha.CaptchaObj;
}
