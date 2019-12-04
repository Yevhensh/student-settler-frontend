import {PaymentDuration} from './PaymentDuration';

export class PaymentDurationResolver {

    public static resolve(duration: String): PaymentDuration {
        if (duration === PaymentDuration.YEAR.toString()) {
            return PaymentDuration.YEAR;
        }
        return PaymentDuration.HALF_YEAR;
    }
    
    public static resolveLabel(duration: PaymentDuration): String {
        if (duration === PaymentDuration.YEAR) {
            return 'Year';
        }
        return 'Half a year';
    }
}