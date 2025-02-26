import { Request } from 'express';
export declare class ToolsService {
    get uuidToken(): string;
    get getRandomSalt(): string;
    getReqIP(req: Request): string;
    makePassword(password: string, salt: string): string;
    generateLoginTokenKey(accountId: number): string;
    generateLoginRefreshTokenKey(accountId: number): string;
}
