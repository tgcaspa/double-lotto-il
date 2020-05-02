import { isArray, map } from 'lodash';

export class CommonModel {

    constructor(attr?: object) {}

    static createFromArray(collection: object|object[]): any[] {
        collection = !isArray(collection) ? [collection] : collection;
        return map(collection, (attr: object) => new this(attr));
    }

}
