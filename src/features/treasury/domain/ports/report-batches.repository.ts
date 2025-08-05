export interface IReportBatchesRepository {
  getBatch(batchCode: number, isThirdParties: boolean): Promise<any | null>
}