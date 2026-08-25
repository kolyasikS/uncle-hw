import { Role } from "../../../../domain/constants";
export declare function Session(role: Role): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
