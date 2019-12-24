

export default class ObjectUtils {
    public static checkNotNull(object: any): boolean {
        return object !== undefined && object !== null;
    }

    public static checkNull(object: any): boolean {
        return !ObjectUtils.checkNotNull(object);
    }
}