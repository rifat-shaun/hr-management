import { AuthServices } from "./modules/auth";
import { HttpClient } from "./httpService";

export const client = new HttpClient();
export const authServices = new AuthServices();