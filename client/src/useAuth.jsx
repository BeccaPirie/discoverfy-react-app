import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(async() => {
        try {
            const res = await axios.post("/login", {
                code,
            })
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }
        catch(err) {
           window.location = "/" 
        }
      }, [code])
    
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(async() => {
            try {
                const res = await axios.post("/refresh", {
                    refreshToken,
                })
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            }
            catch(err) {
                window.location = "/"
            }
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])
    
    return accessToken
}
