import { httpClient } from "../utils";

export const updatePersonalInformation = async (data)=> httpClient.put('/users/display-name', data);