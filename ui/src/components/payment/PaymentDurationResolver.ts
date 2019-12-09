import { PaymentDuration } from './PaymentDuration';

export class PaymentDurationResolver {

    public static resolve(duration: string): PaymentDuration {
        if (duration === PaymentDuration.YEAR.toString()) {
            return PaymentDuration.YEAR;
        }
        return PaymentDuration.HALF_YEAR;
    }

    public static resolveLabel(duration: PaymentDuration): string {
        if (duration === PaymentDuration.YEAR) {
            return 'Year';
        }
        return 'Half a year';
    }
}