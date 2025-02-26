import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsMinAmountConstraint implements ValidatorConstraintInterface {
    validate(value: number, _args: ValidationArguments): Promise<boolean>;
    defaultMessage(): string;
}
export declare function IsMinAmount(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
