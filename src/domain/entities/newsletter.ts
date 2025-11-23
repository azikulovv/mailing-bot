export class Newsletter {
  constructor(
    public title: string,
    public chatIds: string,
    public forwardMessageId: number,
    public readonly id?: string
  ) {}
}
