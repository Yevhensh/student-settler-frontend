export class StringUtils {

    public static isNotEmpty(value: string): boolean {
        return !StringUtils.isEmpty(value);
    }

    public static isEmpty(value: string): boolean {
        return !value || value.length === 0;
    }

    public static emptyIfNull = (value: any): string => {
        return value ? value.toString() : '';
    };

    public static ofNumberOrNull(n: number): string {
        return (n != null && n) ? n.toString() : null;
    }
}