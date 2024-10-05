
interface NotificationProps{
    text: string;
    visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({text, visible}) => {

  return (
    <div className={`fixed top-2 bg-black w-[95%] h-[50px] 
    rounded-xl flex items-center p-2 
    ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <a className="text-lg text-white">{text}</a>
    </div>
  )
}

export default Notification;