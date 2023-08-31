import { exportToCSV } from "../../utils/csv-writer";
import ConversationModel from "./conversation.model";

export default class ConversationService {
  constructor(
    private conversationModel: ConversationModel = new ConversationModel()
  ) { }

  public async getConversationsByDate(order: 'asc' | 'desc') {
    const conversations =  await this.conversationModel.getConversationsByDate(order);

    const updatedConversations = conversations.map((conversation) => {
      return {
        id: conversation.id,
        createdAt: conversation.createdAt,
        user_name: conversation.user.user_name,
      }
    })

    return updatedConversations;
  }

  public async createConversation(text: string, userName: string) {
    return await this.conversationModel.createConversation(text, userName);
  }

  public async exportCSV(id: number, userName: string) {
    const conversation = await this.conversationModel.findByCriteria({ id });
    if (!conversation) throw new Error('Conversation not found');
    const messages = conversation.text.split(';;');

    await exportToCSV(messages, userName)
  }
}