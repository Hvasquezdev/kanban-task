export default class RandomUuidGenerator {
  static get(): string {
    return crypto.randomUUID();
  }
}
