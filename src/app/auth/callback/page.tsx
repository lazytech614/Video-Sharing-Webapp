import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

type Props = {}

const AuthCallbackPage = async (props: Props) => {
    // Authentication...
    const auth = await onAuthenticateUser()
    // console.log("Auth", auth);

    // const workspaceId = auth.user?.workspace[0].id
    // console.log("Workspace ID: ", workspaceId);
    if(auth.status === 200 || auth.status === 201) 
        redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    else 
        redirect('/auth/sign-in')
}

export default AuthCallbackPage