const vehicleService = (repository: any) => ({
  async getAll(vehicles: any) {
    return await repository.getAll(vehicles);
  },
});
export default vehicleService;
