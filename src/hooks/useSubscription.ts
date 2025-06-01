import { useState } from "react"
import axios from "axios"

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)

    const onSubscribe = async () => {
        try{
            setIsProcessing(true)

            const response = await axios.get('/api/payment')

            if(response.data.status === 200) {
                return window.location.href = `${response.data.session_url}`
            }

            console.log("Axios response", response);

        }catch(err) {
            console.log("Error in the useSubscription hook", err);
        }finally {
            setIsProcessing(false)
        }

    }

    return {
        onSubscribe,
        isProcessing
    }
}