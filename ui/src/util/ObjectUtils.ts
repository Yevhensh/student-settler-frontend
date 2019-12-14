

export default class ObjectUtils {
    public static checkNotNull(object: any): boolean {
        return object !== undefined && object !== null;
    }
}