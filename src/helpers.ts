import { HttpException, HttpStatus } from '@nestjs/common';
import { version as getUuidVersion, validate as isValidUuid } from 'uuid';

export const IDValidator = (id: string): boolean => {
    return getUuidVersion(id) === 4 && isValidUuid(id)
}

export const invalidIdExeption = () => new HttpException(
    'INVALID ID',
    HttpStatus.BAD_REQUEST,
);

export const itemNotExistExeption = (item: string) => new HttpException(
    `Requested ${item} is not exist`,
    HttpStatus.NOT_FOUND,
);

export const passwordsNotMatch = () => new HttpException(
    'Passwords not match, check OLD password',
    HttpStatus.FORBIDDEN,
);
