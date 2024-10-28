import axios from 'axios';
import { environment } from '../environments';
import { Category } from '../(app)/models/category.model';
import { SupportTicket } from '../(app)/models/supportTicket.model';

const baseApiUrl = environment.apiUrl;

async function getCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${baseApiUrl}/category/get-categories`);
  return response.data;
}

async function getSupportCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${baseApiUrl}/support/get-support-categories`);
  return response.data;
}

async function getSupportPoolTickets(): Promise<SupportTicket[]> {
  const response = await axios.get<SupportTicket[]>(`${baseApiUrl}/support/get-pool-tickets`);
  return response.data;
}

async function getAllTickets(): Promise<SupportTicket[]> {
  const response = await axios.get<SupportTicket[]>(`${baseApiUrl}/support/get-all-tickets`);
  return response.data;
}

export const SupportService = {
  getCategories,
  getSupportCategories,
  getSupportPoolTickets,
  getAllTickets,
};
