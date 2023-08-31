import { exportToCSV } from "@/utils/csv-writer";
import ConversationModel from "./conversation.model";

export default class ConversationService {
  constructor(
    private conversationModel: ConversationModel = new ConversationModel()
  ) { }

  public async getConversationsByDate(order: 'asc' | 'desc') {
    return await this.conversationModel.getConversationsByDate(order);
  }

  public async createConversation(text: string, userName: string) {
    return await this.conversationModel.createConversation(text, userName);
  }

  public async exportCSV(id: number, userName: string) {
    const conversation = await this.conversationModel.findByCriteria({ id });
    if (!conversation) throw new Error('Conversation not found');
    const messages = conversation.text.split(',');

    await exportToCSV(messages, userName, conversation.createdAt)
  }
}