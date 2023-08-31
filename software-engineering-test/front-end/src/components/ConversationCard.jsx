import { Upload } from 'lucide-react';

const ConversationCard = ({user_name, id, date}) => {
  return (
    <div className="border w-5/12 flex justify-between h-14 mx-auto items-center rounded-xl">
      <div className='ml-5'>
      <p>Conversation #id</p>
      <p>User: user_name</p>
      </div>
      <Upload strokeWidth={2.25}/>
      <p className='mr-5'> Created in: 12/07/2023 11:13</p>
    </div>
  );
};

export default ConversationCard;
