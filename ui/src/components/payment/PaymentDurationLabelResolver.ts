import {PaymentDuration} from './PaymentDuration';

export class PaymentDurationLabelResolver {

    public static resolve(duration: PaymentDuration): String {
        if (duration === PaymentDuration.YEAR) {
            return 'Year';
        }
        return 'Half a year';
    }
}