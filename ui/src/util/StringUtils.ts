export class StringUtils {

    public static isNotEmpty(value: string): boolean {
        return !StringUtils.isEmpty(value);
    }

    public static isEmpty(value: string): boolean {
        return !value || value.length === 0;
    }
}