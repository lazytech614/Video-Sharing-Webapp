import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

type Props = {}

const DashboardPage = async (props: Props) => {
    const auth = await onAuthenticateUser()
    if(auth.status === 200 || auth.status === 201) 
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    else 
        return redirect('/auth/sign-in')
}

export default DashboardPage