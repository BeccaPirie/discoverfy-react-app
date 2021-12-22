import useAuth from "../../useAuth"

export default function Home({code}) {
    const accessToken = useAuth(code)

    return (
        <div>
            Home
        </div>
    )
}
