interface SuccessResponseDataLogout {
    detail: string
}
interface FailureResponseDataLogout {
    detail: [
        {
            loc: [
                string,
                0
            ],
            msg: string,
            type: string
        }
    ]
}

type ResponseLogoutUser = (
    {
        success: false,
        data: FailureResponseDataLogout | null
    } |
    {
        success: true,
        data: SuccessResponseDataLogout
    }
)

export type { ResponseLogoutUser };