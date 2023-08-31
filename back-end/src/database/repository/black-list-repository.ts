import { AppDataSource } from '../data-source';
import { Blacklist } from '../entity/Blacklist';

export const BlacklistRepository = AppDataSource.getRepository(Blacklist);
