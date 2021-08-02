import { ModelVerifyNumber } from "./ModelVerifyNumber";

export interface ModelVerifiCationNumberProp {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setValueSubmit: React.Dispatch<React.SetStateAction<ModelVerifyNumber>>,
    setfinal: React.Dispatch<React.SetStateAction<{}>>,
    setShowOTP: React.Dispatch<React.SetStateAction<boolean>>,
    countryCodeArray: Array<{
        code: string,
        dial_code: string
    }>,
}
