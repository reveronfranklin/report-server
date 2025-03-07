import { IPaymentOrder } from '../interfaces/payment-order.interface';
import { DescriptiveEntity } from './descriptive.entity'
import { SupplierEntity } from './supplier.entity'
import { PucPaymentOrderEntity } from './puc-payment-order.entity';
import { CommitmentEntity} from './commitment.entity';
import { WithholdingOpEntity } from './withholding-op.entity';
import { DocumentEntity } from './document.entity';

export class PaymentOrderEntity implements IPaymentOrder {
  constructor(
    public amountInWords: string | null,
    public deadlineEndDate: Date,
    public deadlineStartDate: Date,
    public insertionDate: Date,
    public paymentAmount: number | null,
    public paymentFrequencyId: number | null,
    public paymentOrderCode: number,
    public paymentOrderDate: Date,
    public paymentOrderNumber: string,
    public paymentOrderTypeId: number,
    public reason: string | null,
    public receiptNumber: number | null,
    public reportTitle: string | null,
    public status: string | null,
    public supplierCode: number,
    public withholdingAgentAddress: string | null,
    public withholdingAgentName: string | null,
    public withholdingAgentPhone: string | null,
    public withholdingAgentRIF: string | null,

    /* Relations */
    public paymentOrderType?: DescriptiveEntity,
    public paymentFrequency?: DescriptiveEntity,
    public supplier?: SupplierEntity,
    public commitment?: CommitmentEntity,
    public pucPaymentOrders?: PucPaymentOrderEntity[],
    public withholdingOps?: WithholdingOpEntity[],
    public documents?: DocumentEntity[]
  ) {}
}