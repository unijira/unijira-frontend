export class Error {
  constructor(
    public status: number,
    public message: string
  ) {
  }

  /** @deprecated **/
  static toError(json: any): Error {
    return new Error(json.status, json.message);
  }
}
