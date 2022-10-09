export namespace Define {
  export namespace Status {
    export const pending = 0
    export const running = 1
    export type Type = typeof pending | typeof running
  }
}
