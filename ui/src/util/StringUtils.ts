export class StringUtils {

    public static isNotEmpty(value: String): boolean {
        return !StringUtils.isEmpty(value);
    }

    public static isEmpty(value: String): boolean {
        return !value || value.length === 0;
    }
}