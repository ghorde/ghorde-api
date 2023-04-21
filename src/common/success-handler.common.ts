import SuccessGeneric from "./success.generic";
export default class SuccessHandler {
  readonly handlerName: string;
  constructor(handlerName: string) {
    this.handlerName = handlerName;
  }

  private useTemplate(msg: string) {
    return `Msg from ${this.handlerName}: ${
      msg ? `Success Details: ${msg}` : "none"
    }`;
  }

  ok(data: any, msg?: string) {
    const Success = new SuccessGeneric(
      `✅ Ok: ${this.useTemplate(msg)}`,
      200,
      data
    );
    return Success;
  }

  created(data: any, msg?: string) {
    const Success = new SuccessGeneric(
      `✅ Created: ${this.useTemplate(msg)}`,
      201,
      data
    );
    return Success;
  }

  accepted(data: any, msg?: string) {
    const Success = new SuccessGeneric(
      `✅ Accepted: ${this.useTemplate(msg)}`,
      202,
      data
    );
    return Success;
  }

  noContent(data?: any, msg?: string) {
    const Success = new SuccessGeneric(
      `✅ No Content: ${this.useTemplate(msg)}`,
      204,
      data
    );
    return Success;
  }
}
