import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog'

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    title: string
    description: string
    className?: string

}

const Modal = ({
    trigger,
    children,
    title,
    description,
    className
}: Props) => {
  return (
    <Dialog>
        <DialogTrigger className={className} asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className='bg-gradient-to-b from-[#252033] to-[#1a1825]'>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default Modal