export interface IVatWithholdingVoucherRepository {
  /* any es el tipo de retorno del mapper temporal */
  findById(id: number): Promise<any | null>
}