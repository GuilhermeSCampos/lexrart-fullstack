import { ConversationHistoricRepository } from "@/database/repository/conversation-repository";
import AuthModel from "../auth/auth.model";
import { ConversationHistoric } from "@/database/entity/ConversationHistoric";

export default class ConversationModel {
  constructor(
    private authModel = new AuthModel()
  ) { }

  public async getConversationsByDate(order: 'asc' | 'desc') {

    try {
      const conversations = await ConversationHistoricRepository.find({
        order: {
          createdAt: order === 'asc' ? 'ASC' : 'DESC'
        },
        relations: ['user']
      });

      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw new Error('Error fetching conversations');
    }
  }

  public async createConversation(text: string, userName: string) {
    const user = await this.authModel.findByUserCriteria({ user_name: userName });
    if (!user) throw new Error('User not found');

    try {
      const conversation = ConversationHistoricRepository.create({
        text,
        user
      });
      await ConversationHistoricRepository.save(conversation);

      return conversation;
    } catch (error) {

      console.error('Error creating conversation:', error);
      throw new Error('Error creating conversation');
    }
  }

  public async findByCriteria(criteria: Partial<ConversationHistoric>) {
    return await ConversationHistoricRepository.findOneBy(criteria);
  }
}