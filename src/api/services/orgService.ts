import apiClient from '../apiClient';

import { Organization } from '#/entity';

export enum OrgApi {
  Org = '/organization/allorg',
}

const getOrgList = () => apiClient.get<Organization[]>({ url: OrgApi.Org });

export default {
  getOrgList,
};
