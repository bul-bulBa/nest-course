import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

Injectable()
export class ToLowerCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(typeof value === 'string') {
            return value.toLowerCase()
        }
        return value
    }
}