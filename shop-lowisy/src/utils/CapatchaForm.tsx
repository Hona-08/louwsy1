import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "./axios";


export const ReCAPTCHAForm = (props) => {
    const recaptchaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = recaptchaRef.current.getValue();
        recaptchaRef.current.reset();

        await axios.post('/api/common/recaptcha', { token })
            .then(res => res)
            .catch((error) => {
                //console.log(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfLzVQjAAAAAIDP9ujXtSGBf66lzMRC5lCzI3XY"
            />
        </form>
    )

}


