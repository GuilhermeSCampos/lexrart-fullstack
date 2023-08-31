import { RequestHandler } from "express";
import ConversationService from "./conversation.service";
import JWT from "../../JWT";
import path = require("path");
const fs = require('fs');

export default class ConversationController {
  constructor(
    private conversationService: ConversationService = new ConversationService(),
    private jwt: JWT = new JWT()
  ) { }

  public getConversationsByDate: RequestHandler = async (req, res) => {
    const { order } = req.query;
    const conversations = await this.conversationService.getConversationsByDate(order as 'asc' | 'desc');

    res.status(200).json(conversations);

  }

  public createConversation: RequestHandler = async (req, res) => {
    const token = req.headers.authorization as string;
    const result = await this.jwt.validate(token);
    const { text } = req.body;

    const newConversation = await this.conversationService.createConversation(text, result.user_name!);

    return res.status(201).json(newConversation);
  }

  public downloadCSV: RequestHandler = async (req, res) => {
    const { user_name } = req.body;
    const { id } = req.params;
    const filePath = path.join(__dirname, '../../../conversations.csv');

    await this.conversationService.exportCSV(Number(id), user_name);


    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded.csv');

    res.attachment('downloaded.csv');

    try {
      return res.sendFile(filePath);
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      res.status(500).send('Erro interno do servidor.');
    }
  }
}