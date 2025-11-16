export class Mail {
  constructor(
    public title: string,
    public content: string,
    public chatsId: string,
    public readonly id?: string
  ) {}
}
