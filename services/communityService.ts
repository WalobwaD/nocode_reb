import { Community } from "@/types/Community";
import api from "../config/api";

export const fetchCommunities = async (
  page: number = 1,
  perPage: number = 10,
  sort: string = "latest"
): Promise<Community[]> => {
  const res = await api.get(
    `/api:AAD3_pHV:staging/communities/posts?community_id=118af618-b3ef-403e-8bbd-92af080b973a&page=${page}&per_page=${perPage}&sort=${sort}`
  );

  return res.data.items;
};
