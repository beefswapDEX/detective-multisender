import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { CHAIN_ID } from 'src/app/config/constants/networks';
import Web3 from 'web3';

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    static addressValidator(control: AbstractControl): ValidationErrors | null  {
        const address: string = control.value; // get address from our password form control
        const check = Web3.utils.isAddress(address)
        if (!check) {
            // if they don't match, set an error in our token form control
            control.setErrors({AddressNotValid: true})
            return ({AddressNotValid: true})
        }
        return null
    }
}