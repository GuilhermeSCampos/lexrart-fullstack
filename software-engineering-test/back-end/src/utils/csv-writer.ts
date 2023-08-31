import { createObjectCsvWriter } from 'csv-writer';

export const exportToCSV = async(conversations: String[], userName: string) => {
  const csvWriter = createObjectCsvWriter({
    path: './conversations.csv',
    header: [
      { id: 'userName', title: 'User Name' },
      { id: 'message', title: 'Message' },
      { id: 'createdAt', title: 'Date' }
    ]
  });

  const records: any[] = [];
  conversations.forEach((conversation, index) => {
    const data = conversation.split('##');
    records.push({
      userName: index === 0 || index % 2 === 0 ? userName : 'Optus Bot',
      message: ` ${data[0].toUpperCase()} `,
      createdAt: data[1]
    });
  });

  await csvWriter.writeRecords(records);
}