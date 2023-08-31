import { createObjectCsvWriter } from 'csv-writer';

export const exportToCSV = async(conversations: String[], userName: string, createdAt: Date) => {
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
    records.push({
      userName: index === 0 || index % 2 === 0 ? 'Lex Corp' : userName,
      message: ` ${conversation.toUpperCase()} `,
      createdAt,
    });
  });

  await csvWriter.writeRecords(records);
}