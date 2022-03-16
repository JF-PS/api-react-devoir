const adService = (repository: any) => ({
  async getAll(limit: number, offset: number, query: any = null) {
    return await repository.getAll(limit, offset, query);
  },
  async getOne(ads: any) {
    return await repository.getOne(ads);
  },
});
export default adService;
