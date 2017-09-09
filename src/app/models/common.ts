declare let _: any;

export class CommonModel {

    constructor(attr?: object) {}

    static createFromArray(collection: object|object[]): any[] {
        collection = !_.isArray(collection) ? [collection] : collection;
        return _.map(collection, (attr) => {
            return new this(attr);
        });

    }

}