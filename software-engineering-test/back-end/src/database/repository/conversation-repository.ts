import { AppDataSource } from '../data-source';
import { ConversationHistoric } from '../entity/ConversationHistoric';


export const ConversationHistoricRepository = AppDataSource.getRepository(ConversationHistoric);
