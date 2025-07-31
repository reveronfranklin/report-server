export interface IReportBatchesRepository {
  getBatch(batchCode: number): Promise<any | null>
}